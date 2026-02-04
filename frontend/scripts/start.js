const { spawn } = require('child_process');

const isProd = process.env.NODE_ENV === 'production';

function run(name, cmd, args, options = {}) {
  const p = spawn(cmd, args, { stdio: 'inherit', shell: true, ...options });
  p.on('close', (code) => {
    if (code !== 0) {
      console.error(`${name} exited with code ${code}`);
    }
  });
  return p;
}

if (isProd) {
  // In production just run the server (serves the built frontend)
  run('server', 'node', ['../server.js']);
} else {
  // Start server first so it can bind to its port (usually 5000)
  const server = run('server', 'npm', ['run', 'dev', { cwd: '..' }]);

  const net = require('net');
  const http = require('http');

  const isPortFree = (port) => new Promise((resolve) => {
    const tester = net.createServer()
      .once('error', () => resolve(false))
      .once('listening', () => tester.once('close', () => resolve(true)).close())
      .listen(port);
  });

  const waitForHttp = (port, timeoutMs = 15000) => new Promise((resolve) => {
    const start = Date.now();
    const check = () => {
      const req = http.request({ hostname: '127.0.0.1', port, path: '/', method: 'GET', timeout: 2000 }, (res) => {
        resolve(true);
      });
      req.on('error', () => {
        if (Date.now() - start > timeoutMs) return resolve(false);
        setTimeout(check, 500);
      });
      req.end();
    };
    check();
  });

  (async () => {
    // Prefer default CRA port 3000, then try 5000, then 5001
    const candidatePorts = [3000, 5000, 5001];
    let chosenPort = null;
    for (const p of candidatePorts) {
      // If server already bound this port, consider it not free
      /* eslint-disable no-await-in-loop */
      const free = await isPortFree(p);
      if (free) {
        chosenPort = p;
        break;
      }
    }

    if (!chosenPort) {
      console.error('No free port found for the client (tried 3000,5000,5001). Client not started.');
      return;
    }

    // If the chosen port is 5000 but server is expected to run on 5000, prefer 5001 instead
    const serverPort = Number(process.env.PORT || 5000);
    if (chosenPort === serverPort) {
      // try to find an alternative
      if (await isPortFree(5001)) chosenPort = 5001;
      else if (await isPortFree(3000)) chosenPort = 3000;
      else {
        console.error('Client and server conflict on port', serverPort);
        return;
      }
    }

    console.log(`Starting client on port ${chosenPort}`);
    const env = Object.assign({}, process.env, { PORT: String(chosenPort), BROWSER: 'none' });
    const client = spawn('npm', ['run', 'client'], { env, stdio: 'inherit', shell: true });

    const ok = await waitForHttp(chosenPort, 20000);
    if (ok) console.log(`Client is up on port ${chosenPort}`);
    else console.warn(`Client did not respond on port ${chosenPort} after timeout`);

    const exitHandler = (code) => {
      try { if (client && !client.killed) client.kill(); } catch (e) {}
      try { if (server && !server.killed) server.kill(); } catch (e) {}
      process.exit(code);
    };

    process.on('SIGINT', () => exitHandler(0));
    process.on('SIGTERM', () => exitHandler(0));
  })();
}

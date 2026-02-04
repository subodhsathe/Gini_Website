# Videos for Gini's Website

Add your music videos, performances, and media here:

## How to add videos:

1. **Save your videos** to this folder (`public/videos/`)
2. **Supported formats**: MP4, WebM, OGG
3. **Recommended size**: MP4 format for best compatibility

## Example file names:
- `performance.mp4` - Live performance video
- `music-video.mp4` - Official music video
- `behind-scenes.mp4` - Behind the scenes content

## To use in the website:
In App.js or components, add video element:
```jsx
<video controls style={{ width: '100%', borderRadius: '15px' }}>
  <source src="/videos/performance.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>
```

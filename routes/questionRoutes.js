const express = require('express');
const router = express.Router();
const Question = require('../models/Question');

// Get latest 10 questions
router.get('/latest', async (req, res) => {
  try {
    const questions = await Question.find()
      .sort({ createdAt: -1 })
      .limit(10);
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get top 5 questions by likes, then by latest if less than 5 liked
router.get('/top', async (req, res) => {
  try {
    // Get top 5 questions sorted by likes (descending), then by date (newest first)
    const questions = await Question.find()
      .sort({ likes: -1, createdAt: -1 })
      .limit(5);

    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new question
router.post('/create', async (req, res) => {
  try {
    const { question } = req.body;

    if (!question || question.trim() === '') {
      return res.status(400).json({ message: 'Question cannot be empty' });
    }

    const newQuestion = new Question({
      question: question.trim(),
    });

    await newQuestion.save();

    // Delete old questions - keep only latest 10
    const allQuestions = await Question.find().sort({ createdAt: -1 });
    if (allQuestions.length > 10) {
      const questionsToDelete = allQuestions.slice(10);
      const idsToDelete = questionsToDelete.map(q => q._id);
      await Question.deleteMany({ _id: { $in: idsToDelete } });
    }

    res.status(201).json({ message: 'Question posted successfully', data: newQuestion });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Like a question
router.post('/:id/like', async (req, res) => {
  try {
    const { userId } = req.body; // IP or session ID

    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    // Check if user already liked
    if (question.likedBy.includes(userId)) {
      return res.status(400).json({ message: 'You already liked this question' });
    }

    question.likes += 1;
    question.likedBy.push(userId);
    await question.save();

    res.status(200).json({ message: 'Question liked', data: question });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Unlike a question
router.post('/:id/unlike', async (req, res) => {
  try {
    const { userId } = req.body;

    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    // Check if user has liked
    const index = question.likedBy.indexOf(userId);
    if (index === -1) {
      return res.status(400).json({ message: 'You have not liked this question' });
    }

    question.likes -= 1;
    question.likedBy.splice(index, 1);
    await question.save();

    res.status(200).json({ message: 'Question unliked', data: question });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

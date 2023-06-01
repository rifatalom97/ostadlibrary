const express = require('express');
const router = express.Router();
const BookSchema = require('../schema/BookSchema');

// All books
router.get('/', async (req, res) => {
  try {
    const books = await BookSchema.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// book
router.get('/:id', async (req, res) => {
  try {
    const book = await BookSchema.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new book
router.post('/', async (req, res) => {
  const { title, author, description, publishedYear } = req.body;

  try {
    const book = new BookSchema({ title, author, description, publishedYear });
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a book by ID
router.put('/:id', async (req, res) => {
  const { title, author, description, publishedYear } = req.body;

  try {
    const book = await BookSchema.findByIdAndUpdate(
      req.params.id,
      { title, author, description, publishedYear },
      { new: true }
    );
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a book by ID
router.delete('/:id', async (req, res) => {
  try {
    const book = await BookSchema.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json({ message: 'Book deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middlewares/auth');

// Import your controllers
const authController = require('../controllers/authController');
const postController = require('../controllers/postController');

// Authentication routes
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);

// Blog post routes
router.get('/posts', authenticateToken, postController.getAllPosts);
router.get('/posts/:id', authenticateToken, postController.getPostById);
router.post('/posts', authenticateToken, postController.createPost);
router.put('/posts/:id', authenticateToken, postController.updatePost);
router.delete('/posts/:id', authenticateToken, postController.deletePost);

module.exports = router;
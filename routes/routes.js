const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middlewares/auth');

// Import your controllers
const authController = require('../controllers/authController');
const postController = require('../controllers/postController');
const userController = require('../controllers/userController');

// Authentication routes
router.post('/api/auth/register', authController.register);
router.post('/api/auth/login', authController.login);

// Blog post routes
router.get('/api/posts', authenticateToken, postController.getAllPosts);
router.get('/api/posts/:id', authenticateToken, postController.getPostById);
router.post('/api/posts', authenticateToken, postController.createPost);
router.put('/api/posts/:id', authenticateToken, postController.updatePost);
router.delete('/api/posts/:id', authenticateToken, postController.deletePost);

// Users routes
router.get('/api/users', authenticateToken, userController.getAllUsers);
router.get('/api/users/:id', authenticateToken, userController.getUserById);
router.delete('/api/users/:id', authenticateToken, userController.deleteUser);

module.exports = router;
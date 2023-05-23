const User = require('../models/User');
const Post = require('../models/Post');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const secretKey = process.env.SECRET_KEY;

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().exec();
        res.status(200).json({ message: 'Users retrieved successfully', users });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get a user by ID
const getUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId).exec();

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const posts = await Post.find({ author: userId }).exec();

        if (!posts) {
            return res.status(404).json({ error: 'Posts not found' });
        }

        res.status(200).json({ message: 'User retrieved successfully', user, posts });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const token = req.headers['authorization'];
        const decodedToken = jwt.verify(token, secretKey);
        const r_userId = decodedToken.userId;

        if (userId.toString() !== r_userId.toString()) {
            return res.status(403).json({ error: 'You are not authorized to delete the user' });
        }

        // Delete the user
        const deletedUser = await User.findByIdAndDelete(userId).exec();

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Delete the user's posts
        const deletedPosts = await Post.deleteMany({ author: userId }).exec();

        if (!deletedPosts) {
            return res.status(500).json({ message: 'Error deleting posts of removed user' });
        }

        res.status(200).json({ message: 'User and associated posts deleted successfully', userId });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


module.exports = {
    getAllUsers,
    getUserById,
    deleteUser,
};

const Post = require('../models/Post');

// Retrieve a list of all posts
exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().exec();
        res.status(200).json({ message: 'Posts retrieved successfully', posts });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Retrieve details of a specific post by ID
exports.getPostById = async (req, res) => {
    // Extract the post ID from the request parameters
    const postId = req.params.id;

    try {
        const post = await Post.findById(postId).exec();
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        res.status(200).json({ message: 'Post retrieved successfully', post });
    } catch (err) {
        return res.status(500).json({ error: 'Error retrieving post' });
    }
};

// Create a new post
exports.createPost = async (req, res) => {
    const { title, content } = req.body;

    const userId = req.user.userId;
    try {
        // Create a new Post instance
        const newPost = new Post({
            title: title,
            content: content,
            author: userId,
        });

        // Save the new post to the database
        await newPost.save();

        res.status(201).json({ message: 'Post created successfully', post: newPost });
    } catch (error) {
        res.status(500).json({ error: 'Error creating post' });
    }
};

// Update the details of a specific blog post by ID
exports.updatePost = async (req, res) => {
    // Extract the post ID from the request parameters
    const postId = req.params.id;

    const { title, content } = req.body;

    try {
        const userId = req.user.userId;

        // Find the post by ID and check if the author is the current user
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        if (post.author.toString() !== userId.toString()) {
            return res.status(403).json({ error: 'You are not authorized to update this post' });
        }

        // Find the post by ID and update its properties
        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            { title: title, content: content },
            { new: true } // Return the updated post in the response
        );

        if (!updatedPost) {
            return res.status(404).json({ error: 'Post not found' });
        }

        res.json({ message: 'Post updated successfully', post: updatedPost });
    } catch (error) {
        res.status(500).json({ error: 'Error updating post' });
    }
};

// Remove a blog post by ID
exports.deletePost = async (req, res) => {
    // Extract the post ID from the request parameters
    const postId = req.params.id;

    try {
        const userId = req.user.userId;

        // Find the post by ID and check if the author is the current user
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        if (post.author.toString() !== userId.toString()) {
            return res.status(403).json({ error: 'You are not authorized to delete this post' });
        }

        // Delete the post by ID
        const deletedPost = await Post.findByIdAndRemove(postId);

        if (!deletedPost) {
            return res.status(404).json({ error: 'Post not found' });
        }

        res.json({ message: 'Post deleted successfully', postId });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting post' });
    }
};

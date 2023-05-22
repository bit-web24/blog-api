const Post = require('../models/Post');

// Retrieve a list of all posts
exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().exec();
        res.json(posts);
    } catch (error) {
        console.error('Error retrieving posts:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

// Retrieve details of a specific post by ID
exports.getPostById = (req, res) => {
    // Extract the post ID from the request parameters
    const postId = req.params.id;

    Post.findById(postId, (err, post) => {
        if (err) {
            console.error('Error retrieving post:', err);
            return res.status(500).json({ error: 'Error retrieving post' });
        }

        if (!post) {
            console.log('Post not found');
            return res.status(404).json({ error: 'Post not found' });
        }

        res.json({ post: post });
    });
};

// Create a new post
exports.createPost = (req, res) => {
    const { title, content, author } = req.body;

    // Create a new Post instance
    const newPost = new Post({
        title: title,
        content: content,
        author: author,
    });

    // Save the new post to the database
    newPost.save()
        .then((savedPost) => {
            res.status(201).json({ message: 'Post created successfully', post: savedPost });
        })
        .catch((err) => {
            console.error('Error creating post:', err);
            res.status(500).json({ error: 'Error creating post' });
        });
};

// Update the details of a specific blog post by ID
exports.updatePost = (req, res) => {
    // Extract the post ID from the request parameters
    const postId = req.params.id;

    const { title, content, author } = req.body;

    // Find the post by ID and update its properties
    Post.findByIdAndUpdate(
        postId,
        { title: title, content: content, author: author },
        { new: true } // Return the updated post in the response
    )
        .then((updatedPost) => {
            if (!updatedPost) {
                return res.status(404).json({ error: 'Post not found' });
            }
            res.json({ message: 'Post updated successfully', post: updatedPost });
        })
        .catch((err) => {
            console.error('Error updating post:', err);
            res.status(500).json({ error: 'Error updating post' });
        });
};

// Remove a blog post by ID
exports.deletePost = (req, res) => {
    // Extract the post ID from the request parameters
    const postId = req.params.id;

    // Find the post by ID and remove it
    Post.findByIdAndRemove(postId)
        .then((deletedPost) => {
            if (!deletedPost) {
                return res.status(404).json({ error: 'Post not found' });
            }
            res.json({ message: 'Post deleted successfully' });
        })
        .catch((err) => {
            console.error('Error deleting post:', err);
            res.status(500).json({ error: 'Error deleting post' });
        });
};

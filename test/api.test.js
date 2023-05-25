const request = require('supertest');
const assert = require('assert');
const app = require('../app');

let TOKEN_VALUE;
let POST_ID;
let USER_ID;

describe('API endpoints', () => {
    describe('Authentication routes', () => {
        it('should register a new user', async function () {
            this.timeout(10000);
            const userData = {
                username: 'test_user',
                password: 'test_pass'
            };

            const response = await request(app)
                .post('/api/auth/register')
                .send(userData)
                .expect(201);

            assert.equal(response.body.message, 'User registered successfully');
        });

        it('should log in a user', async function () {
            this.timeout(10000);
            const credentials = {
                username: 'test_user',
                password: 'test_pass'
            };

            const response = await request(app)
                .post('/api/auth/login')
                .send(credentials)
                .expect(200);

            const cookie = response.headers['set-cookie'][0];
            const token = cookie.split(';')[0].split('=')[1];
            TOKEN_VALUE = token;

            assert.ok(TOKEN_VALUE);
            assert.equal(response.body.message, 'Login successful');
            assert.equal(response.body.user.username, 'test_user');
            assert.ok(response.body.user._id);
        });
    });

    describe('Blog post routes', () => {
        it('should create a new post', async function () {
            this.timeout(10000);
            const postData = {
                title: 'post_title',
                content: 'post_content'
            };

            const response = await request(app)
                .post('/api/posts')
                .set('Cookie', `token=${TOKEN_VALUE}`)
                .send(postData)
                .expect(201);

            USER_ID = response.body.post.author;
            POST_ID = response.body.post._id;

            assert.ok(POST_ID);
            assert.ok(USER_ID);
            assert.equal(response.body.message, 'Post created successfully');
            assert.equal(response.body.post.title, 'post_title');
            assert.equal(response.body.post.content, 'post_content');
        });

        it('should get all posts', async function () {
            this.timeout(10000);
            const response = await request(app)
                .get('/api/posts')
                .set('Cookie', `token=${TOKEN_VALUE}`)
                .expect(200);

            assert.equal(response.status, 200);
            assert.equal(response.body.posts.length, 1);
            assert.equal(response.body.message, 'Posts retrieved successfully');
            assert.equal(response.body.posts[0].title, 'post_title');
            assert.equal(response.body.posts[0].content, 'post_content');
            assert.equal(response.body.posts[0].author, USER_ID);
        });

        it('should get a post by ID', async function () {
            this.timeout(10000);
            const response = await request(app)
                .get(`/api/posts/${POST_ID}`)
                .set('Cookie', `token=${TOKEN_VALUE}`)
                .expect(200);

            assert.equal(response.body.post._id, POST_ID);
            assert.equal(response.body.message, 'Post retrieved successfully');
        });

        it('should update a post', async function () {
            this.timeout(10000);
            const updatedData = {
                title: 'updated_post_title',
                content: 'updated_post_content'
            };

            const response = await request(app)
                .put(`/api/posts/${POST_ID}`)
                .set('Cookie', `token=${TOKEN_VALUE}`)
                .send(updatedData)
                .expect(200);

            assert.equal(response.body.message, 'Post updated successfully');
            assert.equal(response.body.post.title, 'updated_post_title');
            assert.equal(response.body.post.content, 'updated_post_content');
            assert.equal(response.body.post.author, USER_ID);
        });

        it('should delete a post', async function () {
            this.timeout(10000);
            const response = await request(app)
                .delete(`/api/posts/${POST_ID}`)
                .set('Cookie', `token=${TOKEN_VALUE}`)
                .expect(200);

            assert.equal(response.body.message, 'Post deleted successfully');
            assert.equal(response.body.postId, POST_ID);
        });
    });

    describe('Users routes', () => {
        it('should get all users', async function () {
            this.timeout(10000);
            const response = await request(app)
                .get('/api/users')
                .set('Cookie', `token=${TOKEN_VALUE}`)
                .expect(200);

            assert.equal(response.body.message, 'Users retrieved successfully');
            assert.equal(response.body.users[0].username, 'test_user');
            assert.equal(response.body.users[0]._id, USER_ID);
        });

        it('should get a user by ID', async function () {
            this.timeout(10000);
            const response = await request(app)
                .get(`/api/users/${USER_ID}`)
                .set('Cookie', `token=${TOKEN_VALUE}`)
                .expect(200);

            assert.equal(response.body.message, 'User retrieved successfully');
            assert.equal(response.body.user.username, 'test_user');
            assert.equal(response.body.user._id, USER_ID);
        });

        it('should update a user\'s credentials', async function () {
            this.timeout(10000);
            const response = await request(app)
                .put(`/api/users/${USER_ID}`)
                .set('Cookie', `token=${TOKEN_VALUE}`)
                .send({
                    username: 'updated_user',
                    password: 'updated_pass'
                })
                .expect(200);

            TOKEN_VALUE = 'some-random-token';

            assert.equal(response.body.message, 'Credentials updated successfully');
            assert.equal(response.body.user._id, USER_ID);
            assert.equal(response.body.user.username, 'updated_user');
        });

        it('should log in a user', async function () {
            this.timeout(10000);
            const credentials = {
                username: 'updated_user',
                password: 'updated_pass'
            };

            const response = await request(app)
                .post('/api/auth/login')
                .send(credentials)
                .expect(200);

            const cookie = response.headers['set-cookie'][0];
            const token = cookie.split(';')[0].split('=')[1];
            TOKEN_VALUE = token;

            assert.ok(TOKEN_VALUE);
            assert.equal(response.body.message, 'Login successful');
            assert.equal(response.body.user.username, 'updated_user');
            assert.ok(response.body.user._id);
        });

        it('should logout a user', async function () {
            this.timeout(10000);

            const response = await request(app)
                .post('/api/auth/logout')
                .expect(200);

            TOKEN_VALUE = 'some-random-token';

            assert.equal(response.body.message, 'Logout successful');
        });

        it('should log in a user', async function () {
            this.timeout(10000);
            const credentials = {
                username: 'updated_user',
                password: 'updated_pass'
            };

            const response = await request(app)
                .post('/api/auth/login')
                .send(credentials)
                .expect(200);

            const cookie = response.headers['set-cookie'][0];
            const token = cookie.split(';')[0].split('=')[1];
            TOKEN_VALUE = token;

            assert.ok(TOKEN_VALUE);
            assert.equal(response.body.message, 'Login successful');
            assert.equal(response.body.user.username, 'updated_user');
            assert.ok(response.body.user._id);
        });

        it('should delete a user', async function () {
            this.timeout(10000);
            const response = await request(app)
                .delete(`/api/users/${USER_ID}`)
                .set('Cookie', `token=${TOKEN_VALUE}`)
                .expect(200);

            assert.equal(response.body.message, 'User and associated posts deleted successfully');
            assert.equal(response.body.userId, USER_ID);
        });
    });
});

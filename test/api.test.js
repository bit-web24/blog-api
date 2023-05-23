const request = require('supertest');
const assert = require('assert');
const app = require('../app');

let TOKEN_VALUE;
let POST_ID;
let USER_ID;

before((done) => {
    done();
});

after((done) => {
    // Close the server after the tests are finished
    app.close(() => {
        console.log('Server Stoped');
        done();
    });
});

describe('API endpoints', () => {
    describe('Authentication routes', () => {
        it('should register a new user', function (done) {
            this.timeout(10000);
            const userData = {
                username: "test_user",
                password: "test_pass"
            };

            request(app)
                .post('/api/auth/register')
                .send(userData)
                .expect(201)
                .end((err, res) => {
                    if (err) return done(err);

                    assert.equal(res.body.message, 'User registered successfully');

                    done();
                });
        });

        it('should log in a user', function (done) {
            this.timeout(10000);

            const credentials = {
                username: "test_user",
                password: "test_pass"
            };

            request(app)
                .post('/api/auth/login')
                .send(credentials)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);

                    TOKEN_VALUE = res.body.token;

                    assert.ok(TOKEN_VALUE);
                    assert.equal(res.body.message, 'Login successful');

                    done();
                });
        });
    });

    describe('Blog post routes', () => {
        it('should create a new post', function (done) {
            this.timeout(10000);
            const postData = {
                title: "post_title",
                content: "post_content"
            };

            request(app)
                .post('/api/posts')
                .set('Authorization', TOKEN_VALUE)
                .send(postData)
                .expect(201)
                .end((err, res) => {
                    if (err) return done(err);

                    USER_ID = res.body.post.author;
                    POST_ID = res.body.post._id;

                    assert.ok(POST_ID);
                    assert.ok(USER_ID);
                    assert.equal(res.body.message, 'Post created successfully');
                    assert.equal(res.body.post.title, 'post_title');
                    assert.equal(res.body.post.content, 'post_content');

                    done();
                });
        });

        it('should get all posts', function (done) {
            this.timeout(10000);
            request(app)
                .get('/api/posts')
                .set('Authorization', TOKEN_VALUE)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);

                    assert.equal(res.status, 200);
                    assert.equal(res.body.posts.length, 1);
                    assert.equal(res.body.message, 'Posts retrieved successfully');

                    assert.equal(res.body.posts[0].title, 'post_title');
                    assert.equal(res.body.posts[0].content, 'post_content');
                    assert.equal(res.body.posts[0].author, USER_ID);

                    done();
                });
        });

        it('should get a post by ID', function (done) {
            this.timeout(10000);
            request(app)
                .get(`/api/posts/${POST_ID}`)
                .set('Authorization', TOKEN_VALUE)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);

                    assert.equal(res.body.post._id, POST_ID);
                    assert.equal(res.body.message, 'Post retrieved successfully');

                    done();
                });
        });

        it('should update a post', function (done) {
            this.timeout(10000);
            const updatedData = {
                title: "updated_post_title",
                content: "updated_post_content"
            };

            request(app)
                .put(`/api/posts/${POST_ID}`)
                .set('Authorization', TOKEN_VALUE)
                .send(updatedData)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);

                    assert.equal(res.body.message, 'Post updated successfully');
                    assert.equal(res.body.post.title, 'updated_post_title');
                    assert.equal(res.body.post.content, 'updated_post_content');
                    assert.equal(res.body.post.author, USER_ID);

                    done();
                });
        });

        it('should delete a post', function (done) {
            this.timeout(10000);
            request(app)
                .delete(`/api/posts/${POST_ID}`)
                .set('Authorization', TOKEN_VALUE)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);

                    assert.equal(res.body.message, 'Post deleted successfully');
                    assert.equal(res.body.postId, POST_ID);

                    done();
                });
        });
    });

    describe('Users routes', () => {
        it('should get all users', function (done) {
            this.timeout(10000);
            request(app)
                .get('/api/users')
                .set('Authorization', TOKEN_VALUE)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);

                    assert.equal(res.body.message, 'Users retrieved successfully');
                    assert.equal(res.body.users[0].username, 'test_user');
                    assert.equal(res.body.users[0]._id, USER_ID);

                    done();
                });
        });

        it('should get a user by ID', function (done) {
            this.timeout(10000);
            request(app)
                .get(`/api/users/${USER_ID}`)
                .set('Authorization', TOKEN_VALUE)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);

                    assert.equal(res.body.message, 'User retrieved successfully');
                    assert.equal(res.body.user.username, 'test_user');
                    assert.equal(res.body.user._id, USER_ID);

                    done();
                });
        });

        it('should delete a user', function (done) {
            this.timeout(10000);
            request(app)
                .delete(`/api/users/${USER_ID}`)
                .set('Authorization', TOKEN_VALUE)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);

                    assert.equal(res.body.message, 'User and associated posts deleted successfully');
                    assert.equal(res.body.userId, USER_ID);

                    done();
                });
        });
    });
});

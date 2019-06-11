const expect = require('chai').expect;
const sinon = require('sinon');
const mongoose = require('mongoose');

const User = require('../models/user');
const Post = require('../models/post');
const FeedController = require('../controllers/feed');

describe('Feed Controller', function() {
  before(function(done) {
    mongoose
      .connect(
        'mongodb+srv://mongo-user-nodejs:mongo-user-nodejs@cluster0-5orkz.mongodb.net/test-messages?retryWrites=true&w=majority',
        { useNewUrlParser: true }
      )
      .then(result => {
        const user = new User({
          email: 'test@test.com',
          password: 'tester',
          name: 'test',
          posts: [],
          _id: '5c0f66b979af55031b34728a'
        });
        return user.save();
      })
      .then(() => {
        done();
      });
  });

  it('should ad a created post to the posts of the creator', function(done) {
    const req = {
      body: {
        title: 'Test Post',
        content: 'A Test Post'
      },
      file: {
        path: 'abc'
      },
      userId: '5c0f66b979af55031b34728a'
    };
    const res = {
      status: function() {
        return this;
      },
      json: function() {}
    };
    FeedController.createPost(req, res, () => {}).then((savedUser)=>{
      expect(savedUser).to.have.property('posts');
      expect(savedUser.posts).to.have.length(1);
      done()
    });
  });

  after(function(done) {
    User.deleteMany({ _id: '5c0f66b979af55031b34728a' })
      .then(() => {
        return mongoose.disconnect();
      })
      .then(() => {
        done();
      });
  });
});

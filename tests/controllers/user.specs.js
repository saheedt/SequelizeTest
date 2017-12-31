import request from 'supertest';
import { expect, assert } from 'chai';

import app from '../../build/server';
import baseController from '../../server/controllers/baseController';

import userModel from '../../server/models/user';
import recipeModel from '../../server/models/recipe';
import reviewModel from '../../server/models/review';

// process.env.EXPIRED_TOKEN
const freshToken = baseController.sign(1, process.env.TEST_EMAIL);
const saltRounds = 10;

describe('User Endpoints', () => {
  /*
    beforeEach((done) => {
    userModel.destroy({
      where: {},
      force: true,
      truncate: true,
      cascade: true,
      restartIdentity: true
    })
      .then((err) => {
        if (!err) {
          recipeModel.destroy({
            where: {},
            force: true,
            truncate: true,
            cascade: true,
            restartIdentity: true
          })
            .then((ierr) => {
              if (!ierr) {
                reviewModel.destroy({
                  where: {},
                  force: true,
                  truncate: true,
                  cascade: true,
                  restartIdentity: true
                })
                  .then(() => done());
              }
            });
        }
      });
    });
  */

  describe('Create User Endpoint', () => {
    /*
    it('should successfully create a new user', (done) => {
      request(app)
        .post('/api/v1/users/signup')
        .send({
          email: process.env.TEST_EMAIL,
          password: process.env.TEST_PASSWORD
        })
        .end((err, response) => {
          expect(response.status).to.equal(201);
          expect(response.body.user.email).to.equal('test@test.com');
          expect(response.body.message).to.equal('sign up successful');
          done();
        });
    });
    */
    it('should not create a user with an invalid email', (done) => {
      let emailValidationErr = 'SequelizeValidationError: Validation error:';
      emailValidationErr += ' Validation isEmail on email failed';
      request(app)
        .post('/api/v1/users/signup')
        .send({
          email: 'you@',
          password: '123456'
        })
        .end((err, response) => {
          expect(response.status).to.equal(500);
          expect(response.body.message).to.equal('error creating user');
          expect(response.body.error).to.equal(emailValidationErr);
          done();
        });
    });
    it('should not create a user with an empty email', (done) => {
      request(app)
        .post('/api/v1/users/signup')
        .send({
          email: '',
          password: '123456'
        })
        .end((err, response) => {
          expect(response.status).to.equal(400);
          expect(response.body.message).to
            .equal('email can not be empty or null');
          done();
        });
    });
    it('should not create a user with an empty password', (done) => {
      request(app)
        .post('/api/v1/users/signup')
        .send({
          email: 'tawa@test.com',
          password: ''
        })
        .end((err, response) => {
          expect(response.status).to.equal(400);
          expect(response.body.message).to
            .equal('password can not be empty or null');
          done();
        });
    });
    it('should not create a user with password length less than 6', (done) => {
      request(app)
        .post('/api/v1/users/signup')
        .send({
          email: 'tawa@test.com',
          password: '12345'
        })
        .end((err, response) => {
          expect(response.status).to.equal(400);
          expect(response.body.message).to
            .equal('password should be 6 or more characters long');
          done();
        });
    });
    it('should not create a user with an email that exists', (done) => {
      request(app)
        .post('/api/v1/users/signup')
        .send({
          email: process.env.TEST_EMAIL,
          password: '123456'
        })
        .end((err, response) => {
          expect(response.status).to.equal(400);
          expect(response.body.message).to.equal('Email already exists');
          done();
        });
    });
  });
});

describe('Login User Endpoint', () => {
  it('should successfully login', (done) => {
    request(app)
      .post('/api/v1/users/signin')
      .send({
        email: process.env.TEST_EMAIL,
        password: process.env.TEST_PASSWORD
      })
      .end((err, response) => {
        expect(response.status).to.equal(200);
        expect(response.body.message).to.equal('sign in successful');
        done();
      });
  });
  it('should not successfully login with wrong password', (done) => {
    request(app)
      .post('/api/v1/users/signin')
      .send({
        email: process.env.TEST_EMAIL,
        password: 'hsknvjljal'
      })
      .end((err, response) => {
        expect(response.status).to.equal(400);
        expect(response.body.message).to.equal('wrong email or password');
        done();
      });
  });
});

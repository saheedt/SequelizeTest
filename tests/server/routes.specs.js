import request from 'supertest';
import { expect, assert } from 'chai';

import app from '../../build/server';

describe('Routes', () => {
  describe('Invalid Post request', () => {
    it(
      'should display the right message for an invalid Post request',
      (done) => {
        request(app)
          .post('/api/user/signin')
          .send({
            email: 'test@test.com',
            password: 'testpassword'
          })
          .end((err, response) => {
            expect(response.status).to.equal(404);
            expect(response.body.message).to.equal('invalid route!');
            assert.deepEqual(response.body.message, 'invalid route!');
            assert.deepEqual(response.status, 404);
            done();
          });
      }
    );
  });
  describe('Invalid Get request', () => {
    it(
      'should display the right message for an invalid Get request',
      (done) => {
        request(app)
          .get('/api/recipes')
          .end((err, response) => {
            expect(response.status).to.equal(404);
            expect(response.body.message).to.equal('invalid route!');
            assert.deepEqual(response.body.message, 'invalid route!');
            assert.deepEqual(response.status, 404);
            done();
          });
      }
    );
  });
  describe('Invalid Put request', () => {
    it(
      'should display the right message for an invalid Put request',
      (done) => {
        request(app)
          .put('/api/recipes/1')
          .send({
            name: 'test recipe name',
            content: 'test recipe content'
          })
          .end((err, response) => {
            expect(response.status).to.equal(404);
            expect(response.body.message).to.equal('invalid route!');
            assert.deepEqual(response.body.message, 'invalid route!');
            assert.deepEqual(response.status, 404);
            done();
          });
      }
    );
  });
  describe('Invalid Delete request', () => {
    it(
      'should display the right message for an invalid Delete request',
      (done) => {
        request(app)
          .delete('/api/recipes/1')
          .end((err, response) => {
            expect(response.status).to.equal(404);
            expect(response.body.message).to.equal('invalid route!');
            assert.deepEqual(response.body.message, 'invalid route!');
            assert.deepEqual(response.status, 404);
            done();
          });
      }
    );
  });
});

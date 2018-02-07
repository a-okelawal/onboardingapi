import should from 'should';
import supertest from 'supertest';

import server from '../server';

const request = supertest(server);

let stoken, did;

describe('Department', () => {
  before((done) => {
    request
      .post('/api/v1/auth/login')
      .send({
        email: process.env.SUPEREMAIL,
        password: process.env.SUPERPASSWORD
      })
      .end((err, res) => {
        stoken = res.body.jwt;
        done();
      });
  });

  describe('create', () => {
    describe('doesn\'t allow', () => {
      it('creation without valid title', (done) => {
        request
          .post('/api/v1/dept')
          .set('x-access-token', stoken)
          .send({
            name: 'ti',
            onboardingList: ['Talk to akin']
          })
          .end((err, res) => {
            res.status.should.equal(400);
            res.body.error.should.equal('Department name must be more than 2 characters.');
            done();
          });
      });

      it('creation without valid onboardingList', (done) => {
        request
          .post('/api/v1/dept')
          .set('x-access-token', stoken)
          .send({
            name: 'H.R',
            onboardingList: []
          })
          .end((err, res) => {
            res.status.should.equal(400);
            res.body.error.should.equal('Department must have at least one todo in onboarding list.');
            done();
          });
      });
    });

    describe('allows', () => {
      it('creation with valid details', (done) => {
        request
          .post('/api/v1/dept')
          .set('x-access-token', stoken)
          .send({
            name: 'H.R',
            onboardingList: ['Collect contract', 'Setup Printer']
          })
          .end((err, res) => {
            res.status.should.equal(201);
            res.body.message.should.equal('H.R created successfully.');
            done();
          });
      });
    });
  });

  describe('get', () => {
    it('should allow getting all departments', (done) => {
      request
        .get('/api/v1/dept')
        .set('x-access-token', stoken)
        .end((err, res) => {
          res.status.should.equal(200);
          res.body.length.should.equal(1);
          did = res.body[0]._id;
          done();
        });
    });
  });
  
  describe('update', () => {
    describe('doesn\'t allow', () => {
      it('update without valid title', (done) => {
        request
          .put(`/api/v1/dept/${did}`)
          .set('x-access-token', stoken)
          .send({
            name: 'ti'
          })
          .end((err, res) => {
            res.status.should.equal(400);
            res.body.error.should.equal('Department name must be more than 2 characters.');
            done();
          });
      });

      it('creation without valid onboardingList', (done) => {
        request
          .put(`/api/v1/dept/${did}`)
          .set('x-access-token', stoken)
          .send({
            onboardingList: []
          })
          .end((err, res) => {
            res.status.should.equal(400);
            res.body.error.should.equal('Department must have at least one todo in onboarding list.');
            done();
          });
      });
    });

    describe('allows', () => {
      it('creation with valid details', (done) => {
        request
          .put(`/api/v1/dept/${did}`)
          .set('x-access-token', stoken)
          .send({
            name: 'Human Resources',
            onboardingList: ['Collect contract', 'Setup Printer', 'Buy bottle']
          })
          .end((err, res) => {
            res.status.should.equal(200);
            res.body.message.should.equal('Human Resources was updated successfully.');
            done();
          });
      });
    });
  });
});
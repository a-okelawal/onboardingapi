import should from 'should';
import supertest from 'supertest';

import server from '../server';

const request = supertest(server);

let stoken, did, uid;

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

  describe('read', () => {
    it('should return all employees', (done) => {
      request
        .get('/api/v1/employees')
        .set('x-access-token', stoken)
        .end((err, res) => {
          res.status.should.equal(200);
          res.body.length.should.equal(2);
          uid = res.body[0]._id;
          done();
        });
    });
  });

  describe('update', () => {
    describe('should fail', () => {
      it('when name is invalid', (done) => {
        request
          .put(`/api/v1/employees/${uid}`)
          .set('x-access-token', stoken)
          .send({
            name: 'real'
          })
          .end((err, res) => {
            res.status.should.equal(400);
            res.body.error.should.equal('Name must have atleast first and last name.');
            done();
          });
      });

      it('when email is invalid', (done) => {
        request
          .put(`/api/v1/employees/${uid}`)
          .set('x-access-token', stoken)
          .send({
            email: 'real'
          })
          .end((err, res) => {
            res.status.should.equal(400);
            res.body.error.should.equal('Email is invalid.');
            done();
          });
      });

      it('when phone is invalid', (done) => {
        request
          .put(`/api/v1/employees/${uid}`)
          .set('x-access-token', stoken)
          .send({
            phone: 'real'
          })
          .end((err, res) => {
            res.status.should.equal(400);
            res.body.error.should.equal('Phone number is invalid.');
            done();
          });
      });

      it('when role is invalid', (done) => {
        request
          .put(`/api/v1/employees/${uid}`)
          .set('x-access-token', stoken)
          .send({
            role: 'real'
          })
          .end((err, res) => {
            res.status.should.equal(400);
            res.body.error.should.equal('Role is invalid.');
            done();
          });
      });

      it('when department id is invalid', (done) => {
        request
          .put(`/api/v1/employees/${uid}`)
          .set('x-access-token', stoken)
          .send({
            department: 'real'
          })
          .end((err, res) => {
            res.status.should.equal(400);
            res.body.error.should.equal('Department invalid.');
            done();
          });
      });
    });

    describe('should pass', () => {
      it('should pass for valid data', (done) => {
        request
          .put(`/api/v1/employees/${uid}`)
          .set('x-access-token', stoken)
          .send({
            role: 'admin'
          })
          .end((err, res) => {
            res.status.should.equal(200);
            res.body.role.should.equal('admin');
            done();
          });
      });
    })
  });
});
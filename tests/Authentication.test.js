import should from 'should';
import supertest from 'supertest';

import server from '../server';

const request = supertest(server);

let etoken, stoken;

describe('Authentication', () => {
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

  describe('signup', () => {

    describe('allows', () => {      
      it('signup with all valid requirements', (done) => {
        request
          .post('/api/v1/auth/signup')
          .set('x-access-token', stoken)
          .send({
            name: 'test user',
            email: 'test@email.com',
            password: 'password',
            phone: '08011110000',
            department: '4oi4oi3o9409',
            dOE: '01/01/2018',
            secret: 'secret'
          })
          .end((err, res) => {
            res.status.should.equal(201);
            res.body.message.should.equal('test user was created successfully as a/an employee.');
            done();
          });
      });
    });

    describe('doesn\'t allow', () => {
      it('signup with an invalid name', (done) => {
        request
          .post('/api/v1/auth/signup')
          .send({
            name: 'Test',
            email: 'test@email.com',
            password: 'password',
            phone: '08011110000',
            department: '4oi4oi3o9409',
            dOE: '01/01/2018',
            secret: 'secret'
          })
          .end((err, res) => {
            res.status.should.equal(400);
            res.body.error.should.equal('Name must have atleast first and last name.');
            done();
          });
      });

      it('signup with an invalid email', (done) => {
        request
          .post('/api/v1/auth/signup')
          .send({
            name: 'Test User',
            email: 'Te@co',
            password: 'password',
            phone: '08011110000',
            department: '4oi4oi3o9409',
            dOE: '01/01/2018',
            secret: 'secret'
          })
          .end((err, res) => {
            res.status.should.equal(400);
            res.body.error.should.equal('Email is invalid.');
            done();
          });
      });

      it('signup with an invalid password', (done) => {
        request
          .post('/api/v1/auth/signup')
          .send({
            name: 'Test User',
            email: 'test@email.com',
            password: 'pas',
            phone: '08011110000',
            department: '4oi4oi3o9409',
            dOE: '01/01/2018',
            secret: 'secret'
          })
          .end((err, res) => {
            res.status.should.equal(400);
            res.body.error.should.equal('Password is invalid. Must be at least 6 characters.');
            done();
          });
      });

      it('signup with no department', (done) => {
        request
          .post('/api/v1/auth/signup')
          .send({
            name: 'Test User',
            email: 'test@email.com',
            password: 'password',
            phone: '08011110000',
            dOE: '01/01/2018',
            secret: 'secret'
          })
          .end((err, res) => {
            res.status.should.equal(400);
            res.body.error.should.equal('Employee must belong to a department.');
            done();
          });
      });

      it('signup with an invalid phone number', (done) => {
        request
          .post('/api/v1/auth/signup')
          .send({
            name: 'Test User',
            email: 'test@email.com',
            password: 'password',
            phone: '080111100',
            department: '4oi4oi3o9409',
            dOE: '01/01/2018',
            secret: 'secret'
          })
          .end((err, res) => {
            res.status.should.equal(400);
            res.body.error.should.equal('Phone number is invalid.');
            done();
          });
      });

      it('signup with a secret', (done) => {
        request
          .post('/api/v1/auth/signup')
          .send({
            name: 'Test User',
            email: 'test@email.com',
            password: 'password',
            phone: '08011110000',
            department: '4oi4oi3o9409',
            dOE: '01/01/2018',
            secret: 'sec'
          })
          .end((err, res) => {
            res.status.should.equal(400);
            res.body.error.should.equal('Secret is invalid.');
            done();
          });
      });

      it('signup of duplicate user', (done) => {
        request
          .post('/api/v1/auth/signup')
          .set('x-access-token', stoken)
          .send({
            name: 'test user',
            email: 'test@email.com',
            password: 'password',
            phone: '08011110000',
            department: '4oi4oi3o9409',
            dOE: '01/01/2018',
            secret: 'secret'
          })
          .end((err, res) => {
            res.status.should.equal(409);
            res.body.error.should.equal('User with email already exists.');
            done();
          });
      });
    });
  });

  describe('login', () => {
    describe('doesn\'t allow', () => {
      it('login with wrong email address', (done) => {
        request
          .post('/api/v1/auth/login')
          .send({
            email: 'tif@ni.com',
            password: 'tola'
          })
          .end((err, res) => {
            res.status.should.equal(404);
            res.body.error.should.equal('User with email does not exist.');
            done();
          });
      });

      it('login with wrong password address', (done) => {
        request
          .post('/api/v1/auth/login')
          .send({
            email: 'test@email.com',
            password: 'tola'
          })
          .end((err, res) => {
            res.status.should.equal(401);
            res.body.error.should.equal('Invalid password.');
            done();
          });
      });
    });

    describe('allows', () => {
      it('login with proper credentials', (done) => {
        request
          .post('/api/v1/auth/login')
          .send({
            email: 'test@email.com',
            password: 'password'
          })
          .end((err, res) => {
            res.status.should.equal(200);
            res.body.should.have.property('jwt');
            etoken = res.body.token;
            done();
          });
      });
    });
  });

  describe('authenticate', () => {
    it('should reject invalid tokens', (done) => {
      request
        .post('/api/v1/auth/signup')
        .set('x-access-token', 'doidohiiod')
        .send({
          name: 'test user',
          email: 'test@email.com',
          password: 'password',
          phone: '08011110000',
          department: '4oi4oi3o9409',
          dOE: '01/01/2018',
          secret: 'secret'
        })
        .end((err, res) => {
          res.status.should.equal(401);
          res.body.error.should.equal('Invalid token.');
          done();
        });
    });
  });

  describe('forgot password request', () => {
    describe('allow', () => {
      it('for user\'s existing and valid emails', () => {
        request
          .post('/api/v1/auth/forgot-password')
          .send({
            email: 'test@email.com',
            password: 'customer',
            secret: 'ibadan'
          })
          .end((err, res) => {
            res.status.should.equal(200);
            res.body.message.equal('Password change successful.');
            done();
          });
      });
    });

    describe('doesn\'t allow', () => {
      it('for user\'s with invalid emails', (done) => {
        request
          .post('/api/v1/auth/forgot-password')
          .send({
            email: 'test@email',
            password: 'customer',
            secret: 'ibadan'
          })
          .end((err, res) => {
            res.status.should.equal(400);
            res.body.error.should.equal('Invalid email address.');
            done();
          });
      });

      it('for user\'s without existing emails', (done) => {
        request
          .post('/api/v1/auth/forgot-password')
          .send({
            email: 'testing@email.com',
            password: 'customer',
            secret: 'ibadan'
          })
          .end((err, res) => {
            res.status.should.equal(404);
            res.body.error.should.equal('User does not exist.');
            done();
          });
      });

      it('for user\'s with invalid password', (done) => {
        request
          .post('/api/v1/auth/forgot-password')
          .send({
            email: 'test@email.com',
            password: 'cust',
            secret: 'ibadan'
          })
          .end((err, res) => {
            res.status.should.equal(400);
            res.body.error.should.equal('Invalid Password.');
            done();
          });
      });

      it('for user\'s with invalid secrets', (done) => {
        request
          .post('/api/v1/auth/forgot-password')
          .send({
            email: 'test@email.com',
            password: 'customer',
            secret: 'iba'
          })
          .end((err, res) => {
            res.status.should.equal(401);
            res.body.error.should.equal('Invalid Secret.');
            done();
          });
      });
    });
  });
});
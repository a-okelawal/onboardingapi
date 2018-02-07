import should from 'should';
import supertest from 'supertest';

import server from '../server';

const request = supertest(server);

let stoken, sid, eid;

describe('Task', () => {
  before((done) => {
    request
      .post('/api/v1/auth/login')
      .send({
        email: process.env.SUPEREMAIL,
        password: process.env.SUPERPASSWORD
      })
      .end((err, res) => {
        sid = res.body.user.id;
        stoken = res.body.jwt;
        done();
      });
  });

  before((done) => {
    request
      .post('/api/v1/auth/login')
      .send({
        email: 'test@email.com',
        password: 'password'
      })
      .end((err, res) => {
        eid = res.body.user.id;
        done();
      });
  });

  describe('create', () => {
    describe('doesn\'t allow', () => {
      it('for creation without a valid task', (done) => {
        request
          .post('/api/v1/tasks')
          .set('x-access-token', stoken)
          .send({
            administrator: sid,
            assignee: eid,
            task: 'Tes',
            due: '12/02/2018'
          })
          .end((err, res) => {
            res.status.should.equal(400);
            res.body.error.should.equal('Task must be at least 10 characters.');
            done();
          });
      });

      it('for creation without a valid due date', (done) => {
        request
          .post('/api/v1/tasks')
          .set('x-access-token', stoken)
          .send({
            administrator: sid,
            assignee: eid,
            task: 'Test Task for testing.',
            due: '2kjkjrr'
          })
          .end((err, res) => {
            res.status.should.equal(400);
            res.body.error.should.equal('Task must have a due date. Format dd/mm/yyyy.');
            done();
          });
      });
    });

    describe('allows', () => {
      it('for creation with a valid task', (done) => {
        request
          .post('/api/v1/tasks')
          .set('x-access-token', stoken)
          .send({
            administrator: sid,
            assignee: eid,
            task: 'Test Task for testing.',
            due: '12/02/2018'
          })
          .end((err, res) => {
            res.status.should.equal(201);
            res.body.message.should.equal('Task created successfully.');
            done();
          });
      });
    });
  });

  describe('get', () => {
    it('should get all tasks', (done) => {
      request
        .get('/api/v1/tasks')
        .set('x-access-token', stoken)
        .end((err, res) => {
          res.status.should.equal(200);
          res.body.length.should.equal(1);
          done();
        });
    });
  });
});
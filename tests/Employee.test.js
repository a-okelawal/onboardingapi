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

  describe('read', () => {
    it('should return all employees', (done) => {
      request
        .get('/api/v1/employee')
        .set('x-access-token', stoken)
        .end((err, res) => {
          res.status.should.equal(200);
          res.body.length.should.equal(2);
          done();
        });
    });
  });
});
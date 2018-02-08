import sinon from 'sinon';
import should from 'should';

import TokenUtil from '../app/shared/TokenUtil';

var token;

describe('Token Utility', () => {
  it('generate a token when a user is passed in', () => {
    token = TokenUtil.generateToken(Object({
      _id: 0,
      name: 'Abisoye Oke-lawal',
      role: 'employee'
    }));

    token.should.be.ok;
  });

  describe('Verify', () => {
    it('should decode a token and return an error on invalid token supplied', (done) => {
      TokenUtil.verify('KDJBFJKB3.4UB4B44KO43.4OIOIOIEH').catch((err) => {
        err.code.should.equal(401);
        err.error.should.equal('Invalid token.');
        done();
      });
    });
  
    it('should decode a token and supply the payload on successful token supplied', (done) => {
      TokenUtil.verify(token).then((decoded) => {
        decoded.id.should.equal(0);
        decoded.name.should.equal('Abisoye Oke-lawal');
        decoded.role.should.equal('employee');
        done();
      });
    });
  });
});
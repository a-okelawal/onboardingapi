import should from 'should';

import StringUtil from '../app/shared/StringUtil';

var invalidEmails, validEmails;

describe('String Utility', () => {
  describe('Email Utility', () => {
    before(() => {
      invalidEmails = [
        '@test.com',
        'another@test',
        '""43&4@chal.com'
      ];

      validEmails = [
        'test@email.com',
        'test@email.co',
        'test@email.co.uk'

      ];
    });

    it('should return false for invalid emails', () => {
      invalidEmails.forEach(element => {
        StringUtil.isEmailValid(element).should.equal(false);
      });
    });

    it('should return true for valid emails', () => {
      validEmails.forEach(element => {
        StringUtil.isEmailValid(element).should.equal(true);
      });
    });
  });
});
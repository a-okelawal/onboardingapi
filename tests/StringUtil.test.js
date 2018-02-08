import bcrypt from 'bcrypt';
import sinon from 'sinon';
import should from 'should';

import StringUtil from '../app/shared/StringUtil';

let invalidDates, invalidEmails, invalidNumbers, validDates, validEmails, validNumbers;
let password;

describe('String Utility', () => {
  describe('Email Validation', () => {
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

  describe('Phone Validation', () => {
    before(() => {
      invalidNumbers = [
        '+2345558393884',
        '984984984',
        '000000000'
      ];

      validNumbers = [
        '08022222222',
        '09030203055',
        '07145366666'

      ];
    });

    it('should return false for invalid emails', () => {
      invalidNumbers.forEach(element => {
        StringUtil.isPhoneValid(element).should.equal(false);
      });
    });

    it('should return true for valid emails', () => {
      validNumbers.forEach(element => {
        StringUtil.isPhoneValid(element).should.equal(true);
      });
    });
  });

  describe('Hash Password', () => {
    before(() => {
      sinon.stub(bcrypt, 'hashSync').returns('G4HG3H4G3H4G3J4');
    });
    
    after(() => {
      bcrypt.hashSync.restore();
    });

    it('should return hashed password', () => {
      password = StringUtil.hashPassword();
      password.should.equal('G4HG3H4G3H4G3J4');
    });

    it('should return true for valid emails', () => {
      validNumbers.forEach(element => {
        StringUtil.isPhoneValid(element).should.equal(true);
      });
    });
  });

  describe('Date Validator', () => {
    before(() => {
      invalidDates = [
        'dflhkfhf',
        '03-02*3333',
        '03|02-3333'
      ];

      validDates = [
        '03-02-2019',
        '03/04/18',
        '03/02-3333'
      ];
    });

    it('should return false for invalid dates', () => {
      invalidDates.forEach(element => {
        StringUtil.isDateValid(element).should.equal(false);
      });
    });

    it('should return true for valid dates', () => {
      validDates.forEach(element => {
        StringUtil.isDateValid(element).should.equal(true);
      });
    });
  });
});
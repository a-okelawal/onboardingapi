import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    lowercase: true
  },
  email: {
    type: String,
    lowercase: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    minlength: 11,
    maxlength: 11
  },
  department: {
    type: String
    //TODO: Add the code below once the Department model has been created
    // ref: 'Department'
  },
  dOE: {
    type: Date,
    default: new Date
  },
  role: {
    type: String,
    enum: ['super', 'admin', 'employee'],
    default: 'employee'
  },
  secret: {
    required: true,
    type: String
  },
  recentHire: {
    type: Boolean,
    default: false
  }
});

const User = mongoose.model('User', userSchema);

/**
 * Create User
 * Note: es6 function syntax will not work for model methods
 * @param {*} user 
 */
User.createUser = function(user) {
  return new Promise((resolve, reject) => {
    this.findUserByEmail(user.email).then((result) => {
      if (result) {
        reject({ code: 409, error: 'User with email already exists.' });
      } else {
        user.save((err) => {
          if (err) {
            reject({ code: 500, error: err });
          } else {
            resolve(user);
          }
        });
      }
    }).catch((err) => {
      reject(err);
    });
  });
};

/**
 * Find user by email
 * Note: es6 function syntax will not work for model methods
 * @param {*} email 
 */
User.findUserByEmail = function(email) {
  return new Promise((resolve, reject) => {
    this.findOne({ email: email }, (err, user) => {
      if (err) {
        reject({ code: 500, error: err});
      } else {
        resolve(user);
      }
    });
  });
};

export default User;

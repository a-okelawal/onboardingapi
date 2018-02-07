import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import User from '../app/models/User';

dotenv.config();

const environment = process.env.NODE_ENV;
let db;

switch(environment) {
  case 'test':
    db = process.env.MONGO_TEST;
    break;
  case 'dev':
    db = process.env.MONGO_URL;
    break;
}

mongoose.connect(db);

mongoose.connection.once('connected', () => {

  if (environment == 'test') {
    mongoose.connection.db.dropCollection('users', (err) => {
      console.log('Dropped User');
    });

    mongoose.connection.db.dropCollection('departments', (err) => {
      console.log('Dropped Departments');
    });

    mongoose.connection.db.dropCollection('tasks', (err) => {
      console.log('Dropped Tasks');
    });
  }

  const salt = bcrypt.genSaltSync(10);

  User.findOne({ email: process.env.SUPEREMAIL}, (err, user) => {
    if (!user) {
      User.create({
        name: 'Super Admin',
        email: process.env.SUPEREMAIL,
        password: bcrypt.hashSync(process.env.SUPERPASSWORD, salt),
        role: 'super',
        phone: process.env.SUPERPHONE,
        department: 'Management',
        secret: 'superadmin'
      }, (err, user) => {
        console.log('Created Super User');
        process.exit(0);
      });
    } else {
      process.exit(0);
    }
  });
});
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

export default mongoose.model('User', userSchema);
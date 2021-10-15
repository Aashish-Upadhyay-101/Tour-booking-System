const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A user must have a name'],
    trim: true,
    maxlength: [40, 'A name must be maximum 40 characters'],
    minlength: [5, 'A name must be minimum 10 characters'],
  },

  email: {
    type: String,
    required: [true, 'A user must have an email address'],
    trim: true,
    lowercase: true,
    unique: true,
    validate: [validator.isEmail, 'Please enter a valid email'],
  },

  photo: String,

  password: {
    type: String,
    required: [true, 'A user must have password'],
    minlength: 8,
    select: false,
  },

  passwordConfirm: {
    type: String,
    required: [true, 'A user must have confirm password'],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'Password not matched',
    },
  },
});

// pre middleware for password encryption
/* this function only works only if the password in modified */
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  /* hashing password with cost of 12... (here the cost the lower the cost low CPU intensive and high risk of hackiing... higher it is higher the cpu intensive but secured!) */
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// model
const User = mongoose.model('User', userSchema);

module.exports = User;
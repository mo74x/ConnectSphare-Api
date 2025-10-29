import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      trim: true,
      lowercase: true
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password must be at least 8 characters long'],
      select: false,
      validate: {
        validator: function(value) {
          return value.length >= 8;
        },
        message: 'Password must be at least 8 characters long'
      }
    },
    bio: {
      type: String,
      default: ''
    },
    followers: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    following: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }]
  }, {
    timestamps: true // Adds createdAt and updatedAt fields
  });

  // Add a method to compare passwords
  userSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
  // Hash the password before saving
  userSchema.pre('save', function(next) {
    if(!this.isModified('password')) {
      return next();
    }
    this.password = bcrypt.hashSync(this.password, 10);
    next();
  });
  // Add a method to generate a JWT token
  userSchema.methods.generateToken = function() {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  };

  const User = mongoose.model('User', userSchema);
  export default User;
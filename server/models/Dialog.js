const mongoose = require('mongoose');

const dialogSchema = new mongoose.Schema({
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  ],
  lastMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message',
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt timestamp before saving
dialogSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const Dialog = mongoose.model('Dialog', dialogSchema);
module.exports = Dialog;

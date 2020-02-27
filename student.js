const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const studentSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  course: {
    type: String,
    required: true,
    unique: false,
    trim: true,
    minlength: 3
  },
  regno: {
      type: Number,
      required: true,
      unique: true,
  }
}, {
  timestamps: true,
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;

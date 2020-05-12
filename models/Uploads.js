const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UploadSchema = new Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    video: {
      type: String,
    },
    gestureName: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: 'Upload',
  }
);

module.exports = mongoose.model('Upload', UploadSchema);

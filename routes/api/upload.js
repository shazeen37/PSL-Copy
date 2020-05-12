let express = require('express'),
  multer = require('multer'),
  mongoose = require('mongoose'),
  uuidv4 = require('uuid/v4'),
  router = express.Router();
let uploads = require('../../models/Uploads');

const DIR = '../../public/';
let path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, '../../public/'));
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, uuidv4() + '-' + fileName);
  },
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == 'video/mp4' ||
      file.mimetype == 'image/mpg' ||
      file.mimetype == 'image/avi'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .mp4, .mpg and .avi format allowed!'));
    }
  },
});

// uploads

router.post('/', upload.single('video'), (req, res, next) => {
  console.log('file: ', req.file);
  console.log('body: ', req.body);
  console.log('video: ', req.video);
  const url = req.protocol + '://' + req.get('host');

  const user = new uploads({
    _id: new mongoose.Types.ObjectId(),
    gestureName: req.body.gestureName,
    video: url + '/public/' + req.file.filename,
  });
  user
    .save()
    .then((result) => {
      res.status(201).json({
        message: 'uploads successfully!',
        userCreated: {
          _id: result._id,
          video: result.video,
          gestureName: result.gestureName,
        },
      });
      console.log(req.body.gestureName);
    })

    .catch((err) => {
      console.log(err),
        res.status(500).json({
          error: err,
        });
    });
});

router.get('/', (req, res, next) => {
  uploads.find().then((data) => {
    res.status(200).json({
      message: 'uploads list retrieved successfully!',
      users: data,
    });
  });
});

module.exports = router;

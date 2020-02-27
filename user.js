const router = require('express').Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');

router.route('/signup').post((req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const type = req.body.type;

  if(!['ADMIN', 'STUDENT'].includes(type)) {
    throw new Error('Can only be Admin or Student');
  }

  const user = new User({
    name: name,
    email: email,
    password: password,
    type: type.toUpperCase()
  });
  user.save().then(result => {
    console.log('User Created');
    res.status(200).json({
      "message":"User Created"
    });
  }).catch(error => {console.log('Error is ' + error)
  res.status(400);
  });

});


router.route('/login').post((req,res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({email: email, password: password}).then(user => {
    if (user) {
      const token = jwt.sign({email: email, id: user._id}, 'secretKey');
    return res.status(200).json({
      "message": "User Logged In",
      "token": token
    });
  }else {
    return res.status(404).json({
      "message": "User Not Foun"
    });
  }
  }).catch(error => res.status(400).json({
    "message": "error"
  }))
})

module.exports = router;

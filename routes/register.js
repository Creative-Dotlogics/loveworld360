const express = require('express');
const router = express.Router();
const UserSchema = require('./../models/userSchema');
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
mongoose.connect("mongodb+srv://limitless:Iwonttellu1@loveworld360-fjoja.mongodb.net/users?retryWrites=true&w=majority",{ useNewUrlParser: true })


router.post('/', function(req, res, next) {
  const {name,email,phone,password,chapter} = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  const User = new UserSchema({
    name: name,
    email: email,
    phone: phone,
    chapter: chapter,
    password: hash
  })

  UserSchema.findOne({email})
  .then(user=>{
    if(!user){
      User.save()
      .then(()=>{ res.json({saved:true}); })
      .catch(err=>{ res.json({saved: false, error:err}); })
    }else{
      res.json({saved:false,field:'email',error:'Email Already Exist'})
    }
  })
});

module.exports = router;

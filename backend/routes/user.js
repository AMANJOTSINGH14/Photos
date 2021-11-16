const express = require("express");
const router = express.Router();
const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken")
router.post("/signup", (req, res) => {
  bcrypt.hash(req.body.password, 9).then((hash) => {
    const user = new User({
      email: req.body.email,
      password: hash,
    });
    user
      .save()
      .then((result) => {
        res.status(200).send({
          message: "user created",
          result: result,
        });
      })
      .catch((err) => {
        res.status(500).send({message: "Invalid credentials!"});
      });
  });
});
router.post("/login", (req, res) => {
  let fetchUser;

  User.findOne({email:req.body.email}).then((result) => {
        if(!result){
          return res.send("AUTH FAILED")
        }
        fetchUser=result;
        return bcrypt.compare(req.body.password,result.password)
      }).
      then((result)=>{
        if(!result){
          return res.send("PASSWORD FAILED")
        }
        const token = jwt.sign({email:fetchUser.email,id:fetchUser._id},"this.is_the_memories.application",
        {expiresIn:"2h",})
        res.status(200).send({
          token:token,
          expiresIn: 7200,
          userId: fetchUser._id
        })
      })
      .catch((err) => {
        res.status(500).send( {message: "Invalid credentials!"});
      });
  });

module.exports = router;

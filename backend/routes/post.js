const express = require("express");
const multer=require('multer')
const Post = require("../model/post");
const auth=require("../middleware/auth")
const app = express.Router();
const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg"
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname
      .toLowerCase()
      .split(" ")
      .join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, Date.now() +name );
  }
});

app.post('',auth,multer({storage:storage}).single("image"),(req,res)=>{
  const url=req.protocol + "://" + req.get("host")
  const data=new Post({
   title: req.body.title,
   content:req.body.content,
   imagep:url+"/images/" + req.file.filename,
   owner:req.userData.userId

  })
  //  console.log(req.userData.userId)
  data.save().then(result=>{


    res.send({message:'helo',
    postS:{
    title:result.title,
    content:result.content,
    imagep:result.imagep,
    id:result._id
    }})
  })

})
// z9odQxvJwlddIW1W
app.get('',auth,(req,res)=>{
  console.log('d')
const pageSis=+req.query.pageSis;
const currentPage=+req.query.Page;
const userId=req.headers.userid
// console.log(req.userData.userId)
const postQuery=Post.find({owner:userId})
if(pageSis && currentPage){
postQuery.skip(pageSis*(currentPage-1)).limit(pageSis);
}
let fetchedpost;
 postQuery.then((documents)=>{
  fetchedpost=documents
  return Post.find({owner:userId}).count()}).
     then(count=>{

      res.send({
        message:'hi bye',
        post:fetchedpost,
        maxposts:count
       })


  }) .catch(error => {
    res.status(500).send({
      message: "Unable to retrieve posts!"
    });
  });
})

app.get("/:id", auth,(req, res, next) => {
  const userId=req.headers.userid
  Post.findOne({_id:req.params.id,owner:userId}).then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Post not found!" });
    }
  });
});

app.put("/:id",auth, multer({storage:storage}).single("image"),(req, res, next) => {
 const userId=req.headers.userid
  const post = new Post({

    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    imagep:req.body.imagep,
    owner:userId
  });

  Post.updateOne({ _id: req.params.id,owner:userId }, post).then(result => {
    res.status(200).json({ message: "Update successful!" });
  });
});
app.delete('/:id',auth,(req,res)=>{
  const userId=req.headers.userid
  Post.deleteOne({_id:req.params.id,owner:userId},(hey)=>{

    res.json({hey})
  }) .catch(error => {
    res.status(500).send({
      message: "unable to delete!"
    });
  });

})
module.exports = app;

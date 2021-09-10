const jwt =require("jsonwebtoken")
auth =(req,res,next)=>{
try{


  const token=req.headers.authorization.replace('Bearer ','');

decoded =jwt.verify(token,"this.is_the_memories.application")
req.userData={userEmail:decoded.email,userId:decoded.id}

next();
}catch(error){
  res.status(401).send({message:"authdfsaf failed"})
}
}
module.exports=auth

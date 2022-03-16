const jwt = require("jsonwebtoken");
const authorModel=require("../models/authorModel")
const blogModel=require("../models/blogModel")



const loginAuthor = async function (req, res,next) {
try{
    let email = req.body.email;
    let password = req.body.password;
  
    let author = await authorModel.findOne({ email: email, password: password });
    if (!author) res.status(404).send({msg: "username or passowrd is incorrect or author not found"})





    let token = jwt.sign(
        {
          authorid: author._id.toString(),  //payload
          batch: "thorium",
          organisation: "FUnctionUp",
        },
        "Chandan-Key"); //signature


    res.setHeader("x-auth-key",token)

    res.send({ status: true, data: token });

    


    }


    catch(error){
        res.status(500).send(error.message)
    }


}




const Authentication= async  function(req,res,next){


    try{

    let token = req.headers["x-auth-key"]
    //if (!token) token = req.headers["x-Auth-Key"];
    if(!token) res.status(400).send("token must be present ")



    let decodedToken= jwt.verify(token,"Chandan-Key")

    if(!decodedToken) 
  
    return res.status(400).send({ status: false, msg: "token is invalid" });

    console.log(decodedToken)

    next()


    }

    catch(error)
    {res.status(500).send(error.message)}

}



const Authorisation = async function(req,res,next){


    try{

    let token = req.headers["x-auth-key"]
    if (!token) token = req.headers["x-Auth-Key"];
    if(!token) res.status(400).send("token must be present ")

    let decodedToken= jwt.verify(token,"Chandan-Key")

    if(!decodedToken) return res.send({ status: false, msg: "token is invalid" });
    console.log(decodedToken)

  
    

    let blogId=req.params.blogId
    let blogDetails= await blogModel.find({_id:blogId})
    if(!blogDetails) res.send("check param no such blog ")
    let authorDetails= blogDetails.authorId
    if(!authorDetails) res.send("no author for this blog ")

    if(!authorDetails==decodedToken.author_id)
    res.status(400).send({msg:" sorry you are not auhtorised to do that "})

    next()
    }

    catch(error)
    {res.status(500).send(error.message)}




    


}


    










module.exports.loginAuthor=loginAuthor
module.exports.Authentication=Authentication
module.exports.Authorisation=Authorisation





  





 const Userdb =require('../model/model')

 //save and create newuser
 exports.create = (req,res) => {
    if(!req.body){
        res.status(400).send({message : 'content cannot be empty'})
        return
    }
    //New User
    var user = new Userdb({
        name : req.body.name,
        email : req.body.email,
        gender : req.body.gender,
        status : req.body.status
    })

    //save user
    user
    .save(user)
    .then(data => {
        //res.send(data);
        res.redirect('add-user ')
    })
    .catch(err =>{
        res.status(500).send({message : err.message|| "Some error occured while creating a User"})
    })
 }

 //Return and retrieve all user or single user
 exports.find = (req,res) => {

    if(req.query.id){
        const id = req.query.id;

        Userdb.findById(id)
        .then(data => {
            if(!data){
                res.status(400).send({message:"not found user with id"+id })
            }else{
                res.send(data)
            }
        })
        .catch(err => {
            res.status(500).send({message: err.message || "Error occured while retrieving user data with id" +id})
       
        })
        
    }else{
        Userdb.find()
        .then(user => {
            res.send(user)
        })
        .catch(err => {
            res.status(500).send({message: err.message || "Error occured while retrieving user data"})
       })
    }

    
}

//Update user by Id
exports.update = (req,res) => {
if(!req.body){
    return res
    .status(400)
    .send({message:"data to update cannot be empty"})
}
const id = req.params.id;
Userdb.findByIdAndUpdate(id,req.body,{useFindAndModify: false})
.then(data => {
    if(!data){
        res.status(400).send({message:`Cannot update user with ${id}.Maybe user not found`})
    }else{
        res.send(data)
    }
})
.catch(err => {
    res.status(500).send({message: err.message || "Error while updating user information"})
})
}


exports.delete = (req,res) => {
    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
    .then(data =>{
        if(!data){
            res.status(400).send({message:`Cannot update user with ${id}.Maybe user not found`})
        }else{
            res.send({message: `User was deleted Successfully!`})
        }
    })
    .catch(err => {
        res.status(500).send({message: err.message || "Error while updating user information"})

    })
}
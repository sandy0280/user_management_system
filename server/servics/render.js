const axios = require('axios')


exports.homeRoute = (req, res) =>{
axios.get("http://localhost:3000/api/users")
.then(function(response){
    res.render('index',{users : response.data})
})
.catch(err => {
    res.send(err)
})

}

exports.add_user = (req,res) => {
    res.render('add_user')
}

exports.update_user = (req,res) => {
    //jb user data update karega to usko already data fill milega wo axios k kaaran ho raha h.
    axios.get("http://localhost:3000/api/users",{params: {id: req.query.id}})
    .then(userdata => {
        res.render('update_user',{user : userdata.data})
    })
    .catch(err =>{
        re.send(err)
    })

}



//const mongoose = require('mongoose');
const User = require('./Models/users');
const token = require('./Token')

function SignUp(req, res){
    const user = new User({
        email: req.body.email,
        userName: req.body.userName,
        password: req.body.password,
        role: req.body.role
    });

    const us = User.findOne({'email': user.email});

    if(us !== null || us !== undefined){
        res.status(401.1).send({message: `El correo ${us.email} ya existe en la base de datos`})
    }
    user.save((err) =>{
        if(err) res.status(500).send({status:  `error al crear el usuario ${err}`});

        return res.status(200).send({token: token.createToken(user)});
    })
}

function SignIn(req, res){
    
    User.find({'email': req.body.email}, (err, user) =>{
    if(err) return res.status(500).send({message: err});
    if(!user) return res.status(404).send({message: 'No existe el usuario'});
    res.user = user;
    res.status(200).send({
        message: 'Has ingresado correctamente',
        token:  token.createToken(user)
    })
})
}

module.exports = {
    SignIn,
    SignUp
}
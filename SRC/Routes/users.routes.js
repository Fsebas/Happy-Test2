const express = require('express');
const Router = express.Router();
const User = require('../Models/users');
const auth  = require('../authUser') 
const token = require('../Token')


//obtener todos los aplicantes
Router.get('/', async (req, res) => {
   const users = await User.find();
   res.json(users);
});

Router.post('/signup', async (req, res) =>{
  const us = await User.findOne({'email': req.body.email});
  if(us === null || us === undefined){
   const user = new User({
      email: req.body.email,
      userName: req.body.userName,
      password: req.body.password,
      role: req.body.role
  });
   await user.save((err) =>{
      if(err) res.status(500).json({status:  `error al crear el usuario ${err}`});

      return res.status(200).json({token: token.createToken(user)});
  })
}else{
   res.status(401).json({message: `El correo ${req.body.email} ya existe en la base de datos`})
}
})

Router.post('/signin', async(req, res) => {
  await User.findOne({'email': req.body.email}, (err, user) =>{
      if(err) return res.status(500).send({message: err});
      if(!user) return res.status(404).send({message: 'No existe el usuario'});
      
      user.compararPassword(req.body.password,(err, Equals) =>{
         if(Equals){
          res.user = user;
          res.status(200).send({
          message: 'Te has logeado correctamente',
          token:  token.createToken(user)
           })
         }else{
            return res.status(401).send({message: 'Contraseña incorrecta'});
         }
      });
   });
});



module.exports = Router;
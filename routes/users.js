const express = require('express');
const user = require('../models/user');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const config = require('../config/database');



router.get('/',(req,res)=>
    res.send('Hello user!'));

router.post('/login',(req,res)=>{
    const email= req.body.email;
    const password= req.body.password;

    user.findByEmail(email,(err,User)=>{
        if(err) throw err;
        
        if(!User){
            res.json({state:false,msg:"NO user found!"});   
        }
        else{
        user.passwordCheck(password,User.password,function(err,match){
            if(err) throw err;
            if(match){
                const obj = { _id: User._id,
                    username: User.username,
                    name: User.name,
                    email: User.email,
                    password: User.password,
                    __v: User.__v };
                const token = jwt.sign(obj,config.secrete,{expiresIn:86400*3},(err,token)=>{
                res.json({
                    state:true,
                    token:"Bearer "+token,
                    user:{
                        id:User._id,
                        name:User.name,
                        username:User.username,
                        email:User.email
                    }
                })
                });
            }
            if(!match){
                res.json({state:false,msg:"password does not matched!"}); 
            }
        
        });
    }
    })
    });


router.post('/register',(req,res)=>{
    const newUser = new user({
        username: req.body.username,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })

    user.saveUser(newUser,(err,user)=>{
        if(err){
            res.json({state:false,msg:'User Registration Failed!'});
        }
        if(user){
            res.json({state:true,msg:'User has being registered!'});    
        }
    })    

});


router.get('/profile',user.verifytoken,(req,res)=>{
    jwt.verify(req.token,config.secrete,(err,authdata)=>{
        if(err){
            res.sendStatus(403);
        } 
        else{
            res.json(authdata);
        }
    });
});



module.exports = router;
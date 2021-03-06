/**
 * Created by mahasagar on 20/12/16.
 */
var User = require('../models/User');
var Messages = require('../Utilities/messages');

function createUserAPI(req,res){
    var checkUsername = {
        'username' : req.body.username
    }
    getUserByUsername(checkUsername,function(userExistsRes){

        if(userExistsRes.result == false) {
            var newUser = {
                 name: req.body.name,
                 auth : {
                    username: req.body.username,
                    password: req.body.password
                 },
                 email : req.body.username,
                 address :{
                     fullAddress : req.body.address
                 },
                 placeType :  "Retailer",
                 status : "user",
                 contactNumbers : {
                     mobile : req.body.mobile
                  }
                };
           var createUser = new User(newUser);
            createUser.save(function (err, result) {
                res.json({result : result,status : true});
            });
        }else{
            userExistsRes.status =false;
            res.json(userExistsRes);
        }
    });
}

function getUserByUsername(req,res){
    var loginDetail = {
        'auth.username' :req.username
    };
    User.findOne(loginDetail,function(req,results){
        if(results !== null) {
            res({result :Messages.usernameExists,status : true});
        }else{
            res({result :false,status : false});
        }
    })
}

function loginToApp(req,res){
    var loginDetail = {
        'auth.username' :req.body.username,
        'auth.password' : req.body.password
    };
    console.log("loginDetail : "+JSON.stringify(loginDetail));
    User.findOne(loginDetail,function(req,results){
        console.log("req : "+JSON.stringify(req));
        console.log("results : "+JSON.stringify(results));
        if(results !== null) {
            res.json({result :results,status : true});
        }else{
            res.json({result : Messages.userOrPasswordWrong,status : false});
        }
    })
}

function listOfUserAPI(req,res){
    User.find({},function(req,results){
        res.json({result : results,status : true});
    })
};

module.exports.createUser = createUserAPI;
module.exports.listOfUser = listOfUserAPI;
module.exports.loginToApp = loginToApp;
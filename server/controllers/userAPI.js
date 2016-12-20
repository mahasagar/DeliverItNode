/**
 * Created by mahasagar on 20/12/16.
 */
var User = require('../models/User');


function createUserAPI(req,res){
    var createUser = new User(req.body);
    createUser.save(function(err,result){
        res.json(result);
    });
}

function listOfUserAPI(req,res){
    User.find({},function(req,results){
        res.json(results);
    })
};

module.exports.createUser = createUserAPI;
module.exports.listOfUser = listOfUserAPI;
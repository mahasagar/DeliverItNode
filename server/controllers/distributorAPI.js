/**
 * Created by mahasagar on 14/1/17.
 */
var Distributor = require('../models/Distributor');

function getDistributor(req,res){
    var query = {
        _id : req.body._id
    };
    //var select = { services: 1, name: 1 };

    Distributor.find(query,function(req,results){
        res.json({result : results[0]} );
    })
};

module.exports.getDistributor = getDistributor;

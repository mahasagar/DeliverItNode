/**
 * Created by mahasagar on 20/12/16.
 */
/**
 * Created by mahasagar on 20/12/16.
 */
var Products = require('../models/Products');
var ObjectId = require('mongoose').Types.ObjectId;

function addProducts(req,res){
    var newProduct = new Products(req.body);
    newProduct.save(function(err,result){
        res.json(result);
    });
}

function getAllProducts(req,res){
    Products.find({},function(req,results){
        res.json(results);
    })
};

function getProductsSuggestion(req,res){
    var query = {};
    /*var query = {
        _id : req.body._id
    };*/
    var select = { distributors: 0, updatedAt: 0,createdDate:0 };
    Products.find(query,select,function(req,results){
        res.json(results);
    })
};

function getProductDistributors(req,res){
    var query =  {_id : req.body.productId};
    /*var query = {
     _id : req.body._id
     };*/
    var select = {"distributors" : 1,'_id':0 };
    Products.find(query,select,function(req,results){
        res.json(results);
    });
};


module.exports.addProducts = addProducts;
module.exports.getAllProducts = getAllProducts;
module.exports.getProductDistributors = getProductDistributors;
module.exports.getProductsSuggestion = getProductsSuggestion;
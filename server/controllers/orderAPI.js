/**
 * Created by mahasagar on 20/12/16.
 */
var Order = require('../models/Order');

function generateOrderId() {
    var length = 17;
    var timestamp = + new Date();
    var randomInt = function( min, max ) {
        return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
    };
    var ts = timestamp.toString();
    var parts = ts.split('').reverse();
    var id = '';
    for( var i = 0; i < length; ++i ) {
        var index = randomInt( 0, parts.length - 1 );
        id += parts[index];
    }
    return 'D_I'+id;
}

function placeOrder(req,res){

    console.log("req.body ",JSON.stringify(req.body));
    var newOrder = new Order(req.body);
    newOrder.orderId = generateOrderId();
    newOrder.orderStatus = "NEW";
    newOrder.save(function(err,result){
        console.log("err",JSON.stringify(err));
        console.log("result",JSON.stringify(result));
        res.json(result);
    });
}

function getAllOrders(req,res){
    var query = {
        businessId : req.body.businessId
     };
    Order.find(query,function(req,results){
        res.json(results);
    })
};

module.exports.placeOrder = placeOrder;
module.exports.getAllOrders = getAllOrders;
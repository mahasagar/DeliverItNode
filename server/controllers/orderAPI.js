/**
 * Created by mahasagar on 20/12/16.
 */
var Order = require('../models/Order');
var Cart = require('../models/Cart');
var ObjectId = require('mongoose').Types.ObjectId;

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

    var  newOrder =
    {
        businessId: req.body.businessId,
        orderId : generateOrderId(),
        businessName : req.body.businessName,
        orderStatus: "NEW",
        orderType :  req.body.orderType,
        grandTotal : "",
        businessInfo : {
            to : {
                businessId : "",
                name : "",
                contactInfo : {
                    name : "",
                    number :""
                }
            },
            from : {
                userId : "",
                name : "",
                contactInfo : {
                    name : "",
                    number :""
                }
            }
        },
        "items" : []
    };

    newOrder.orderStatus = "NEW";
    var cart = new Cart(req.body);
    var isInCart =false;
//{"items.distributorId":ObjectId("5879c1aec87641bd5e4eb283"),"businessId":ObjectId("58653f51018ef05df2c1286f")}
    Cart.findOne({businessId: req.body.businessId,
        "items.distributorId" : req.body.distributorId}, function (err, result) {

        console.log("result :",JSON.stringify(result));
        formatCartResponse(result, req.body.distributorId,function(cart){
            var orderDetails = cart[0];
            newOrder.grandTotal = orderDetails.total;
            newOrder.businessInfo.to.businessId = new ObjectId(orderDetails.distributorId);
            newOrder.businessInfo.to.name = orderDetails.distributorName;
            newOrder.businessInfo.from.userId = new ObjectId(req.body.businessId);
            newOrder.businessInfo.from.name = req.body.businessName;
            newOrder.items = orderDetails.items;

            var order = new Order(newOrder);
            order.save(function(err,result){
                console.log("err",JSON.stringify(err));
                console.log("result",JSON.stringify(result));
                Cart.update({"businessId" : ObjectId(req.body.businessId)},
                    { "$pull" :
                      { "items" :
                        { "distributorId" :  ObjectId(orderDetails.distributorId)}
                      }
                    },function(err,removeCartResult){
                        console.log("remove errp",JSON.stringify(err));
                        console.log("removeCartResult Sus",JSON.stringify(removeCartResult));
                        if(removeCartResult.ok == 1){
                            res.json({result : true});
                        }else{
                            res.json({result : false});
                        }

                    });


            });

            //res.json({result : formatedCart,"status" : true});

        })

    });

}

function getAllOrders(req,res){
    var query = {
        businessId : req.body.businessId
     };
    var queryFinal = Order.find(query);
    queryFinal.sort('-createdDate');
    queryFinal.exec(function(err, results) {
        if (err) throw err;
        res.json(results);
    });
};

function formatCartResponse(data,itemDistributorId,res){
    var cartItems =[];
    if(data && data.items){
        cartItems = groupBy(data.items, function(item) {

            item.total = parseFloat( ( item.orderQty ) * item.unitPrice ).toFixed(2);
            item.unitPrice = parseFloat(item.unitPrice).toFixed(2);
            item.MRP = parseFloat(item.MRP).toFixed(2);
            return [item.distributorId, item.distributorName];
        });
        var cartsData = [];
        if(cartItems){
            for(var i = 0 ; i < cartItems.length ; i++){
                var distributorName = '';
                var distributorId = '';
                var total = 0;
                for(var j = 0 ; j < cartItems[i].length ; j++){
                    distributorId = cartItems[i][j].distributorId;
                    distributorName = cartItems[i][j].distributorName;
                    total = total + parseFloat(cartItems[i][j].total);
                }
                total = parseFloat(total).toFixed(2);
                if(distributorId == itemDistributorId) {
                    cartsData.push({
                        distributorName: distributorName,
                        distributorId: distributorId,
                        total: total,
                        items: cartItems[i]
                    });
                }
            }


            res(cartsData)
        }
    }

}
function groupBy(list, fn) {
    var groups = {};
    for (var i = 0; i < list.length; i++) {
        var group = JSON.stringify(fn(list[i]));
        if (group in groups) {
            groups[group].push(list[i]);
        } else {
            groups[group] = [list[i]];
        }
    }
    return arrayFromObject(groups);
}

function arrayFromObject(obj) {
    var arr = [];
    for (var i in obj) {
        arr.push(obj[i]);
    }
    return arr;
}


function getCartDetails(req,res){
    Cart.findOne({businessId : req.body.businessId},function(req,results){
        formatCartResponse(results,function(formatedCart){
            res.json({result : formatedCart,"status" : true});
        })
    })
};
module.exports.placeOrder = placeOrder;
module.exports.getAllOrders = getAllOrders;
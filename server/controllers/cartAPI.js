/**
 * Created by mahasagar on 20/12/16.
 */
var Cart = require('../models/Cart');
var ObjectId = require('mongoose').Types.ObjectId;

function addToCartAPI(req,res){
    var cart = new Cart(req.body);
    var isInCart =false;
    var cartItem = {
        name: req.body.name,
        brand: req.body.brand,
        form : req.body.form,
        packType : req.body.packType,
        packSize : req.body.packSize,
        orderQty : req.body.quantity,
        unitPrice:req.body.distributorPrice ,
        MRP : req.body.MRP,
        productId : new ObjectId(req.body.productId),
        distributorId : req.body.distributorId,
        distributorName : req.body.distributorName
    };

    Cart.findOne({businessId: new ObjectId(req.body.businessId)}, function (err, cart) {
        if (cart) {
            console.log("req.body.businessId : "+req.body.businessId)
            console.log("req.body.productId : "+req.body.productId)
            console.log("req.body.distributorId : "+req.body.distributorId)
            var query = {businessId: new ObjectId(req.body.businessId),
                  "items.productId" : new ObjectId(req.body.productId),
                  "items.distributorId" : new ObjectId(req.body.distributorId)
            };

            for(var i =0 ;i< cart.items.length;i++ ){
                if(cart.items[i].distributorId == req.body.distributorId &&
                    cart.items[i].productId == req.body.productId  ){
                    isInCart = true;
                    break;
                }else{
                    isInCart = false;
                }
            }

            if(isInCart == false){
                cart.items.push(cartItem);
                cart.save();
                formatCartResponse(cart,function(formatedCart){
                    console.log("res "+JSON.stringify(formatedCart));
                    res.json({result : formatedCart,"status" : true});
                })
            }else{
                res.json({result : "Product Already in Cart","status" : false});
            }
            /*Cart.find(query,
                function(err,carts){
                    console.log("cart : "+JSON.stringify(carts))
                    if(carts.length > 0){
                        res.json({result : "Product Already in Cart","status" : false});
                    }else {
                        cart.items.push(cartItem);
                        cart.save();
                        formatCartResponse(cart,function(formatedCart){
                            console.log("res "+JSON.stringify(formatedCart));
                            res.json({result : formatedCart,"status" : true});
                        })
                    }
            });*/

        } else {
            var cartData = {
                businessId : req.body.businessId,
                businessName : req.body.businessName,
                items:[cartItem]
            };
            Cart.create(cartData,function (err, result) {
                formatCartResponse(result,function(formatedCart){
                    res.json({result : formatedCart,"status" : true});
                })
            });
        }
    });

}
function formatCartResponse(data,res){
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
                cartsData.push({distributorName : distributorName,distributorId : distributorId, total : total , items : cartItems[i]});
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

module.exports.addToCartAPI = addToCartAPI;
module.exports.getCartDetails = getCartDetails;
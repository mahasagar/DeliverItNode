/**
 * Created by mahasagar on 20/12/16.
 */

var mongoose = require('mongoose');
var ObjectId = require('mongoose').Types.ObjectId;

module.exports = mongoose.model('Cart',{
    businessId: {type : mongoose.Schema.Types.ObjectId},
    businessName : {type: String},
    items : [
        {
            name: {type: String,require: true},
            brand: {type: String},
            form: {type: String},
            packSize: {type: String},
            packType: {type: String},
            orderQty : {type: Number},
            total : {type: Number},
            unitPrice: {type: Number},
            MRP: {type: Number},
            productId : {type: mongoose.Schema.Types.ObjectId, require: true},
            distributorId : {type: mongoose.Schema.Types.ObjectId},
            distributorName : {type: String},
            attedToCartDate : { type : Date , default : Date.now}

        }
    ],
    updatedAt : {type: Date},
    createdDate: {type: Date, require: true, default: Date.now}
});


/**
 * Created by mahasagar on 20/12/16.
 */

var mongoose = require('mongoose');
var ObjectId = require('mongoose').Types.ObjectId;
module.exports = mongoose.model('Products',{
    brand: {type : String},
    form : {type: String},
    marketingCompany :  {type: String},
   
    name : {type: String},
    productImgUrl : {type: String},
    packSize : {type: String},
    packType: {type: String},
    MRP : {type: Number},
    distributors : [{
        _id : {type: String},
      distributorName : {type: String},
      distributorPrice :  {type: Number}
    }],
    updatedAt : {type: Date},
    createdDate: {type: Date, require: true, default: Date.now}
});

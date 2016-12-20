/**
 * Created by mahasagar on 19/12/16.
 */
var mongoose = require('mongoose');
var ObjectId = require('mongoose').Types.ObjectId;
module.exports = mongoose.model('User',{
    name: {type: String},
    auth: {
        local: {
            username: {type: String},
            password: {type: String}
        }
    },
    email : {type: String},
    address :{type: String},
    placeType : {type: String},
    status : {type: String},
    contactNumbers : {
        mobile : {type: String},
        landLine :  {type: String}
    },
    updatedAt : {type: Date},
    createdDate: {type: Date, require: true, default: Date.now}
});
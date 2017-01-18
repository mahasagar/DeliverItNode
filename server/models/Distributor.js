/**
 * Created by mahasagar on 14/1/17.
 */

/**
 * Created by mahasagar on 19/12/16.
 */
var mongoose = require('mongoose');
var ObjectId = require('mongoose').Types.ObjectId;
module.exports = mongoose.model('Distributor',{
    name: {type: String, require: true},
    overview: {type: String},
    status: {type: String, default: 'New'},
    contactNumbers : {
        mobile : {type: String},
        landLine :  {type: String}
    },
    placeType : {type: String ,default: "Distributor"},
    email : {type: String},
    address :{
        fullAddress : {type: String},
        lat : {type: String},
        long : {type: String}
    },
    createdDate: {type: Date, require: true, default: Date.now},
    employees: [{
        userId: {type: mongoose.Schema.Types.ObjectId},
        roles: {type: [String]},
        createdDate: {type: Date, default: Date.now}
    }]
});
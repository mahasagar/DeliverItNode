var express = require("express"),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    API = require("./server/controllers/userAPI.js"),
    ProductAPI = require("./server/controllers/productAPI.js"),
    cartAPI = require("./server/controllers/cartAPI.js"),
    orderAPI = require("./server/controllers/orderAPI.js");

//connect mongo
mongoose.connect('mongodb://localhost:27017/waterbottles');

app.use(bodyParser());

app.get('/',function(req,res){
 res.sendfile(__dirname+'/client/views/index.html');
})

app.use("/js",express.static(__dirname+'/client/js'));

app.post('/api/createUser',API.createUser);
app.get('/api/listOfUser',API.listOfUser);

app.post('/api/placeOrder',ProductAPI.addProducts);
app.get('/api/getAllProducts',ProductAPI.getAllProducts);

app.post('/api/addToCartAPI',cartAPI.addToCartAPI);
app.post('/api/getCartDetails',cartAPI.getCartDetails);

app.post('/api/placeOrder',orderAPI.placeOrder);
app.get('/api/getAllOrders',orderAPI.getAllOrders);

module.exports = app;

app.listen(3000,function(){
 console.log("Welcome to DeliverIt..")
})


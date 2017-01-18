var express = require("express"),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    userAPI = require("./server/controllers/userAPI.js"),
    ProductAPI = require("./server/controllers/productAPI.js"),
    cartAPI = require("./server/controllers/cartAPI.js"),
    orderAPI = require("./server/controllers/orderAPI.js"),
    DistributorAPI = require("./server/controllers/distributorAPI.js");

//connect mongo
mongoose.connect('mongodb://localhost:27017/waterbottles');

app.use(bodyParser());

app.get('/',function(req,res){
 res.sendfile(__dirname+'/client/views/index.html');
})

app.use("/js",express.static(__dirname+'/client/js'));

app.post('/api/registerUser',userAPI.createUser);
app.post('/api/getLogin',userAPI.loginToApp);
app.get('/api/listOfUser',userAPI.listOfUser);


app.post('/api/getProducts',ProductAPI.getAllProducts);
app.post('/api/getProductDistributors',ProductAPI.getProductDistributors);
app.post('/api/getProductsSuggestion',ProductAPI.getProductsSuggestion);


app.post('/api/getDistributor',DistributorAPI.getDistributor);

app.post('/api/addToCartAPI',cartAPI.addToCartAPI);
app.post('/api/getCartDetails',cartAPI.getCartDetails);

app.post('/api/placeOrder',orderAPI.placeOrder);
app.post('/api/getAllOrders',orderAPI.getAllOrders);

module.exports = app;

app.listen(4000,function(){
 console.log("Welcome to DeliverIt..")
})


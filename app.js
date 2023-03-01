var http = require("http")
var express = require("express")
var mongoose = require("mongoose")
var mongoConfig = require("./config/mongoConfig.json")
var userRoutes = require("./users/controller")
var path = require('path');
const Msg = require('./users/chatModel')
const authRoute = require('./users/authController')

var app = express()
app.use(express.json())
app.use("/users",userRoutes)

app.use('/api', authRoute)

mongoose.connect(mongoConfig.uri,{ 
    useNewUrlParser: true ,
    useUnifiedTopology: true
    }).then(()=>{
        console.log("DB connected");
    }).catch(err=>{
        console.log(err);
    })


var server=http.createServer(app)


var io= require("socket.io")(server);


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');


io.on('connection', function(socket) {
    console.log ('User Connected');
    socket.emit("msg","a new user is connected")
    socket.on("msg",(data)=>{
       io.emit("msg",data)
    })
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('msg', msg => {
        const message = new Msg({ 
            dateSent:new Date(),
            message:msg });
        message.save().then(() => {
            io.emit('message', msg)
        })
    })
    socket.on('typing', data => {
        socket.broadcast.emit('typing', data);
      });
});

server.listen(3000,()=>{
    console.log("server started   ");
})

var express = require('express');
const fs = require('fs');
const hbs = require('hbs');
const bodyParser = require('body-parser');
var player = require('play-sound')(opts = {})
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);


app.use(express.static(__dirname + "/public"));
hbs.registerPartials(__dirname + "/views/partials");
app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({extended: false }));
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

app.get('/', (req, res)=>{
    res.status(200).render('index.hbs',{});
});

app.get('/upstairs', (req, res)=>{
    res.status(200).render('upstairs.hbs',{});
});

app.post('/ring', (req, res)=>{
    console.log(`Ring - Ring
    ${req.body.studentName} is at the Door!`);
    player.play('./sounds/doorbell.mp3', (err)=>{
        if(err) throw err;
    })
    io.emit('arrival',{studentName: req.body.studentName});

    res.status(200).send({
        ringReceived: true
    });
});

io.on('connection', function(socket){
    console.log('a user connected');
  });

app.get('/callUp', (req, res)=>{

});

http.listen(port, ()=>{
    console.log(`App started on ${port}`);
})
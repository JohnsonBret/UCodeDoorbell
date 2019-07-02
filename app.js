var express = require('express');
const fs = require('fs');
const hbs = require('hbs');
const bodyParser = require('body-parser');
var player = require('play-sound')(opts = {})
var app = express();


app.use(express.static(__dirname + "/public"));
hbs.registerPartials(__dirname + "/views/partials");
app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({extended: false }));
app.use(bodyParser.json());

const port = 3000;

app.get('/', (req, res)=>{
    res.status(200).render('index.hbs',{});
});

app.get('/ring', (req, res)=>{
    console.log("Ring - Ring");
    player.play('./sounds/doorbell.mp3', (err)=>{
        if(err) throw err;
    })

    res.status(200).send({
        ringReceived: true
    });
});

app.get('/callUp', (req, res)=>{

});

app.listen(port, ()=>{
    console.log(`App started on ${port}`);
})
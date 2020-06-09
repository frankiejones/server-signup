const hbs = require('express-handlebars');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/userModel'); //models are the same as classes, so we start with a capital letter
const signup = require('./views/signup.hbs');
const app = express();

mongoose.connect(`${process.env.DatabaseURL}`, {useNewUrlParser: true,useUnifiedTopology: true,}); 
// my database url is from mongo db going to connect and then selecting clusters, connect, connect your application, copy paste as your url in the above line.

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.engine('.hbs', hbs({
    defaultLayout: 'layout',
    extname: 'hbs'
}));

app.set('view engine', '.hbs');

app.get('/', (req, res) => { // localhost:3000/ home page
    res.render('index');
});

app.get('/signup', (req,res) => {
    res.render('signup')
});

app.post('/signup', async (req, res) => {
    let user = new User ({
        userName: req.body.userName,
        firstName: req.body.firstName,
        lastName:req.body.lastName,
        email: req.body.email,
        password:req.body.password
    });
     await user.save(); // user.save saves the user that we have created above and saves it to our database, we are using asyne and await otherwise it takes too long
    res.redirect(`/profile?userName=${req.body.userName}`);
});

app.get('/login', (req,res) => {
    res.render('profile')
});

app.post('/login', (req,res) => {
    console.log(req.body.email)
    console.log(req.body.password)
    res.redirect('/profile')
});

app.get('/profile', async (req,res) => {
    let user = await User.findOne({userName:req.query.userName})
    // let user = User.find({userName: req.query.userName})
    console.log(user)
    res.render('profile',{user: user.toObject()});
});


app.listen(5000,() => { // localhost:5000 but can be any port between 3000-8000 i think
    console.log("listening on port 5000"); 
})
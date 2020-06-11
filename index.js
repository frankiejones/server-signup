const hbs = require('express-handlebars');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const mongoose = require('mongoose');
const app = express();
const userRouter = require('./routes/user');

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

app.use('/', userRouter); // using our user.js so any requests following / us the userRouter user.js file.

app.listen(5000,() => { // localhost:5000 but can be any port between 3000-8000 i think
    console.log("listening on port 5000"); 
});
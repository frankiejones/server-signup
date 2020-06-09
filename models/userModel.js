// const mongoose = require('mongoose'); if using this then it would be mongoose.model etc
const {Schema, model} = require('mongoose'); // pulling out the parts we want to use on mongoose programme

const User = new Schema({
    userName: { type:String, required: true},
    firstName: { type:String, required: true},
    lastName: { type:String, required: true},
    email: { type:String, required: true},
    password: { type:String, required: true}
},  {
    toObject: { // adding another object to our User object
        virtuals: true //we want to be able to use toObject method thru Schema, its already an object method within Schema.
    }
});

module.exports = model('testusers', User); //exporting my mongose model into index.js
// testusers is name of the table that you are creating in your mongodb and should be in your url link.
// User is your class you are exporting.



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

user.statics.validateUser = async function(body) { // we are using the function keyword the value of 'this' is still inside the function of the user schema above
    let user = await this.findOne({userName: body.userName}); // this is refering to the User
    if (!user) {
		return false;
	}
	if (user.password != body.password) {
		return false;
	}
    return user;
    // console.log(this); // this relates to the user Schema. that's why we need to use the function keyword syntax.
};


module.exports = model('testusers', User); //exporting my mongose model into index.js
// testusers is name of the table that you are creating in your mongodb and should be in your url link.
// User is your class you are exporting.



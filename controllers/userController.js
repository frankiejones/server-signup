const User = require('../models/userModel'); //models are the same as classes, so we start with a capital letter

exports.getIndex =  (req, res) => { // localhost:3000/ home page
    res.render('index');
};
exports.getSignUp = (req,res) => { // we are adding this function into this exports object
    res.render('signup')
};
exports.postSignUp = async (req, res) => {

    if (!req.body.userName || !req.body.email || !req.body.password) {
        //get user info from form, has all fields been filled out? 
		res.render('signup', {err: "Please provide all credentials"});
		return; // this stops the execution of any of the code below if any of the if statement is not met.
    };
    let user = new User ({
        userName: req.body.userName,
        firstName: req.body.firstName,
        lastName:req.body.lastName,
        email: req.body.email,
        password:req.body.password
    });
    //await user.save(); // user.save saves the user that we have created above and saves it to our database,
    // we are using async and await otherwise it takes too long
    let isDuplicate = false;
    await user.save().catch((reason) => { // anything that returns a promise you can use .catch on
        // reason is going to tell you where the error is if you get one. its the same as error.
		res.render('signup', {err: "A user with this user name or password already exists"});
		isDuplicate = true; // if this catch statement runs then we know that the duplicate is true so we write it here.
		return; // stops running the code below
	});
	if (isDuplicate) { // if the duplicate is true then we stop running the code below.
		return; // stops running the code below
	};
    res.redirect(`/profile/?userName=${req.body.userName}`)
};

exports.getLogIn = (req,res) => {
    res.render('login')
};

exports.postLogin =  async (req,res) => {
    // need to post a userName and password.
    // need to check if they were retrieved
    //search the DB for the userName
    //with result from DB, check if the passwords match.
    //if match, go to profile, else they can go back to login page.
    if (!req.body.userName || !req.body.password) {
        //get user info from form, has all fields been filled out? 
		res.render('login', {err: "Please provide all credentials"});
		return; // this stops the execution of any of the code below if any of the if statement is not met.
    };

    let user = await user.validateUser(req,body); // false, user document
    if (user) { //user is returned
		console.log(user);
		// success, render profile page
		res.render('profile', {user: user.toObject()});
		return; // if the user doesn't exist it wont run the code below
	}
    if (user.password == req.body.password) { // if database password matched the input password.
		res.render('profile', {user: user.toObject()}); // take us to the profile page 
		return;
	};
	res.render('login', {err: "The password entered is incorrect, please try again"});
};

exports.getProfile =  async (req,res) => {
    let user = await User.findOne({userName:req.query.userName}) //getting our document back from our database.
    // let user = User.find({userName: req.query.userName})
    if (user == null) {
        res.render ('profile', {err:"that user doesn't exist"})
        return; // if th euser doenst exist it wont run the code below
    };
    console.log(user) // so we can see what is in the user document - its an object.
    res.render('profile',{user: user.toObject()}); //toObject is pulling the username from the object we created
};


  
//useful lines of code

//let user = await User.findOne({userName:req.query.userName}) //getting our document back from our database.
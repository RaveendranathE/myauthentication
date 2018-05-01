var Loginpofile       = require('../app/models/user');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

module.exports = function(app, sessions) {
    var Loginpofile       = require('../app/models/user');
    var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

    
    // normal routes ===============================================================
    
        // show the home page (will also have our login links)
        app.get('/', function(req, res) {
            res.render('index.ejs');
        });
    
        // PROFILE SECTION =========================
        app.get('/profile', isLoggedIn, function(req, res) {
            res.render('profile.ejs', {
                user : req.user
            });
        });
    
        // LOGOUT ==============================
        app.get('/logout', function(req, res) {
            req.logout();
            res.redirect('/');
        });
/////////////////////////////////////////////////////////////////////////
        // to edit a task in database
app.get("/user/edit/:id", function(req,res){
    // write edit code here
    //res.render("editTask");
    let id = req.params.id;
    Loginpofile.findOne({_id:id}, function(err, result){
        res.render('editprofile.ejs', {user:result});
    });
});

// to edit a task in database
app.post("/user/save/:id", function(req,res){
    // write edit code here
    console.log( req.body.fname);
    console.log(req.params.id);
    console.log(req.body.id);
    let task = {
        "fname": req.body.fname,
        "lname": req.body.lname,
        "email": req.body.email,
        "address": req.body.address
    };

    Loginpofile.update({_id: req.params.id}, task, function(err, result){
        if(!err){
            console.log(task);
            res.redirect('/profile');
        }
    });
});


///////////////////////////////////////////////////

        // =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

    // locally --------------------------------
        // LOGIN ===============================
        // show the login form
        app.get('/login', function(req, res) {
            res.render('login.ejs', { message: req.flash('loginMessage') });
        });

        // process the login form
        app.post('/login', sessions.authenticate('local-login', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

        // SIGNUP =================================
        // show the signup form
        app.get('/signup', function(req, res) {
            res.render('signup.ejs', { message: req.flash('signupMessage') });
        });

        // process the signup form
        app.post('/signup', sessions.authenticate('local-signup', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/signup', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));
        ////////////////////////////
    };

        function isLoggedIn(req, res, next) {
            if (req.isAuthenticated())
                return next();
        
            res.redirect('/');
        }
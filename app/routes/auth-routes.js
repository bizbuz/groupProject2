var authController = require('../controllers/authcontroller.js');

module.exports = function(app,passport){

app.get('/signup', authController.signup);


app.get('/signin', authController.signin);


//app.post('/signup', passport.authenticate('local-signup',  { successRedirect: '/diary', failureRedirect: '/signup'}));
app.post('/signup',
    passport.authenticate('local-signup'),
    function(req, res) {
        res.redirect('diary/:user_id='+req.params.userId);
    });



app.get('/logout',authController.logout);


app.post('/signin', 
    passport.authenticate('local-signin'), 
        function(req, res) {
            res.redirect('diary/?user_id'+req.user.userId);
        });


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/signin');
}


}


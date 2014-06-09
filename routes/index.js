var SessionHandler = require('./session')
  , ContentHandler = require('./content')
  , PlayerHandler = require('./player')
  , ErrorHandler = require('./error').errorHandler;

module.exports = exports = function(app, db) {

    var sessionHandler = new SessionHandler(db);
    var contentHandler = new ContentHandler(db);
    var playerHandler = new PlayerHandler(db);

    // Middleware to see if a user is logged in
    app.use(sessionHandler.isLoggedInMiddleware);

    // The main page of the blog
    app.get('/', contentHandler.displayMainPage);
    app.get('/about', contentHandler.displayAbout);

    // The main page of the blog, filtered by tag
    //app.get('/tag/:tag', contentHandler.displayMainPageByTag);

    // A single post, which can be commented on
    //app.get("/post/:permalink", contentHandler.displayPostByPermalink);
    //app.post('/newcomment', contentHandler.handleNewComment);
    //app.get("/post_not_found", contentHandler.displayPostNotFound);

    // Displays the form allowing a user to add a new post. Only works for logged in users
    app.get('/newpost', contentHandler.displayNewPostPage);
    app.post('/newpost', contentHandler.handleNewPost);

    // Used to process a like on a blog post
    app.post('/like', contentHandler.handleLike);

    // Login form
    app.get('/login', sessionHandler.displayLoginPage);
    app.post('/login', sessionHandler.handleLoginRequest);

    // Logout page
    app.get('/logout', sessionHandler.displayLogoutPage);

    // Welcome page
    app.get("/welcome", sessionHandler.displayWelcomePage);

    // Signup form
    app.get('/signup', sessionHandler.displaySignupPage);
    app.post('/signup', sessionHandler.handleSignup);

    //Player
    app.get('/me/:username', function(req, res, next){
    "use strict";
      var users = db.collection("users"); 
      users.findOne({"username" : req.param("username") }, function(err, user){
        return res.render('users', user);
      });
    });
    //gerardo 
    app.put('/me/:username/attack', function(req, res, next){
      var bul = 0;
      var users = db.collection("users");
      users.findAndModify({"username" : req.param("username")}, [[]], {$inc : {"bullets" : -1}}, {}, function(err, object){
	if(err){
	    console.log(err);
	}else{
	console.log(object);
      }
     });
    });
    
    app.get('/me/:username/attack', function(req, res, next){
      var users = db.collection("users");
      users.findOne({"username": req.param("username")}, function(err, user){
      if(err) return;
        return res.send(user);
      });
    });

    app.put('/me/:username/shot', function(req, res, next){
      console.log(req.body);
    });
  
    app.get('/me/:username/shot', function(req, res, next){
      var users = db.collection("users");
      users.findOne({"username": req.param("username")}, function(err, user){
      if(err) return;
        return res.send(user);
      });
    });

    app.post('/correo', function(req, res, next){
      var correo = req.body
      console.log(correo);
     ////
      return res.send("ok"); 
    });

    // Error handling middleware
    app.use(ErrorHandler);
}

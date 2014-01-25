
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var passport = require ("passport");
var FacebookStrategy = require('passport-facebook').Strategy;
var api = require('./api');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.session({ secret: 'SECRET' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


app.get('/', function(req,res){
	res.sendfile('index.html');
});

app.get('/api/questions',api.getQuestions);


app.get('/api/*',authed);

app.put('/api/question',api.ask);
app.post('/api/answer/:id',api.answer);
app.post('/api/vote/:id',api.voteQuestion);


//TEST AUTH
app.get('/nudes',authed);

app.get('/nudes',function(req,res){
	res.send('( . Y . )');
});

//AUTH CHECK

app.get('/auth/check',function(req,res){
	if(req.isAuthenticated()){
		res.json(true);
	}else {
		res.json(false);
	}
});

//REDIRECT LOGIN
app.get('/login',function(req,res){
	res.send("Plz login");
});

//Auths

passport.use(new FacebookStrategy({
    clientID: "1400104933575881",
    clientSecret: "3e0e4606b3c952eafe555bca81fe9061",
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  },api.loginUser));
  /*
  function(accessToken, refreshToken, profile, done) {
    FbUsers.findOne({fbId : profile.id}, function(err, oldUser){
        if(oldUser){
            done(null,oldUser);
        }else{
            var newUser = new FbUsers({
                fbId : profile.id ,
                email : profile.emails[0].value,
                name : profile.displayName
            }).save(function(err,newUser){
                if(err) throw err;
                done(null, newUser);
            });
        }
    });
  }
));*/

app.get("/auth/facebook", passport.authenticate("facebook",{ scope : "email"}));
app.get("/auth/facebook/callback",
	    passport.authenticate("facebook",{ failureRedirect: '/login'}),
	    function(req,res){
	        res.redirect('/');
	    }
	);


passport.serializeUser(function(user, done) {
    done(null, user.id);
});


passport.deserializeUser(function(id, done) {
    done(null,api.getUser(id));
});

function authed(req,res,next){
	if(req.isAuthenticated()){
        next();
    }else{
        res.redirect("/login");
    }
}





http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


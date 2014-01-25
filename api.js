/**
 * New node file
 */



var db = {'questions':[{'id':1, 
	'title':'Is coffee good?',
	'num_yes':17,
	'num_no':3,
	'num_up':10,
	'num_down':3,
	'value_yes':16.123,
	'value_no':12.3}],
	'users':[{'id':0,'name':'Michael Young','power':2.0}] };



exports.voteQuestion = function (req,res){
	var questionID = req.params.id;
	for(var i=0;i<db.questions.length;i++){
		if(db.questions[i]==questionID){
			db.questions[i].num_up+= req.body;
		}
	}
};

exports.loginUser = function(accessToken, refreshToken, profile, done){
	
	var found = -1;
	for(var i=0;i<db.users.length;i++){
		if(db.users[i].id == profile.id){
			found = i;
		}
	}
	if(found>=0){
		done(null,db.users[found]);
	}else {
		var user= {};
		obj.id = profile.id;
	    obj.name  = profile.displayName;
	    obj.power = 0.1;
	    db.users.push(user);
	    done(null,user);
	}
	
};

exports.getUser = function (id){
	for(var i=0;i<db.users.length;i++){
		if(db.users[i].id == profile.id){
			return db.users[i];
		}
	}
	return null;
};

exports.answerQuestion = function (req,res){
	console.log('ANSWER:');
	var questionID = req.params.id;
	for(var i=0;i<db.questions.length;i++){
		if(db.questions[i]==questionID){
			db.questions[i].num_up+= req.user.power*(req.body);
		}
	}
	
};


exports.getQuestions = function (req,res){
	console.log("GET: ");
	
	db.getQuestions(req.body,function(err){
		res.json('questions');
	});
};

exports.putQuestion = function (req,res){
	console.log("ADD: ");
	
	db.questions.push(req.body);
};


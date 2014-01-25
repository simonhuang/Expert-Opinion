/**
 * New node file
 */



var db = {'questions':[{'id':1, 
	'asker':'Simon huanger',
	'title':'Is coffee good for you?',
	'num_yes':17,
	'num_no':3,
	'num_up':10,
	'num_down':3,
	'value_yes':16.123,
	'value_no':12.3,
	'category':'Health'}],
	'users':[{'id':0,'name':'Michael Young','power':2.0}] };



exports.voteQuestion = function (req,res){
	var questionID = req.params.id;
	console.log("VOTE: "+req.body.dir+" "+req.user.power);
	for(var i=0;i<db.questions.length;i++){
		if(db.questions[i]==questionID){
			db.questions[i].num_up+= req.body.dir*req.user.power ;
		}
	}
	
};


exports.ask = function(req,res){
	var q = res.body;
	console.log("ASK"+q);
	q.id = db.question.length;
	q.num_yes = 0;
	q.num_no = 0;
	q.value_yes = 0;
	q.value_no = 0;
	q.asker = req.user.name;
	db.question.push(q);
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
		user.id = profile.id;
	    user.name  = profile.displayName;
	    user.power = 0.1;
	    db.users.push(user);
	    done(null,user);
	}
	
};

exports.getUser = function (id){
	for(var i=0;i<db.users.length;i++){
		if(db.users[i].id == id){
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
	
	res.json(db.questions);
};

exports.putQuestion = function (req,res){
	console.log("ADD: ");
	
	db.questions.push(req.body);
};


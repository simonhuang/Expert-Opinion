/**
 * New node file
 */



var db = {'questions':[{'id':0, 
	'asker':'Simon huanger',
	'title':'Is coffee good for you?',
	'num_yes':17,
	'num_no':3,
	'num_up':20,
	'num_down':2,
	'value_yes':16.123,
	'value_no':12.3,
	'category':'Health',
	'time':new Date().getTime(),
	'tags':['coffee','diet']},
	{'id':1, 
	'asker':'Tom troll',
	'title':'Could a woodchuck chuck wood?',
	'num_yes':100,
	'num_no':3,
	'num_up':10,
	'num_down':6,
	'value_yes':10,
	'value_no':12.3,
	'category':'Science',
	'time':new Date().getTime(),
	'tags':['animals']},
	{'id':2, 
	'asker':'Peter Gok',
	'title':'Am I pretty?',
	'num_yes':100,
	'num_no':3,
	'num_up':1,
	'num_down':5,
	'value_yes':1,
	'value_no':1000,
	'category':'Science',
	'time':new Date().getTime(),
	'tags':['fashion']},
	{'id':3, 
	'asker':'Stephen Hawkings',
	'title':'Do black holes exist?',
	'num_yes':100,
	'num_no':3,
	'num_up':10,
	'num_down':1,
	'value_yes':5.12,
	'value_no':32.43,
	'category':'Science',
	'time':new Date().getTime(),
	'tags':['astrology']}],
	'users':[{'id':0,'name':'Michael Young','power':2.0}] };



exports.vote = function (req,res){
	var questionID = req.params.id;
	console.log("VOTE: "+req.params.id+" "+req.user.power);
	for(var i=0;i<db.questions.length;i++){
		if(db.questions[i].id==questionID){
			db.questions[i].num_up+= req.body.dir ;
		}
	}
	res.json('success');
	
};


exports.ask = function(req,res){
	var q = req.body;
	console.log("ASK"+q);
	q.id = db.questions.length+1;
	q.num_yes = 0;
	q.num_no = 0;
	q.value_yes = 0;
	q.value_no = 0;
	q.num_up = 0;
	q.num_down = 0;
	q.asker = req.user.name;
	q.time = new Date().getTime();
	db.questions.push(q);
	res.json('success');
};

function calculatePower(profile){
	
	var base = 0.1;
	if(profile.education)base+=profile.education.length*0.4;
	if(profile.work)base+=profile.work.length*0.3;
	if(profile.books){
		var str = profile.books.toString();
		console.log("BOOKS: "+str.length);
		base+=str.length/8.0*0.15;
		/*
		var count = 0;
		for(var i=0;i<str.length;i++){
			if(str.charAt(i)==',')base+=count*0.15;
		}*/
		
	}
	return base;
	
}

function tagScore(user,question){
	var score = 0;
	
	for(var t=0;t<question.tags.length;t++){
		var tag = question.tags[i];
		if(user.work){
			for(var i=0;i<user.work.length;i++){
				if(user.work[i].position&&
						user.work[i].position.name&&
						user.work[i].position.name.match(tag,'g')){
					score+=5;
				}
				if(user.work[i].employer&&
						user.work[i].employer.name&&
						user.work[i].employer.name.match(tag,'g')){
					score+=5;
				}
			}
		}
		if(user.education){
			for(var i=0;i<user.education.length;i++){
				var school = user.education[i];
				if(school.school.name.match(tag,'g')){
					score+=5;
				}
				if(school.concentration){
					for(var c=0;c<school.concentration.length;c++){
						if(school.concentration[c].name&&
								school.concentration[c].name.match(tag,'g')){
							score+=5;
						}
					}
				}
			}
		}
		
	}
	return score;
}

exports.loginUser = function(accessToken, refreshToken, profile, done){
	
	console.log("LOGIN: "+profile);
	
	var found = -1;
	for(var i=0;i<db.users.length;i++){
		if(db.users[i].id == profile.id){
			
			found = i;
		}
	}
	if(found>=0){
		console.log("FOUND: "+profile.id);
		done(null,db.users[found]);
	}else {
		var user= {};
		user.id = profile.id;
	    user.name  = profile.displayName;
	    user.power = calculatePower(profile);
	    user.work = profile.work;
	    user.education = profile.education;
	    //user.accessToken = accessToken;
	    db.users.push(user);
	    console.log("POWER: "+user.power);
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

exports.answer = function (req,res){
	console.log('ANSWER:');
	var questionID = req.params.id;
	for(var i=0;i<db.questions.length;i++){
		if(db.questions[i].id==questionID){
			var score = tagScore(req.user,db.questions[i]);
			if(req.body.ans==1){
				db.questions[i].value_yes+=req.user.power+score;
			}
			else {
				db.questions[i].value_no += req.user.power+score;
			}
		}
	}
	res.json('success');
};



exports.getQuestions = function (req,res){
	console.log("GET: ");
	
	
	
	res.json(db.questions);
};



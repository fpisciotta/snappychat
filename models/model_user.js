
var userModel = require('./user');

var User = userModel.User;
var Timeline = userModel.Timeline;
exports.createUser = function (req,callback){
	var user = new User(req.body);
    user.save(function(err) {
            callback(err);
    });
}

exports.updateUser = function (query, conditions,callback){
	//console.log("User body: "+JSON.stringify(conditions));
	User.findOne(query,function(err,user){
		
		if(err)
			return callback(err,null);
		
		if(user == null)
			return callback(new Error("User not found"),null );
		
		for (var key in conditions){
			
			if(key == 'email'){
				return callback(new Error('Email property cannot be modified'), null)
			}
			//console.log("Conditions: "+JSON.stringify(conditions));
			//console.log("key: "+key);
			//console.log("User: "+JSON.stringify(user));
			//console.log("User key: "+user[key]);
			if(user[key] != null){
				console.log("User key exist");
				user[key] = conditions[key];
			}else{
				console.log("User key does not exist");
				user[key] = conditions[key];
			}
		}
		
		
		user.save(callback)
	
	});
}

exports.removeUser = function (req,callback){
	User.remove({
            email : req.params.user_id
        }, function(err) {
            callback(err);
    });
}

exports.getUserProfile = function (req, callback){
		//console.log("User id: ",req.params.user_id);
		User.find({'email': req.params.user_id}).exec(function(err, user) {
            callback(err,user);
        });
}

exports.getUserProfileAndFriends = function (req, callback){
	//console.log("User id: ",req.params.user_id);
	User.find({'email': req.params.user_id}).select('-friends_pending -friends_requested -timeline -image')
	.populate('friends', '-friends_requested -friends_pending -friends -timeline').exec(function(err, user) {
		callback(err,user);
	});
	
}

exports.getUserProfileAndFriendsRequest = function (req, callback){
	//console.log("User id: ",req.params.user_id);
	User.find({'email': req.params.user_id}).select('-friends_pending -friends -timeline -image')
	.exec(function(err, user) {
		callback(err,user);
	});
	
}

exports.getUserProfileAndFriendsPending = function (req, callback){
	//console.log("User id: ",req.params.user_id);
	User.find({'email': req.params.user_id}).select('-friends_requested -friends -timeline -image')
	.populate('friends_pending.user_id','-friends_requested -friends_pending -friends -timeline').exec(function(err, user) {
		callback(err,user);
	});
	
}

exports.getUserProfileAndTimeline = function (req, callback){
	console.log("User id: ",req.params.user_id);
	User.find({'email': req.params.user_id}).select('-friends_requested -friends_pending -friends -image')
	.populate({path: 'timeline',options: { sort: { 'creationDate': -1 } }} )
	//.populate({path: 'timeline.images', select : '_id data'} )
	.exec(function(err, user) {
		callback(err,user);
	});
}


exports.getUsers = function (query,callback){
	if(JSON.stringify(query) != '{}'){
		console.log("Query found");
		User.find({visibility : {$in : ['public','friends-only']}, email : {$ne : query.email}}).or([{nick_name : new RegExp(query.search, 'i')}, {interests : new RegExp(query.search, 'i')}]).exec(function(err, users) {
			callback(err,users)
		});
	}else{
		User.find({visibility : {$in : ['public','friends-only']}},function(err, users) {
				callback(err,users)
		});
	}
	
}

exports.addFriend = function (query, query_friend,callback){
		
		if(query_friend.accept == true){
			User.findOne({email:query_friend.email}, function(err, user){
				if(err)
					return callback(err,null);
				
				if (user == undefined || user == null)
					return callback(new Error("User not found"),null );
			
				User.findOneAndUpdate(query,{
					$push: {"friends": user},
					$pull: {"friends_pending": {user_id : user._id}}},function(err,user_friend){
					
					if(err)
						return callback(err,null);
					
					if (user_friend == undefined || user_friend == null)
						return callback(new Error({message: "User not found"}),null );
					
					user.update({
						$push: {"friends": user_friend},
						$pull: {"friends_requested": {user_id : user_friend.email}}
					}).exec(function(err,user){
						callback(err,user);
					});
				});
			});
		}else{
			
			User.findOneAndUpdate(query,{$pull: {"friends_pending": query_friend}},function(err,user){
				if(err)
					return callback(err,null);
			
				if (user == undefined || user == null)
					return callback(new Error("User not found"),null );
				
				User.update({email:query_friend.email},{$pull: {"friends_requested": {user_id : query.email}}},function(err,user){
					callback(err,user);
				});
			
			});
			
			
		}
			
}

exports.removeFriend = function (query,query_friend, callback){
	User.findOne(query_friend, function(err, user_friend){
				
		if(err)
			return callback(err,null);
		
		if (user_friend == undefined || user_friend == null)
			return callback(new Error("User not found"),null );
		
		User.findOneAndUpdate(query,{$pull :{ friends : user_friend._id}},function(err,user){
			
			if(err)
				return callback(err,null);
		
			if (user == undefined || user == null)
				return callback(new Error("User not found"),null );
			
			user_friend.update({$pull :{ friends : user._id}},function(err,user){
				callback(err,user);
			});
		});
	
	});
	
	
}

exports.addFriendRequest = function (query, query_friend,callback){
	
		var new_friend_requested = { user_id : query_friend.email,
							message : query_friend.message
						  };
		
		
		User.findOne({email:query_friend.email}, function(err, user_friend){
				
			if(err)
				return callback(err,null);
						  
			//User requesting friendship
			User.findOneAndUpdate(query,{$push: {"friends_requested": new_friend_requested}},function(err,user){
				
				if(err)
					return callback(err,null);
				
				if (user == undefined || user == null)
					return callback(new Error("User not found"),null );
				
				if(user_friend == undefined || user_friend == null)
					return callback(null,"Friend not found");
				
				var friend_requesting =  { user_id : user,
							message : query_friend.message
						  };
				
				user_friend.update({$push: {"friends_pending": friend_requesting}},function(err,user){
					callback(err,user);
				});
			});
		
		});
			
		
		//User requested for friendship, if exists
		
	
	
}

exports.removeFriendRequest = function (query,query_friend, callback){
	
	User.findOne(query_friend, function(err, user_friend){
			
		if(err)
			return callback(err,null);
		
		User.findOneAndUpdate(query,{$pull: {"friends_requested": query_friend}},function(err,user){
			//console.log("User: "+JSON.stringify(user));
			if(err)
				return callback(err,null);
			
			if (user == undefined || user == null)
				return callback(new Error("User not found"),null );
			
			if(user_friend == undefined || user_friend == null)
					return callback(null,"Friend not found");
			
			user_friend.update({$pull: {"friends_pending": {user_id : user._id}}},function(err,user){
				callback(err,user);
			});
		});
	
	});
		
}

exports.addTimeline = function (query, condition,callback){
	User.findOne(query, function(err, user){
		
		if(err)
			return callback(err,user)
		
		if (user == undefined || user == null)
			return callback(new Error("User not found"),null );
			
		
		var new_comment = {user_id : user._id,
						   comment: condition.comment,
		}
		
		if(condition.images != null){
			new_comment.images = []
			for (var x in condition.images){
				new_comment.images.push(condition.images[x]);
			}
		}
		
		
		//if(condition.images != null){
		//	new_comment.images = [];
		//	new_comment.images.push(condition.images)
		//}
		
		//console.log("Condition: "+JSON.stringify(condition.images))	
		//console.log("New comment: "+JSON.stringify(new_comment))			
		var timeline = new Timeline(new_comment);
		
		
		timeline.save(function(err) {
				if(err)
					return callback(err,null);
				//console.log("New comment: "+JSON.stringify(timeline))		
				user.timeline.push(timeline);
				user.save(callback);
		});
	});
	
}

exports.getTimeline = function (query,callback){
		
		Timeline.findOne(query).populate('user_id','-__v -friends -friends_requested -friends_pending -timeline').exec(function(err,timeline){
			callback(err,timeline);
		})
}

exports.removeTimeline = function (query,callback){
		
		//User requesting friendship
		//User.update(query,{$pull: {"timeline": query}},function(err,user){
		//	callback(err,user);
		//});
		//User requested for friendship, if exists
		Timeline.remove(query,function(err){
			callback(err,null);
		});
	
}



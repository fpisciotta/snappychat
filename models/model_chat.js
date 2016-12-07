
var userModel = require('./user');
var chatModel = require('./chat');

var User = userModel.User;
var Chat = chatModel.Chat
var ChatMessage = chatModel.ChatMessage;

var createChat = function (query, callback) {
	var chat = new Chat(query)
	chat.save(function (err) {
		callback(err, chat);
	});
}

exports.deleteChat = function (query, callback) {
	User.findOne({email:query.user_creator_id}).exec(function (err, user_creator) {
		//console.log("User sender: "+JSON.stringify(user_sender));
		if (err)
			return callback(err, null);

		if (user_creator == undefined || user_creator == null)
			return callback(new Error("User sender not found"), null);

		User.findOne({email:query.user_receiver_id}).exec(function (err, user_receiver) {
			//console.log("User receiver: "+JSON.stringify(user_receiver));
			if (err)
				return callback(err, null);

			if (user_receiver == undefined || user_receiver == null)
				return callback(new Error("User receiver not found"), null);
		
			var users = [user_creator,user_receiver];
			
			Chat.findOne({
				'user_creator_id' : users[0]._id,
				'user_receiver_id' : users[1]._id
			}).exec(function(err,chat){
				
				if (err)
					return callback(err, null);

				if (chat == undefined || chat == null)
					return callback(new Error("Chat not found"), null);
				
				ChatMessage.remove({chat_id : chat._id},function(err){
					if(err)
						callback(err,null);
					console.log("Chat: "+JSON.stringify(chat));
					chat.remove(chat,callback);
				})
			});
		
		});
	
	});
		
}

var updateChat = function (query, callback) {
	User.find({
		'email': {$in : [query.user_sender_id,query.user_receiver_id]}
	}).exec(function (err, users) {

		if (err)
			return callback(err, null);

		if (users == undefined || users == null)
			return callback(new Error("Users sender not found"), null);

		if (users.length < 2)
			return callback(new Error("Users not found"), null);

		var chat1 = {
			user_creator_id: query.user_sender_id,
			user_receiver_id: query.user_receiver_id,
			pending : true
		}

		var chat2 = {
			user_creator_id: query.user_receiver_id,
			user_receiver_id: query.user_sender_id,
			pending : true
		}
		Chat.findOneAndUpdate({
			$or: chat1,chat2
		}, function (err, chat) {
			callback(err, chat);
		});

	});

}

exports.createChatMessage = function (query, callback) {
	var users;
	User.findOne({email:query.user_sender_id}).exec(function (err, user_sender) {
		//console.log("User sender: "+JSON.stringify(user_sender));
		if (err)
			return callback(err, null);

		if (user_sender == undefined || user_sender == null)
			return callback(new Error("User sender not found"), null);

		User.findOne({email:query.user_receiver_id}).exec(function (err, user_receiver) {
			//console.log("User receiver: "+JSON.stringify(user_receiver));
			if (err)
				return callback(err, null);

			if (user_receiver == undefined || user_receiver == null)
				return callback(new Error("User receiver not found"), null);
		
			users = [user_sender,user_receiver];
			
			//Search for chat conversations
			Chat.find({
				'user_creator_id' : {$in : [users[0]._id,users[1]._id]},
				'user_receiver_id' : {$in : [users[0]._id,users[1]._id]}
			}).exec(function (err, chat) {
				if (err)
					return callback(err, null);

				if (chat == undefined || chat == null || !chat.length) {
					var new_chat = {
						user_creator_id: users[0]._id,
						user_receiver_id: users[1]._id
					}
					createChat(new_chat, function (err, chat) {
						if (err)
							return callback(err, null);
						if (chat == undefined || chat == null)
							return callback(new Error("Chat not found"), null);
						console.log("Chat created");
						saveChatMessage(chat, users, query.message, callback);
					});
				} else {
					console.log("Chat found");
					saveChatMessage(chat[0], [user_sender,user_receiver], query.message, callback);
				}

			});
			
			
		});

		
	});
}

var saveChatMessage = function (chat, users, message, callback) {

	var new_chat_message = {
		chat_id: chat._id,
		user_sender_id: users[0]._id,
		user_receiver_id: users[1]._id,
		message: message
	}
	console.log("New Chat message "+JSON.stringify(new_chat_message));
	var chatMessage = new ChatMessage(new_chat_message);
	//Store Chat_message
	chatMessage.save(function (err) {
		if (err)
			return callback(err, null);
		console.log("Chat  "+JSON.stringify(chat));
		console.log("Chat message "+JSON.stringify(chatMessage));
		//chat[0].chat_messages.push(chatMessage);
		//chat[0].save(callback);
		if(chat.length)
			Chat.update(chat[0],{$push: {"chat_messages": chatMessage._id}},callback)
		else
			Chat.update(chat,{$push: {"chat_messages": chatMessage._id}},callback)
	});

}

exports.getChatHistory = function (query, callback) {
	if(JSON.stringify(query) != '{}'){
		if(query.search != null){
			console.log("Search found");
			User.findOne({email:query.search}).exec(function (err, user_sender) {
				if (err)
					return callback(err, null);

				if (user_sender == undefined || user_sender == null)
					return callback(new Error("User sender not found"), null);
				
				Chat.find().or([{user_creator_id : user_sender._id}, {user_receiver_id : user_sender._id}])
					.populate([{path:'user_creator_id', select:'name email nick_name'},
					{path:'user_receiver_id', select:'name email nick_name'},
					{path:'chat_messages', populate: [{
						path: 'user_sender_id',
						select:'email'
					},{
						path: 'user_receiver_id',
						select:'email'
					}]}])
					.exec(function (err, chat) {
						//console.log("Chat: "+JSON.stringify(chat));
						if (err)
							return callback(err, null);

						if (chat == undefined || chat == null)
							return callback(new Error("Chat conversation not found"), null);

						callback(err, chat);
					});
				
			});
		}else{
			User.findOne({email:query.user_sender_id}).exec(function (err, user_sender) {
				//console.log("User sender: "+JSON.stringify(user_sender));
				if (err)
					return callback(err, null);

				if (user_sender == undefined || user_sender == null)
					return callback(new Error("User sender not found"), null);

				User.findOne({email:query.user_receiver_id}).exec(function (err, user_receiver) {
					//console.log("User receiver: "+JSON.stringify(user_receiver));
					if (err)
						return callback(err, null);

					if (user_receiver == undefined || user_receiver == null)
						return callback(new Error("User receiver not found"), null);
				
					users = [user_sender,user_receiver];
					
					//Search for chat conversations
					Chat.find({
						'user_creator_id' : {$in : [users[0]._id,users[1]._id]},
						'user_receiver_id' : {$in : [users[0]._id,users[1]._id]}
					}).populate([{path:'user_creator_id', select:'name email nick_name'},
					{path:'user_receiver_id', select:'name email nick_name'},
					{path:'chat_messages', populate: [{
						path: 'user_sender_id',
						select:'email'
					},{
						path: 'user_receiver_id',
						select:'email'
					}]}])
					.exec(function (err, chat) {
						//console.log("Chat: "+JSON.stringify(chat));
						if (err)
							return callback(err, null);

						if (chat == undefined || chat == null)
							return callback(new Error("Chat conversation not found"), null);

						callback(err, chat);
					});
						
				});
				
			});
		}
	}else{
		//Search for chat conversations
		Chat.find().populate([{path:'user_creator_id', select:'name email nick_name'},
		{path:'user_receiver_id', select:'name email nick_name'},
		{path:'chat_messages', populate: [{
			path: 'user_sender_id',
			select:'email'
		},{
			path: 'user_receiver_id',
			select:'email'
		}]}])
		.exec(function (err, chat) {
			//console.log("Chat: "+JSON.stringify(chat));
			if (err)
				return callback(err, null);

			if (chat == undefined || chat == null)
				return callback(new Error("Chat conversation not found"), null);

			callback(err, chat);
		});

	}
		

}

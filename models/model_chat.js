
var userModel = require('./user');
var chatModel = require('./chat');

var User = userModel.User;
var Chat = chatModel.Chat
var ChatMessage = chatModel.ChatMessage;

var createChat = function (query, callback) {

	var new_chat = {
		user_creator_id: query.user_sender_id,
		user_receiver_id: query.user_receiver_id
	}
	var chat = new Chat(new_chat)
	chat.save(function (err) {
		console.log("Chat "+JSON.stringify(chat));
		callback(err, chat);
	});
}

var updateChat = function (query, callback) {
	User.find({
		$and: [{email:query.user_sender_id},{email:query.user_receiver_id}]
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
	User.find({
		'email': {$in : [query.user_sender_id,query.user_receiver_id]}
	}).exec(function (err, users) {
		console.log("Users: "+JSON.stringify(users));
		if (err)
			return callback(err, null);

		if (users == undefined || users == null)
			return callback(new Error("Users sender not found"), null);

		if (users.length < 2)
			return callback(new Error("Users not found"), null);

		var chat1 = {
			user_creator_id: users[0]._id,
			user_receiver_id: users[1]._id
		}

		var chat2 = {
			user_creator_id: users[1]._id,
			user_receiver_id: users[0]._id
		}
		//Search for chat conversations
		Chat.find({
			'user_creator_id' : {$in : [users[0]._id,users[1]._id]},
			'user_receiver_id' : {$in : [users[0]._id,users[1]._id]},
		}).exec(function (err, chat) {
			if (err)
				return callback(err, null);

			if (chat == undefined || chat == null || !chat.length) {
				//Create chat conversation if it doesn't exist
				createChat({
					user_sender_id: users[0]._id,
					user_receiver_id: users[1]._id
				}, function (err, chat) {
					if (err)
						return callback(err, null);
					if (chat == undefined || chat == null)
						return callback(new Error("Chat not found"), null);
					
					saveChatMessage(chat, users, query.message, callback);
				});
			} else {
				saveChatMessage(chat, users, query.message, callback);
			}

		});
	});
}

var saveChatMessage = function (chat, users, message, callback) {

	var new_chat_message = {
		chat_id: chat._id,
		user_sender_id: users[0]._id,
		user_receiver_id: users[1]._id,
		message: message,
	}
	var chatMessage = new ChatMessage(new_chat_message);
	//Store Chat_message
	chatMessage.save(function (err) {
		if (err)
			return callback(err, null);
		console.log("Chat  "+JSON.stringify(chat));
		console.log("Chat message "+JSON.stringify(chatMessage));
		chat.chat_messages.push(chatMessage);
		chat.save(callback);
		//Chat.update(chat,{$push: {"chat_message": chatMessage._id}},callback)

	});

}

exports.getChatHistory = function (query, callback) {
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
			user_creator_id: users[0]._id,
			user_receiver_id: users[1]._id
		}

		var chat2 = {
			user_creator_id: users[1]._id,
			user_receiver_id: users[0]._id
		}
		//Search for chat conversations
		Chat.find({
			'user_creator_id' : {$in : [users[0]._id,users[1]._id]},
			'user_receiver_id' : {$in : [users[0]._id,users[1]._id]},
		}).populate('chat_messages').exec(function (err, chat) {
			if (err)
				return callback(err, null);

			if (chat == undefined || chat == null)
				return callback(new Error("Chat conversation not found"), null);

			callback(err, chat);
		});
	});

}

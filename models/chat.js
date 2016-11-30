
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var chatConversationSchema = new mongoose.Schema({
	user_creator_id: {type: mongoose.Schema.Types.ObjectId, ref : 'User'},
	user_receiver_id: {type: mongoose.Schema.Types.ObjectId, ref : 'User'},
	pending : { type: Boolean, default : false},
	chat_messages:[{ type: mongoose.Schema.Types.ObjectId, ref: 'ChatMessage'}]
});

var chatMessageSchema = new mongoose.Schema({
	chat_id : {type: mongoose.Schema.Types.ObjectId, ref : 'Chat'},
	user_sender_id: {type: mongoose.Schema.Types.ObjectId, ref : 'User'},
	user_receiver_id: {type: mongoose.Schema.Types.ObjectId, ref : 'User'},
	message: {type : String, required : true},
	creationDate: {type: Date, default: Date.now}
});

exports.ChatMessage = mongoose.model('ChatMessage', chatMessageSchema);
exports.Chat = mongoose.model('Chat', chatConversationSchema);


var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var userSchema = new mongoose.Schema({
  name: {
    first: { type: String,required : true},
    last: { type: String, trim: true }
  },
  status : { type: Boolean, default : false},
  nick_name: { type: String, required : true},
  email: { type: String, required : true},
  password : {type : String, required : true, select : false},
  image : {
	  name : { type: String},
	  data : {type : Buffer}
  },
  location: { type: String},
  profession: { type: String},
  about_me: { type: String},
  interests: { type: String},
  age: { type: Number, min: 10, required : true},
  visibility : { type: String, default : 'friends-only'},
  notification : { type: Boolean, default : true},
  creation_date : {type: Date, default: Date.now},
  update_date: {type: Date, default: Date.now},
  friends : [{ type: Schema.Types.ObjectId, ref: 'User' }],
  timeline : [{ type: Schema.Types.ObjectId, ref: 'Timeline' }],
  friends_pending: [{
	user_id : { type: Schema.Types.ObjectId, ref: 'User' },
	message : {type : String},
	creationDate: {type: Date, default: Date.now}}],
  friends_requested : [{
	user_id : { type: Schema.Types.ObjectId, ref: 'User' },
	message : {type : String},
	creationDate: {type: Date, default: Date.now}}],
}, { autoIndex: true });

var timelineSchema = new mongoose.Schema({
	user_id : {type: mongoose.Schema.Types.ObjectId, ref : 'User'},
	comment : {type : String},
	creationDate: {type: Date, default: Date.now}
})



exports.Timeline = mongoose.model('Timeline', timelineSchema);
exports.User = mongoose.model('User', userSchema);

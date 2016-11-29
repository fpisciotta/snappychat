// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var model = require ('./model.js');
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

router.route('/users')

    // create a bear (accessed at POST http://localhost:5000/api/users)
    .post(function(req, res) {
		model.createUser(req, function (err){
			if(err)
				res.status(500).send(err);
			else
				res.status(201).json({ message: 'User created!' });
		});
        
        
    })
	
	.get(function(req, res) {
		console.log("Get all users");
		model.getUsers(function(err,users){
			if (err)
                res.status(500).send(err);
			else if(users == undefined || users == null )
					res.status(404).json({ message: 'User not found' })
            else
				res.status(200).json(users);
		});
    });

router.route('/users/:user_id')

    // get the bear with that id (accessed at GET http://localhost:5000/api/users/:user_id)
    .get(function(req, res) {
		model.getUserProfile(req,function(err,user){
			if (err)
                res.status(500).send(err);
			else if(user == undefined || user == null  )
					res.status(404).json({ message: 'User not found' })
			else
				res.status(200).json(user);
		});
    })
	
	.put(function(req, res) {
			model.updateUser({email:req.params.user_id},req.body,null,function(err,user){
				//console.log("User: "+JSON.stringify(user));
				if (err)
					res.status(500).send(err);
				else if(user == undefined || user == null ){
					res.status(400).json({ message: 'User not found' })
				}else
					res.status(204).send();
			});
    })
	
	.delete(function(req, res) {
		model.removeUser(req,function(err){
			if (err)
                res.status(500).send(err);
			else
				res.status(200).json({ message: 'User deleted' });
		});
    });
	
router.route('/users/:user_id/timeline')
	.post(function(req, res) {
			model.addTimeline({email:req.params.user_id},req.body,function(err,user){
				if (err)
					res.status(500).send(err);
				else
					res.status(201).json({ message: 'Timeline added!' });
			});
    })
	.get(function(req, res) {
		model.getUserProfileAndTimeline(req,function(err,user){
			if (err)
                res.status(500).send(err);
			else
				res.status(200).json(user);
		});
    })

router.route('/users/:user_id/timeline/:timeline_id')	
	.get(function(req, res) {
		model.getTimeline({_id:req.params.timeline_id},function(err,user){
			if (err)
                res.status(500).send(err);
			else if(user == undefined || user == null  )
					res.status(404).json({ message: 'Timeline not found' })
			else
				res.status(200).json(user);
		});
    })
	.delete(function(req, res) {
			model.removeTimeline({_id:req.params.timeline_id},function(err,user){
				if (err)
					res.status(500).send(err);
				else
					res.status(201).json({ message: 'Timeline deleted!' });
			});
    })

router.route('/users/:user_id/friends')
	.get(function(req, res) {
		model.getUserProfileAndFriends(req,function(err,user){
			if (err)
				res.status(500).send(err);
			else
				res.status(200).json(user);
		});
	})
	.delete(function(req, res) {
			model.removeFriend({email:req.params.user_id},req.body,function(err,user){
				if (err)
					res.status(500).send(err);
				else
					res.status(201).json({ message: 'Friend deleted!' });
			});
    })
	
router.route('/users/:user_id/friends_request')
	.post(function(req, res) {
			model.addFriendRequest({email:req.params.user_id},req.body,function(err,user){
				if (err)
					res.status(500).send(err);
				else
					res.status(201).json({ message: 'Friend request added!' });
			});
    })
	.get(function(req, res) {
		model.getUserProfileAndFriendsRequest(req,function(err,user){
			if (err)
                res.status(500).send(err);
			else
				res.status(200).json(user);
		});
    })
	.delete(function(req, res) {
			model.removeFriendRequest({email:req.params.user_id},req.body,function(err,user){
				if (err)
					res.status(500).send(err);
				else
					res.status(201).json({ message: 'Friend request deleted!' });
			});
    })

	
router.route('/users/:user_id/friends_pending')
	.post(function(req, res) {
			model.addFriend({email:req.params.user_id},req.body,function(err,user){
				if (err)
					res.status(500).send(err);
				else
					res.status(201).json({ message: 'Friend pending modified!' });
			});
    })
	.get(function(req, res) {
		model.getUserProfileAndFriendsPending(req,function(err,user){
			if (err)
                res.status(500).send(err);
			else
				res.status(200).json(user);
		});
    })

// The http server will listen to an appropriate port, or default to
// port 5000.
var theport = process.env.PORT || 5000;

app.use('/api', router);

app.listen(theport);
console.log('Magic happens on port ' + theport);

//
// Preamble
var http = require ('http');	     // For serving a basic web page.
var mongoose = require ("mongoose"); // The reason for this demo.

// Here we find an appropriate database to connect to, defaulting to
// localhost if we don't find one.  
var uristring = 
  process.env.MONGODB_URI || 
  'mongodb://fpisciotta:pspgames@ds163377.mlab.com:63377/snappychatdb';



// Makes connection asynchronously.  Mongoose will queue up database
// operations and release them when the connection is complete.
mongoose.connect(uristring, function (err, res) {
  if (err) { 
    console.log ('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
    console.log ('Succeeded connected to: ' + uristring);
  }
});




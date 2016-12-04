# SnappyChat API

This [API](https://snappychatapi.herokuapp.com/) will serve as the back-end of SnappyChat mobile application.

## Endpoints

### User resources

#### Create user
	  
- `POST https://snappychatapi.herokuapp.com/api/users`
	####Params
	```javascript
	{
		first_name : { type: String,required : true},
		last_name : { type: String,required : true},
		status : { type: Boolean, default : false},
		nick_name: { type: String, required : true},
		email: { type: String, required : true},
		token : {type : String},
		image : {
		  name : { type: String,required : true},
		  data : {type : String,required : true} //It should be base64 encoding
		},
		location: { type: String,required : true},
		profession: { type: String,required : true},
		about_me: { type: String,required : true},
		interests: { type: String,required : true},
		age: { type: Number, min: 10},
		visibility : { type: String, default : 'friends-only'},
		notification : { type: Boolean, default : true},
		creation_date : {type: Date, default: Date.now},
		update_date: {type: Date, default: Date.now}
	}
	```
	####Example 
	#####Request
	```javascript
	{
		"nick_name": "jhony",
		"email": "jhonyh@gmail.com",
		"password" : "safsfsffs",
		"age": 18,
		"notification": true, 
		"visibility": "friends-only",
		"status": false,
		"name": {
		  "first": "Jhon",
		  "last": "Peters"
		}
	}
	```
	
	#####Response
		
	Status: 201 CREATED |
	-------------- |
	```javascript
	{
		"message": "User created!"
	}
	  ```

#### Get users
	
- `GET https://snappychatapi.herokuapp.com/api/users`
	
	#####Response
		
	Status: 200 OK |
	-------------- |
	```javascript
	[
	  {
		"_id": "583a7db452dbee2c104b5ac2",
		"nick_name": "grinchss",
		"email": "grinch@gmail.com",
		"age": 10,
		"__v": 4,
		"friends_requested": [],
		"friends_pending": [],
		"timeline": [
		  "583be1ad7ec7395204265e4a",
		  "583d285591d80a1058ef5dfa",
		  "583d289c91d80a1058ef5dfb",
		  "583d2905612d394608576c58"
		],
		"friends": [
		  "583bb3c3e2bf36179cf78e17"
		],
		"update_date": "2016-11-27T06:31:16.589Z",
		"creation_date": "2016-11-27T06:31:16.589Z",
		"notification": true,
		"visibility": "friends-only",
		"status": false,
		"name": {
		  "first": "Juan",
		  "last": "Gonzalez"
		}
	  }]
	  ```

#### Get user
	  
- `GET https://snappychatapi.herokuapp.com/api/users/:user_id`

	####Params
	
		user_id : "unique user identifier, email must be used"
		
	####Example 
	#####Response
		
	Status: 200 OK |
	-------------- |
	```javascript
	[
	  {
		"_id": "583dfb71c4747e39682bae94",
		"nick_name": "jhony",
		"email": "jhonyh@gmail.com",
		"age": 18,
		"__v": 0,
		"friends_requested": [],
		"friends_pending": [],
		"timeline": [],
		"friends": [],
		"update_date": "2016-11-29T22:04:33.023Z",
		"creation_date": "2016-11-29T22:04:33.023Z",
		"notification": true,
		"visibility": "friends-only",
		"status": false,
		"name": {
		  "first": "Jhon",
		  "last": "Peters"
		}
	  }
	]
	  ```

#### Update user
	  
- `PUT https://snappychatapi.herokuapp.com/api/users/:user_id`
	
	####Params
	
		user_id : "unique user identifier, email must be used"
		
		{
			nick_name: "jhony1",
			age: 20
		}
		
	####Example 
	#####Request
	```javascript
	{
		"nick_name": "jhony1",
		"age": 20
	}
	```
	
	#####Response
		
	Status: 204 NO CONTENT |
	-------------- |
	
#### Delete user
	  
- `DELETE https://snappychatapi.herokuapp.com/api/users/:user_id`
	
	####Params
	
		user_id : "unique user identifier, email must be used"
		
	####Example 
	#####Response
		
	Status: 200 OK |
	-------------- |
	```javascript
	{
		"message": "User deleted!"
	}
	  ```

#### Send friend request
	
- `POST https://snappychatapi.herokuapp.com/api/users/:user_id/friends_request`

	####Params
	
		user_id : "unique user identifier, email must be used"
		
		{
			email: { type: String, required : true},
			message: { type: String}
		}
		
	####Example 
	#####Request
	```javascript
	{
		"email": "jhonyh@gmail.com",
		"message": "Hello, I'd would like to be your friend"
	}
	```
	
	#####Response
		
	Status: 201 CREATED |
	-------------- |
	```javascript
	{
		"message": "Friend request added!"
	}
	  ```
#### Get user profile and friends request list
	  
- `GET https://snappychatapi.herokuapp.com/api/users/:user_id/friends_request`

	####Params
	
		user_id : "unique user identifier, email must be used"
		
	####Example 
	#####Response
		
	Status: 200 OK |
	-------------- |
	```javascript
	[
	  {
		"_id": "583a7db452dbee2c104b5ac2",
		"nick_name": "grinchss",
		"email": "grinch@gmail.com",
		"age": 10,
		"__v": 5,
		"friends_requested": [
		  {
			"message": "Hello, I'd like to be your friend",
			"user_id": {
			  "nick_name": "jhony",
			  "email": "jhonyh@gmail.com",
			  "name": {
				"first": "Jhon",
				"last": "Peters"
			  }
			},
			"_id": "583dffc8c4747e39682bae95",
			"creationDate": "2016-11-29T22:23:04.146Z"
		  }
		],
		"update_date": "2016-11-27T06:31:16.589Z",
		"creation_date": "2016-11-27T06:31:16.589Z",
		"notification": true,
		"visibility": "friends-only",
		"status": false,
		"name": {
		  "first": "Juan",
		  "last": "Gonzalez"
		}
	  }
	]
	  ```
#### Delete friend request
	  
- `DELETE https://snappychatapi.herokuapp.com/api/users/:user_id/friends_request`
	
	####Params
	
		user_id : "unique user identifier, email must be used"
		
		{
			email: { type: String, required : true}
		}

	####Example 
	#####Request
	```javascript
	{
		"email": "jhonyh@gmail.com",
	}
	```
	
	#####Response
		
	Status: 200 OK |
	-------------- |
	```javascript
	{
		"message": "Friend request deleted!"
	}
	  ```
#### Accept or reject friends pending
	
- `POST https://snappychatapi.herokuapp.com/api/users/:user_id/friends_pending`
	
	####Params
	
		user_id : "unique user identifier, email must be used"

		{
			email: { type: String, required : true},
			accept: { type: Boolean, required : true}
		}

	####Example 
	#####Request
	```javascript
	{
		"email": "grinch@gmail.com",
		"accept": true
	}
	```
	
	#####Response
		
	Status: 201 CREATED |
	-------------- |
	```javascript
	{
		"message": "Friend pending modified!"
	}
	  ```
#### Get user profile and friends pending list
	  
- `GET https://snappychatapi.herokuapp.com/api/users/:user_id/friends_pending`
	
	####Params

		user_id : "unique user identifier, email must be used"

	####Example 	
	#####Response
		
	Status: 200 OK |
	-------------- |
	```javascript
	[
	  {
		"_id": "583dfb71c4747e39682bae94",
		"nick_name": "jhony",
		"email": "jhonyh@gmail.com",
		"age": 18,
		"__v": 0,
		"friends_pending": [
		  {
			"_id": "583dffc8c4747e39682bae96",
			"message": "Hello, I'd like to be your friend",
			"user_id": {
			  "nick_name": "grinchss",
			  "email": "grinch@gmail.com",
			  "name": {
				"first": "Juan",
				"last": "Gonzalez"
			  }
			},
			"creationDate": "2016-11-29T22:23:04.247Z"
		  }
		],
		"update_date": "2016-11-29T22:04:33.023Z",
		"creation_date": "2016-11-29T22:04:33.023Z",
		"notification": true,
		"visibility": "friends-only",
		"status": false,
		"name": {
		  "first": "Jhon",
		  "last": "Peters"
		}
	  }
	]
	  ```

#### Get user profile and friends list
	  
- `GET https://snappychatapi.herokuapp.com/api/users/:user_id/friends`
	
	####Params
	
		user_id : "unique user identifier, email must be used"

	####Example 
	#####Response
		
	Status: 200 OK |
	-------------- |
	```javascript
	[
	  {
		"_id": "583a7db452dbee2c104b5ac2",
		"nick_name": "grinchss",
		"email": "grinch@gmail.com",
		"age": 10,
		"__v": 5,
		"friends_requested": [],
		"friends_pending": [],
		"friends": [
		  {
			"nick_name": "grinch",
			"email": "grinch3@gmail.com",
			"name": {
			  "first": "Juan",
			  "last": "Gonzalez"
			}
		  }
		],
		"update_date": "2016-11-27T06:31:16.589Z",
		"creation_date": "2016-11-27T06:31:16.589Z",
		"notification": true,
		"visibility": "friends-only",
		"status": false,
		"name": {
		  "first": "Juan",
		  "last": "Gonzalez"
		}
	  }
	]
	```	  
#### Delete a friend
	  
- `DELETE https://snappychatapi.herokuapp.com/api/users/:user_id/friends`
	
	####Params
	
		user_id : "unique user identifier, email must be used"
		
		{
			email: { type: String, required : true} //friend's email
		}

	####Example 
	#####Request
	```javascript
	{
		"email": "grinch3@gmail.com",
	}
	```
	
	#####Response
		
	Status: 200 OK |
	-------------- |
	```javascript
	{
		"message": "Friend deleted!"
	}
	  ```

#### Add a timeline
	  
- `POST https://snappychatapi.herokuapp.com/api/users/:user_id/timeline`
	
	####Params
	
		user_id : "unique user identifier, email must be used"
		
		{
			comment: { type: String, required : true}
		}

	####Example 
	#####Request
	```javascript
	{
		"comment" : "this is a commment"
	}
	```
	
	#####Response
		
	Status: 201 CREATED |
	-------------- |
	```javascript
	{
		"message": "Timeline added!"
	}
	  ```
#### Get user profile and timeline

	  
- `GET https://snappychatapi.herokuapp.com/api/users/:user_id/timeline`

	####Params
	
		user_id : "unique user identifier, email must be used"
		
	####Example 
	#####Response
		
	Status: 200 OK |
	-------------- |
	```javascript
	[
	  {
		"_id": "583a7db452dbee2c104b5ac2",
		"nick_name": "grinchss",
		"email": "grinch@gmail.com",
		"age": 10,
		"__v": 5,
		"timeline": [
		  {
			"_id": "583e0265c4747e39682bae97",
			"user_id": "583a7db452dbee2c104b5ac2",
			"comment": "this is a commment",
			"__v": 0,
			"creationDate": "2016-11-29T22:34:13.908Z"
		  }
		],
		"update_date": "2016-11-27T06:31:16.589Z",
		"creation_date": "2016-11-27T06:31:16.589Z",
		"notification": true,
		"visibility": "friends-only",
		"status": false,
		"name": {
		  "first": "Juan",
		  "last": "Gonzalez"
		}
	  }
	]
	```

#### Get a timeline
	
	  
- `GET https://snappychatapi.herokuapp.com/api/users/:user_id/timeline/:timeline_id`
	
	####Params
	
		timeline_id : "unique timeline identifier"

	####Example
	#####Response
		
	Status: 200 OK |
	-------------- |
	```javascript
	{
	  "_id": "583e0265c4747e39682bae97",
	  "user_id": {
		"_id": "583a7db452dbee2c104b5ac2",
		"nick_name": "grinchss",
		"email": "grinch@gmail.com",
		"age": 10,
		"update_date": "2016-11-27T06:31:16.589Z",
		"creation_date": "2016-11-27T06:31:16.589Z",
		"notification": true,
		"visibility": "friends-only",
		"status": false,
		"name": {
		  "first": "Juan",
		  "last": "Gonzalez"
		}
	  },
	  "comment": "this is a commment",
	  "__v": 0,
	  "creationDate": "2016-11-29T22:34:13.908Z"
	}
	 ```
#### Delete a timeline
	
- `DELETE https://snappychatapi.herokuapp.com/api/users/:user_id/timeline/:timeline_id`
	
	####Params
	
		timeline_id : "unique timeline identifier"

	####Example
	#####Response
		
	Status: 200 OK |
	-------------- |
	```javascript
	{
		"message": "Timeline deleted!"
	}
	  ```
	  
###Chat resources

####Create chat message
	
	It adds a chat message to the chat conversation. Also, it creates a chat conversation if it doesn't exist.
	
- `POST https://snappychatapi.herokuapp.com/api/chats`
	
	####Params
	```javascript
	{
		user_sender_id: {type: String, required : true}, //unique user identifier, must be email
		user_receiver_id: {type: String, required : true}, //unique user identifier, must be email
		message: {type : String, required : true},
	}
	```
	####Example 
	#####Request
	```javascript
	{
		"user_sender_id":"grinch3@gmail.com",
		"user_receiver_id":"grinch@gmail.com",
		"message":"Hello Peter"
	}
	```
	
	#####Response
		
	Status: 201 CREATED |
	-------------- |
	```javascript
	{
		"message": "Chat message created!"
	}
	  ```
#### Get Chat-conversation history

- `GET https://snappychatapi.herokuapp.com/api/chats`

	####Params
		
		If you don't pass params, it returns all the chat conversations.
	
		user_sender_id : "unique user identifier, email must be used"
		user_receiver_id : "unique user identifier, email must be used"
		
		
	####Example
	
	#####Request
		GET https://snappychatapi.herokuapp.com/api/chats?user_sender_id=grinch@gmail.com&user_receiver_id=grinch3@gmail.com
	#####Response
		
	Status: 200 OK |
	-------------- |
	```javascript
	[
	  {
		"_id": "583f58f52898321a08f40265",
		"user_creator_id": {
		  "_id": "583a7db452dbee2c104b5ac2",
		  "nick_name": "grinchss",
		  "email": "grinch@gmail.com",
		  "name": {
			"first": "Juan",
			"last": "Gonzalez"
		  }
		},
		"user_receiver_id": {
		  "_id": "583bb3c3e2bf36179cf78e17",
		  "nick_name": "grinch",
		  "email": "grinch3@gmail.com",
		  "name": {
			"first": "Juan",
			"last": "Gonzalez"
		  }
		},
		"__v": 1,
		"chat_messages": [
		  {
			"_id": "583f58f52898321a08f40266",
			"chat_id": "583f58f52898321a08f40265",
			"user_sender_id": {
			  "_id": "583a7db452dbee2c104b5ac2",
			  "email": "grinch@gmail.com"
			},
			"user_receiver_id": {
			  "_id": "583bb3c3e2bf36179cf78e17",
			  "email": "grinch3@gmail.com"
			},
			"message": "Hello Peter",
			"__v": 0,
			"creationDate": "2016-11-30T22:55:49.722Z"
		  }
		],
		"pending": false
	  }
	]
	 ```
	 
	
#### Delete Chat-conversation

- `DELETE https://snappychatapi.herokuapp.com/api/chats`

	```javascript
	{
		user_creator_id: {type: String, required : true}, //unique user identifier, must be email
		user_receiver_id: {type: String, required : true}, //unique user identifier, must be email
	}
	```
	####Example 
	#####Request
	```javascript
	{
		"user_creator_id":"grinch3@gmail.com",
		"user_receiver_id":"grinch@gmail.com",
	}
	```
	
	#####Response
		
	Status: 200 OK |
	-------------- |
	```javascript
	{
		"message": "Chat deleted!"
	}
	  ```
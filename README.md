# SnappyChat API

This API will serve as the back-end of SnappyChat mobile application.

## Deployment

To deploy [the app](http://hello-mongoose.herokuapp.com/) to Heroku you can use the Heroku button [![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy) or follow these steps:

1. `git clone git://github.com/mongolab/hello-mongoose.git && cd hello-mongoose`
2. `heroku create`
3. `heroku addons:add mongolab`
3. `git push heroku master`
4. `heroku open`

## Endpoints

### User resources

#### Get users
	
- `GET http://yourexample.com/api/users`
	
	####Response
		
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
	  
#### Create user
	  
- `POST http://yourexample.com/api/users`
	
	####Request
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
	
	####Response
		
	Status: 201 CREATED |
	-------------- |
	```javascript
	{
		"message": "User created!"
	}
	  ```
		
#### Get user
	  
- `GET http://yourexample.com/api/users/:user_id`
	
	####Response
		
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
	  
- `PUT http://yourexample.com/api/users/:user_id`
	
	####Request
	```javascript
	{
		"nick_name": "jhony1",
		"age": 20
	}
	```
	
	####Response
		
	Status: 204 NO CONTENT |
	
#### Delete user
	  
- `DELETE http://yourexample.com/api/users/:user_id`
	
	####Response
		
	Status: 200 OK |
	-------------- |
	```javascript
	{
		"message": "User deleted!"
	}
	  ```

#### Send friend request
	
- `POST http://yourexample.com/api/users/:user_id/friends_request`
	
	####Request
	```javascript
	{
    "email": "jhonyh@gmail.com",
    "message": "Hello, I'd would like to be your friend"
	}
	```
	
	####Response
		
	Status: 201 CREATED |
	-------------- |
	```javascript
	{
		"message": "Friend request added!"
	}
	  ```
#### Get user profile and friends request list
	  
- `GET http://yourexample.com/api/users/:user_id/friends_request`
	
	####Response
		
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
		"friends_requested": [
		  {
			"message": "Hello, I'd like to be your friend",
			"user_id": "583dfb71c4747e39682bae94",
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
	  
- `DELETE http://yourexample.com/api/users/:user_id/friends_request`
	
	####Request
	```javascript
	{
		"email": "jhonyh@gmail.com",
	}
	```
	
	####Response
		
	Status: 200 OK |
	-------------- |
	```javascript
	{
		"message": "Friend request deleted!"
	}
	  ```
#### Accept or reject friends pending
	
- `POST http://yourexample.com/api/users/:user_id/friends_pending`
	
	####Request
	```javascript
	{
    "email": "grinch@gmail.com",
    "accept": true
	}
	```
	
	####Response
		
	Status: 201 CREATED |
	-------------- |
	```javascript
	{
		"message": "Friend pending modified!"
	}
	  ```
#### Get user profile and friends pending list
	  
- `GET http://yourexample.com/api/users/:user_id/friends_pending`
	
	####Response
		
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
			"user_id": "583a7db452dbee2c104b5ac2",
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
#### Add a timeline
	  
- `POST http://yourexample.com/api/users/:user_id/timeline`
	
	####Request
	```javascript
	{
		"comment" : "this is a commment"
	}
	```
	
	####Response
		
	Status: 201 CREATED |
	-------------- |
	```javascript
	{
		"message": "Timeline added!"
	}
	  ```
#### Get user profile and timeline

	  
- `GET http://yourexample.com/api/users/:user_id/timeline`
	
	####Response
		
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

	  
- `GET http://yourexample.com/api/users/:user_id/timeline/:timeline_id`
	
	####Response
		
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

	  
- `DELETE http://yourexample.com/api/users/:user_id/timeline/:timeline_id`
	
	####Response
		
	Status: 200 OK |
	-------------- |
	```javascript
	{
		"message": "Timeline deleted!"
	}
	  ```
	
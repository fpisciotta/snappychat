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

	
- `GET http://yourexample.com/api/users`
	
	#Response
		
		Status: 200 OK |
		-------------- |
		`[
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
		  }]`
		
	



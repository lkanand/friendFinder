module.exports = function(app, arrayOfFriends) {
	app.get("/api/friends", function(req, res) {
		res.json(arrayOfFriends);
	});

	app.post("/api/friends", function(req, res) {
		var profile = req.body;

		for(var i = 1; i < arrayOfFriends.length; i++) {
			var random = Math.floor(Math.random() * (i + 1));
			if(random !== i) {
				var dummy = arrayOfFriends[random];
				arrayOfFriends[random] = arrayOfFriends[i];
				arrayOfFriends[i] = dummy;
			}
		}

		arrayOfFriends.push(profile);

		var friendName;
		var friendPicture;
		var minimumDifference = -1;
		var responses = profile.scores;

		if(arrayOfFriends.length - 1 === 0) {
			friendName = profile.name;
			friendPicture = profile.photo;
		}
		else {
			for(var i = 0; i < arrayOfFriends.length - 1; i++) {
				var previousResponse = arrayOfFriends[i].scores;
				var difference = 0;
				for(var j = 0; j < previousResponse.length; j++)
					difference += Math.abs(responses[j] - previousResponse[j]);

				if(minimumDifference === -1 || difference < minimumDifference) {
					minimumDifference = difference;
					friendName = arrayOfFriends[i].name;
					friendPicture = arrayOfFriends[i].photo;
				}
			}
		}

		var myFriend = {
			name: friendName,
			photo: friendPicture
		};

		res.json(myFriend);
	});
};
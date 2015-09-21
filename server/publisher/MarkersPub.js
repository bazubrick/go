Meteor.publish('mark',function (userIdd) { // публикуем колекцию Markers
	return Markers.find({userId: userIdd});
});
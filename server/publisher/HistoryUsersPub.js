Meteor.publish('hist',function (userIdd) { // публикуем колекцию HistoryUsers
	return HistoryUsers.find({userId: userIdd});
});
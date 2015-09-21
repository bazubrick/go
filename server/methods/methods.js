Meteor.methods({	// додаем в колекцию дани через цикл яки нам вернув Foursquare API
	addMark:function (data) {
		var dataR = data.response.venues;
		var user = Meteor.user();
		for(var i = 0; i < dataR.length;i++){ 
			Markers.insert({ 
	          	lat: dataR[i].location.lat,
	          	lng: dataR[i].location.lng,
	          	id: dataR[i].id,
		        name: dataR[i].name,
		        address: dataR[i].location.address,
		        city: dataR[i].location.city,
		        userId: user._id  
          	});     
        }
	},
	remMark: function () { // очищаем колекциюю
		Markers.remove({userId: Meteor.user()._id});
	},
	historyUsers: function (data) { // додаемо историю
		var now = new Date().getTime();
		var user = Meteor.user();
		HistoryUsers.insert({
			userId: user._id,
			search: data,
			time: now  
        });
	},
	dellHistory: function (delId){ // видаляемо конкретну историю
		HistoryUsers.remove({_id: delId});
	}
});
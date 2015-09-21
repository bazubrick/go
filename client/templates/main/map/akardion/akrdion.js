Template.akardion.helpers({ 
	countHistory: function () { // получаем килькисть venues в истории
		return HistoryUsers.find().count();
	}	
});

Template.akardion.helpers({ 
	count: function () { // получаем килькисть venues
		return Markers.find().count();
	}
});
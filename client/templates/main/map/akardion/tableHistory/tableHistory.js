Template.tableHistory.helpers({
	historyUser: function (){
  		return HistoryUsers.find(); // вертаем курсор колекции HistoryUsers
	},
	submittedText: function() {
    return new Date(this.time).toString(); // обробляемо дату
  	}
});

Template.tableHistory.events({
	'click i':function(e){
		var delId = $(e.target).attr('id');
		console.log(delId);
		Meteor.call('dellHistory',delId,function (err,ress) {
			if(err){
				alert('error');
			}
		});
	}
});
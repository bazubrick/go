Meteor.startup(function() {  // загружаемо карту гугл
    GoogleMaps.load();
})

Template.map.helpers({  
  mapOptions: function() { // задаемо певни опции карти
    if (GoogleMaps.loaded()) { 
      	return {
        	center: new google.maps.LatLng(35.724112, 139.734860),
        	zoom: 10,
        	mapTypeId: google.maps.MapTypeId.lol1
      		};
    	}
  	}
});

Template.map.onCreated(function() {
    $('.login-image').hide();
    var userIdd = Meteor.user()._id;
    this.subscribe('mark',userIdd); // пидпысуемся на колекцию Markers
    this.subscribe('hist',userIdd); // пидпысуемся на колекцию historyUsers
    GoogleMaps.ready('msap', function(map) {
        var markers = {};
        Markers.find().observe({  
            added: function(document) { // виводимо маркери на карту
                var marker = new google.maps.Marker({
                    draggable: false,
                    animation: google.maps.Animation.DROP,
                    position: new google.maps.LatLng(document.lat, document.lng),
                    map: map.instance,
                    id: document._id,
                    icon: 'http://maps.google.com/mapfiles/marker_purple.png'
                });
            markers[document._id] = marker;
            },
            removed: function(oldDocument) { // удаляем маркеры
                markers[oldDocument._id].setMap(null);
            }
        });
    });   
});

Template.map.onRendered(function () { // активуем акардион
    $('.collapsible').collapsible({
        accordion : false
    });
});

Template.map.events({
    'submit form': function(e) {
        e.preventDefault();
        var kord = GoogleMaps.maps.msap.instance.center; // стягуем координати карти на даний момент
        var kordH = kord.H;
        var kordL = kord.L;
        var zoom = GoogleMaps.maps.msap.instance.zoom; // cтягуем зум з карти
        var radius;
        if(zoom <= 8){ 
            radius = 100000;
        }else if(zoom === 9){
            radius = 60000;
        }else if(zoom === 10){
            radius = 32000;
        }else if(zoom === 11){
            radius = 12000;
        }else if(zoom === 12){
            radius = 8000;
        }else if(zoom === 13){
            radius = 5000;
        }else if(zoom === 14){
            radius = 1750;
        }else if(zoom === 15){
            radius = 800;
        }else if(zoom === 16){
            radius = 450;
        }else if(zoom === 17){
            radius = 250;
        }else if(18 === zoom){
            radius = 130;
        }else if(zoom === 19){
            radius = 70;
        }else if(20 <= zoom){
            radius = 50;
        }
        var post = $(e.target).find('[name=search]').val(); // витягуем значення з поля
        if(post === ''){
            alert('Ви ничого не ввели в поле');
        }else{
            Meteor.call('remMark', function(error, result) { // вызываемо метод якый очищае колекцию
            }); 
            var zapros = 'https://api.foursquare.com/v2/venues/search?&ll=' + kordH + ',' + kordL +'&query='+ post +'&limit=50&radius='+ radius +'&oauth_token=4SBXK14STBTGJJHTKT1UBRU3I1SHMDLZJY0KCH2XGTFC1VSS&v=20150916';
            $.getJSON(zapros, function (data){ // робимо запрос  и получаем json
                Meteor.call('addMark', data, function(error, result) { // передаем jsson в метод щоб добавити в колекцию
                    if(error){
                    alert('error');
                    }
                });
                Meteor.call('historyUsers',post, function(err,ress) { // визиваемо метотд щоб добавити в историю запрос
                });
            });
        }
    }
});

Template.map.events({
'click #butCsv': function(event) {
		var table = $('#tabl').html();
		var data = table.replace(/<thead>/g, '')
		.replace(/<\/thead>/g, '')
		.replace(/<tbody>/g, '')
		.replace(/<\/tbody>/g, '')
		.replace(/<tr>/g, '')
		.replace(/<\/tr>/g, '\r\n')
		.replace(/<th>/g, '')
		.replace(/<\/th>/g, ';')
		.replace(/<td>/g, '')
		.replace(/<\/td>/g, ';')
		.replace(/\t/g, '')
		.replace(/\n/g, '');
		var myLink = document.createElement('a');
		myLink.download = "csvname.csv";
		myLink.href = "data:application/csv," + escape(data);
		myLink.click();
    }
});

Template.map.events({ 
	'click #clear':function(){ // при клику на кнопку clear
		Meteor.call('remMark', function(error, result) {
		 // вызываемо метод якый очищае колекцию
        });
	}
});


(function ($) {
		Drupal.behaviors.gd_weather = {
			attach: function (context, settings) {
      // Code to be run on page load, and
      // on ajax load added here 
			var cities = Drupal.settings.g_cities,
			citiesArr = cities.split(','),
			citiesArrLength = citiesArr.length,
			appID = Drupal.settings.app_id,
			weatherURLSingleCity = 'http://api.openweathermap.org/data/2.5/forecast/daily?id=',
			weatherAPIGroup = "http://api.openweathermap.org/data/2.5/group?id="+Drupal.settings.g_cities+"&APPID="+appID+"&units=metric";

			$('div#weather-box', context).once(function(){
				$.getJSON( weatherAPIGroup, {
					format: "json"
				})
				.done(function( data ) {				
					for ( var i = 0; i < data.list.length; i++ ) {
						var cityName = data.list[i].name,
						cityTemp = Math.round(data.list[i].main.temp),
						cityTempIcon = data.list[i].weather[data.list[i].weather.length - 1].icon;
						$('.city-wrapper-'+i+' h5').html(cityName+' '+cityTemp+'&#x2103;');
						$('.city-wrapper-'+i+' div').html('<img src="http://openweathermap.org/img/w/'+cityTempIcon+'.png">');
					}
				});
			
			
				for (var k = 0; k < citiesArr.length; k++) {
				
					$.getJSON( weatherURLSingleCity + citiesArr[k] + "&APPID="+appID + '&units=metric&cnt=1', {
						format: "json",
						num: k
					})
					.done(function( data ) {
						var numOfAJAXcall = parseInt(getUrlParameter('num', this.url));
						var cityName = data.city.name,
						cityTemp = Math.round(data.list[0].temp.day),
						cityTempIcon = data.list[0].weather[0].icon;
						$('.city-wrapper-'+(numOfAJAXcall+3)+' h5').html(cityName+' '+cityTemp+'&#x2103;');
						$('.city-wrapper-'+(numOfAJAXcall+3)+' div').html('<img src="http://openweathermap.org/img/w/'+cityTempIcon+'.png">');					
					});

				}

				if(citiesArrLength == 2) {
					$('.city-wrapper-1, .city-wrapper-4').addClass('only-two');
				}
			
				$('li.weather-menu-item a').click(function(e){
					e.preventDefault();
					var index = $('li.weather-menu-item a').index($(this));
					$('li.weather-menu-item a').removeClass('active');
					$(this).addClass('active');
					$('.temp-group').removeClass('active');
					$('.temp-group-'+index).addClass('active');
				});
			
			});

		}
	};
	
	function getUrlParameter(sParam, url) {
		var sPageURL = decodeURIComponent(url),
		sURLVariables = sPageURL.split('&'),
		sParameterName,
		i;

		for (i = 0; i < sURLVariables.length; i++) {
			sParameterName = sURLVariables[i].split('=');

			if (sParameterName[0] === sParam) {
				return sParameterName[1] === undefined ? true : sParameterName[1];
			}
		}
	};
	
}(jQuery));

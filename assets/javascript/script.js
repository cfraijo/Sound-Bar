$(document).ready(function(){  

      var searchQuery = "Michael Jackson";
      var queryURL = "http://api.musicgraph.com/api/v2/artist/search?api_key=4db32eb564d567abea9870b5e9381c4b&name=" + searchQuery + "&limit=1";

      var queryURL2 = "http://api.musicgraph.com/api/v2/artist/search?api_key=4db32eb564d567abea9870b5e9381c4b&similar_to=" + searchQuery + "&limit=10";

      var queryURL3 = "http://app.ticketmaster.com/discovery/v1/events.json?keyword=Michael+Jackson&apikey=s12kNXNClYbfqtRG3dikwAp75zpbZm7i";

      $.ajax({
          url: queryURL,
          method: "GET"
        })
              .done(function(response) {
          		var results = response.data;

          		console.log(results[0].name);
          
        });

      $.ajax({
          url: queryURL2,
          method: "GET"
        })
              .done(function(response) {
          		var results2 = response.data;

          		for(var i = 0; i < results2.length; i++){

          			console.log(results2[i].name);

          		}
          
        });

      $.ajax({
          url: queryURL3,
          method: "GET"
        })
              .done(function(response) {
          		var results3 = response._embedded;

          		

          			console.log(results3);

          		
          
        });


});
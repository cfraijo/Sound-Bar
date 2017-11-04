$(document).ready(function(){  

      var searchQuery = "Michael Jackson";
      
      var queryURL = "http://api.musicgraph.com/api/v2/artist/search?api_key=4db32eb564d567abea9870b5e9381c4b&name=" + searchQuery + "&limit=1";

      var queryURL2 = "http://api.musicgraph.com/api/v2/artist/search?api_key=4db32eb564d567abea9870b5e9381c4b&similar_to=" + searchQuery + "&limit=10";

      var queryURL3 = "http://app.ticketmaster.com/discovery/v1/events.json?keyword=" + searchQuery + "&apikey=s12kNXNClYbfqtRG3dikwAp75zpbZm7i";

      var queryURL4 = "http://api.musicgraph.com/api/v2/album/search?api_key=4db32eb564d567abea9870b5e9381c4b&artist_name=" + searchQuery + "&limit=10";

      

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

                $("#similar").append("<div>" + results2[i].name + "</div>");

          		}
          
        });

      $.ajax({
          url: queryURL3,
          method: "GET"
        })
              .done(function(response) {
          		var results3 = response._embedded.events;

              var venue = "_embedded.venue.name";

              var venueDate = "_embedded.venue.dates.start.localDate";

              console.log(results3[0].venue);
              console.log(results3[0].venueDate);

          		for(var i = 0; i < 10; i++) {

          			   console.log("results: " + results3[i].venue);

                   $("#tour-dates").append("<div>" + results3[i].name + "</div>");
                   $("#tour-dates").append("<div>" + results3[i].venue + "</div>");
                   $("#tour-dates").append("<div>" + results3[i].venueDate + "</div>");
                }
          
        });

       $.ajax({
          url: queryURL4,
          method: "GET"
        })
              .done(function(response) {
              var results4 = response.data;

              for(var i = 0; i < results4.length; i++){

                console.log(results4[i].title);

                $("#albums").append("<div>" + results4[i].title + "</div>");

              }
          
        });       


});
$(document).ready(function(){  


    $(".center").slick({
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
      });

      var searchQuery, queryURL, queryURL2, queryURL3, queryURL4;
      

      $("#button").on("click", function(event){

        event.preventDefault();

        searchQuery = $("#search-box").val().trim();

        queryURL = "http://api.musicgraph.com/api/v2/artist/search?api_key=4db32eb564d567abea9870b5e9381c4b&name=" + searchQuery + "&limit=1";

        queryURL2 = "http://api.musicgraph.com/api/v2/artist/search?api_key=4db32eb564d567abea9870b5e9381c4b&similar_to=" + searchQuery + "&limit=10";

        queryURL3 = "http://app.ticketmaster.com/discovery/v1/events.json?keyword=" + searchQuery + "&apikey=s12kNXNClYbfqtRG3dikwAp75zpbZm7i";

        queryURL4 = "http://api.musicgraph.com/api/v2/album/search?api_key=4db32eb564d567abea9870b5e9381c4b&artist_name=" + searchQuery + "&limit=10";


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

                  var venue = "_embedded.venue.city";

                  var venueDate = "dates.start.localDate";

                  console.log(results3[0].venue);
                  console.log(results3[0].dates.start.localDate);

              		for(var i = 0; i < 5; i++) {

              			   console.log("results: " + results3[i].venue);

                       $("#tour-dates").append("<div>" + results3[i].name + "</div>");
                       $("#tour-dates").append("<div>" + results3[i]._embedded.venue[0].city.name + "</div>");
                       $("#tour-dates").append("<div>" + results3[i].dates.start.localDate + "</div>");
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

});
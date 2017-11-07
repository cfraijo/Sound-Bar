$(document).ready(function(){  


    $(".center").slick({
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
      });

      var searchQuery, queryURL, queryURL2, queryURL3, queryURL4, queryURL5;
      

      $("#button").on("click", function(event){

        event.preventDefault();

        if(searchQuery !== undefined){

          $(".append").empty();
        }

        searchQuery = $("#search-box").val().trim();

        queryURL = "http://api.musicgraph.com/api/v2/artist/search?api_key=4db32eb564d567abea9870b5e9381c4b&name=" + searchQuery + "&limit=1";

        queryURL2 = "https://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=" + searchQuery + "&api_key=de224565e0c43fd229f3c0ea1402e401&format=json";

        queryURL3 = "http://app.ticketmaster.com/discovery/v1/events.json?keyword=" + searchQuery + "&apikey=s12kNXNClYbfqtRG3dikwAp75zpbZm7i";

        queryURL4 = "http://api.musicgraph.com/api/v2/album/search?api_key=4db32eb564d567abea9870b5e9381c4b&artist_name=" + searchQuery + "&limit=10";

        queryURL5 = "https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=" + searchQuery + "&api_key=de224565e0c43fd229f3c0ea1402e401&format=json"

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
              		var results2 = response.similarartists.artist;

              		for(var i = 0; i < 10; i++){

              			console.log(results2[i].name);


                    $("#similar").append("<div class='append'>" + results2[i].name + "</div>");

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

                       $("#tour-dates").append("<div class='append'>" + results3[i].name + "</div>");
                       $("#tour-dates").append("<div class='append'>" + results3[i]._embedded.venue[0].city.name + "</div>");
                       $("#tour-dates").append("<div class='append'>" + results3[i].dates.start.localDate + "</div>");
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

                    $("#albums").append("<div class='append'>" + results4[i].title + "</div>");

                  }
              
            });

            $.ajax({
              url: queryURL5,
              method: "GET"

            }) 
                .done(function(response){

                  var results5 = response.artist.bio.summary;
                  // var results6 = response.artist.image.text[2];


                  $("#bio-text").append("<div class='append'>" + results5 + "</div>");

                  // $("#bio-image").append("<img src='" + results6 + "' class='append'>");
                });      

            $.ajax({
              url: queryURL5,
              method: "GET"

            }) 
                .done(function(response){

                  var results6 = response.artist.image[2];

                  console.log("IMAGE: " + results6["#text"]);

                  $("#bio-image").html("<img src='" + results6["#text"] + "' class='append'>");

                }); 

        });

});
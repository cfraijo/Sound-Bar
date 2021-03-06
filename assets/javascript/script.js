$(document).ready(function(){  

      $('.center').slick({
          // centerMode: true,
          centerPadding: '60px',
          slidesToShow: 3,
          responsive: [
            {
              breakpoint: 768,
              settings: {
                arrows: true,
                // centerMode: true,
                centerPadding: '40px',
                slidesToShow: 3
              }
            },
            {
              breakpoint: 480,
              settings: {
                arrows: true,
                // centerMode: true,
                centerPadding: '40px',
                slidesToShow: 1
              }
            }
          ]
        });

          var config = {
            apiKey: "AIzaSyC0UaEOzQ4j-c_EFcUlhJKJaRmuL35Uay0",
            authDomain: "soundbar-150bf.firebaseapp.com",
            databaseURL: "https://soundbar-150bf.firebaseio.com",
            projectId: "soundbar-150bf",
            storageBucket: "soundbar-150bf.appspot.com",
            messagingSenderId: "508203526036"
          };
          firebase.initializeApp(config);

        // variable to reference the database
          var database = firebase.database();

        // initial search value
          var search = "Michael Jackson"

        //calling value from search bar and inputting to firebase
        $(document).on("click", ".btn-danger", function(event){

          event.preventDefault();

          search = $(".search-query").val().trim();

          console.log(database.ref());

          database.ref("history").push(
          {
            Search: search,
          });

          console.log(database.ref().child("history"));

          var historyRef= database.ref("history");

          historyRef.on('value', function(snapshot){
          $(".searchHistory").empty();
          snapshot.forEach(function(childSnapshot) {
          
          console.log(childSnapshot.val().Search);

          var newSearch = $("<p class='searchDropdown'>");
          newSearch.text(childSnapshot.val().Search);

          $(".searchHistory").prepend(newSearch);

          return false;

          $('.searchQuery').keypress(function(e){
            if(e.which == 13){//Enter key pressed
              $('#menu1').click();//Trigger search button click event
          }
    });
        });

        });

        });


// -------------------------------------------------

var globalResponse ;
var url = "http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=9bbc09319f9d9e5f95dfe0da622dbd29&format=json"
//var url = "http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=9bbc09319f9d9e5f95dfe0da622dbd29&format=json"
var ranNums = generated();
// $(document).on('click', function(){
    $.ajax({
            url: url, 
            type: 'get',
            success: function(response){
                for (var i = 0; i < ranNums.length; i++) {
                    var iDiv = document.createElement('div');
                    // iDiv.id = 'albums';
                    iDiv.className = 'albums';
                    var div = $(".slick-track");
                    div.css("display", "inline-flex");
                    var image = $('<img>');
                    var math = generated();
                    var min = Math.ceil(0);
                    var max = Math.floor(49);
                    var maybe = Math.floor(Math.random() * (max - min + 1)) + min
                    image.attr('src',response.artists.artist[maybe].image[2]['#text']);
                    

                    $(iDiv).append(image);
                    $(div).append(iDiv);
                    

                          
                };
                
            }
    })
    // });
//random number including 0 and 9
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}
//Take numbers generated,
function generated(){
    var array = [];
    while (array.length < 10){
        var num = getRandomIntInclusive(0,9);
        if(array.includes(num) === false){
            array.push(num);
        }
    }
    return array;
    return num;
}
// If number generated isnt in the array, insert into array
//if array length = 10 stop
// and add them to a blank array
//

// -------------------------------------------------

    $("#albums").hide();
    $("#similar").hide();
    $("#tour-dates").hide();

      var searchQuery, queryURL, queryURL2, queryURL3, queryURL4, queryURL5;
      

      $("#button").on("click", function(event){

        event.preventDefault();

        $("#albums").show();
        $("#similar").show();
        $("#tour-dates").show();

        if(searchQuery !== undefined){

          $(".append").empty();

        };

        searchQuery = $(".search-query").val().trim();

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

              		for(var i = 0; i < 2; i++) {

              			   console.log("results: " + results3[i].venue);

                       $("#tour-dates").append("<div class='append'><h4>VENUE:  </h4>" + results3[i].name + "</div>");
                       $("#tour-dates").append("<div class='append'><h5>CITY:  </h5>" + results3[i]._embedded.venue[0].city.name + "</div>");
                       $("#tour-dates").append("<div class='append'><h5>DATE:  </h5>" + results3[i].dates.start.localDate + "</div>");
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

                  $("#artist-name").append("<h2 class='append'>" + response.artist.name + "</h2>");

                }); 

                $(".searchDropdown").on("click", function(){
                  console.log("IT WORKS");
                });

        });

});


      

      var searchQuery = "Michael Jackson";
      var queryURL = "http://api.musicgraph.com/api/v2/artist/search?api_key=&name=" + searchQuery;

      $.ajax({
          url: queryURL,
          method: "GET"
        })
              .done(function(response) {
          		var results = response.data;

          		console.log(results);
          
        });
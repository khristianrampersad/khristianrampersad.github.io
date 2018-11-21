   // Array to insert buttons
      var gifs = ["Lebron", "Kobe", "Jackie Moon", "Curry"];
      
            // Display Gifs
      
            function displaygifs() {
      
              var gif = $(this).attr("data-name");
              
              var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=ILluATkQpMnP5LkzW1RPehryO2UkK1Xo&tag=basketball&limit=50";
      
      
              // Ajax //
              $.ajax({
                url: queryURL,
                method: "GET"
              }).done(function (response) {
                $('.gif-container').empty();
                for (var i = 0; i < response.data.length; i++) {
                  var title = "<div class='title'> Title:  " + (response.data[i].title) + " </div>";
                  var rating = "<div class='ratings'> Rating:  " + (response.data[i].rating) + " </div>";
                  var image = '<img src= " ' + response.data[i].images.fixed_height_still.url +
                    '" data-still=" ' + response.data[i].images.fixed_height_still.url +
                    ' " data-animate=" ' + response.data[i].images.fixed_height.url + '" data-state="still" class="gifDisplay">'
                  var gifItUp = '<div class="col-md-3">' + title + rating + image + '</div>';
                  $('.gif-container').append(gifItUp);
                  console.log(response.data[i]);
                }
      
                $('.gifDisplay').on('click', function () {
                  var state = $(this).attr('data-state');
                  if (state === 'still') {
                    $(this).attr('src', $(this).attr("data-animate"));
                    $(this).attr('data-state', 'animate');
                  } else {
                    $(this).attr('src', $(this).attr("data-still"));
                    $(this).attr('data-state', 'still');
                  }
      
                });
              })
            }
      
      
      
            // Function and loop to show gifs
            function renderButtons() {
      
         
              $(".render-button").empty();
      
      
            
              for (var i = 0; i < gifs.length; i++) {
      

                var a = $("<button>");
               
                a.addClass("gif");
            
                a.attr("data-name", gifs[i]);
                a.text(gifs[i]);
                $(".render-button").prepend(a);
      
              }
            }
      
      
            // How to add more buttons using the search bar I was a little confused by this, as I believe it might need to be a document.ready? But I'm not sure
            $(".add-gif").on("click", function (event) {
              event.preventDefault();
      
              var gif = $(".gif-input").val().trim();
      
            
              gifs.push(gif);
      
        
              renderButtons();
      
            });
      
           
            $(document).on("click", ".gif", displaygifs);
      
          
            renderButtons();

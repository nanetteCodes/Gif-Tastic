$(document).ready(function() {
    // initial array of dogs 
    var topics = ["beagles", "poodle", "yorky", "teddy bear dog"];

    $(document).on('click', '.genGif', function() {
        //display dogGif function re-renders the HTML to display the content
        function displayDoggyInfo() {

            var dog = $(this).html();
            // url for Giphy API
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + dog + "&api_key=dc6zaTOxFJmzC&limit=6";

            //ajax call for specific dog button being clicked
            $.ajax({
                url: queryURL,
                method: 'GET'
            }).done(function(response) {
                console.log(queryURL);
                //div to hold the dog info 
                // storing the data from the AJAX request in the results variable
                var results = response.data;
                //empty the gifs after each button press
                $("#gifImages").empty();
                // Looping through each result item
                for (var i = 0; i < results.length; i++) {
                    //creating div to hold image and rating
                    var doggyDiv = $("<div>");
                    //image still and animated variables
                    var image = results[i].images.fixed_height.url;
                    var still = results[i].images.fixed_height_still.url;
                    var doggyImage = $("<img>").attr("src", still);
                    //adding attributes to allow image to be played and paused 
                    doggyImage.attr('data-animate', image);
                    doggyImage.attr('data-still', still).attr('data-state', 'still');
                    //appending image 
                    doggyDiv.append(doggyImage);
                    // Putting the entire gif call above the previous
                    $("#gifImages").prepend(doggyDiv);
                    //on click 
                    doggyImage.on('click', playGif);

                    //create element to display rating data
                    var p = $("<p>").text("Rating: " + results[i].rating);
                    //append rating
                    doggyDiv.prepend(p);
                } // for loop closing
            }); //data function closing
        } // doggyInfo closing

        function playGif() {
            var state = $(this).attr('data-state');
            console.log(state);
            if (state == 'still') {
                $(this).attr('src', $(this).data('animate'));
                $(this).attr('data-state', 'animate');
            } else {
                $(this).attr('src', $(this).data('still'));
                $(this).attr('data-state', 'still');
            }

        } //on click express
        // Adding a click event listener to all elements with a class of "genGif"
        $(document).on("click", ".genGif", displayDoggyInfo);

    }); //on click closing

    function renderButtons() {
        // delete dogs prior to adding new ones
        $("#gifBttns").empty();
        // loop through initial array of dogs
        for (var i = 0; i < topics.length; i++) {
            //console.log(topics[i]);
            //genrated button to hold each dog in array
            var bttn = $("<button>");
            bttn.addClass("genGif btn btn-primary");
            bttn.css("margin-right", "5px")
            bttn.attr("data-name", topics[i]);
            bttn.text(topics[i]);
            //add the button to the gifBttn div
            $("#gifBttns").append(bttn);
        } //for loop closing
    } //renderButton closing

    //function handeling events when add doggyButton is clicked
    $("#doggyButton").on("click", function(event) {
        event.preventDefault();
        //grabs the user input from textbox
        var dogAdd = $("#doggyInput").val().trim();
        //adding topics from the textbox to our array
        topics.push(dogAdd);
        //call renderButtons which handles processing of topics array
        renderButtons();

    });

    // Calling the renderButtons function to display the intial buttons
    renderButtons();
}); // doc ready function closing
    
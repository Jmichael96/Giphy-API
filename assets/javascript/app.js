
//array of defult animal options
var topics = ["bear", "bat", "llama", "goat", "tiger", "fish", "wolf", "cat", "snake", "monkey", "elephant"];

//add animal input button on click and displays it to the page
$("#add-animal").on("click", function(event) {
event.preventDefault();
   var newAnimal = $("#animal-input").val().trim();

  if(newAnimal){
    topics.push(newAnimal);
    renderButtons();
  }


  $("#animal-input").val("");

});

$(document).on("click", ".animal-btn", function(){
  var animalName = $(this).attr("data-name");
  animalsDisplayed(animalName);
  console.log("click", animalName);
})

//appending all animal names, images, ratings to the page
function animalsDisplayed(animalName) {
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animalName + "&api_key=QcDB96pD9RRsGoPu39YeDzqG8nH5za6V&limit=10";

  $.ajax({
    url: queryURL,
    method:"GET"
    }).done(function(animalGIF) {

          console.log(queryURL);
          console.log(animalGIF);

    $("#animal-gifs").empty();
          
    for (var i = 0; i < animalGIF.data.length; i++){

      var animalDiv = $("<div>");
      animalDiv.addClass("animalDiv")

      var p = $("<p class='text-white'>");
      var gifImg = $("<img>");
      gifImg.addClass("gif-img");

      gifImg.attr("data-state", "still");
      gifImg.attr("data-still", animalGIF.data[i].images.fixed_height_small_still.url);
      gifImg.attr("data-animate", animalGIF.data[i].images.fixed_height_small.url);    
      p.text("Rating: " + animalGIF.data[i].rating);
      gifImg.attr("src", animalGIF.data[i].images.fixed_height_small_still.url);

      animalDiv.append(gifImg);    
      animalDiv.append(p);
      
      $("#animal-gifs").prepend(animalDiv);  
    }
  });
}

//creating buttons for all the animals
function renderButtons(){

    $("#animal-buttons").empty();

    for (var i = 0; i < topics.length; i++){

       var animalButton = $("<button type='button'>");

       animalButton.addClass("animal-action")
       animalButton.addClass("animal-btn btn btn-primary");
       animalButton.attr("data-name", topics[i]);
       animalButton.text(topics[i]);

       $("#animal-buttons").append(animalButton);
    
      
    }
}
//making the images turn to gifs or stop them
renderButtons();
$(document).on("click", ".animal-action", animalsDisplayed);
$(document).on("click", ".gif-img", function() {
    var state = $(this).attr("data-state");
    if (state === "still"){
      $(this).attr("src", $(this).data("animate"));
      $(this).attr("data-state", "animate");
    } else{
      $(this).attr("src", $(this).data("still"));
      $(this).attr("data-state", "still");
    }
});


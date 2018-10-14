
//array of defult animal options
var topics = ["bear", "bat", "llama", "goat", "tiger", "fish", "wolf", "cat", "snake", "monkey", "elephant"];


//add animal input button on click and displays it to the page
$("#add-animal").on("click", function(event) {
event.preventDefault();
   var newAnimal = $("#animal-input").val().trim();
//pushes new animals to the array and adds it to page
  if(newAnimal){
    topics.push(newAnimal);
    renderButtons();
  };
//an empty value to catch the animal input that was created
  $("#animal-input").val("");
});

//removing all user added buttons from the page
function removeLastButton(){
  $("remove-animal").on("click", function(){
  topics.pop(action);
  renderButtons();
  return false;
  });
};

// click function when animal button is clicked gifs render to page
$(function(){
  $(document).on("click", ".animal-btn", function(){
    var animalName = $(this).attr("data-name");
    animalsDisplayed(animalName);
  
    console.log("click", animalName);
  });
});


//giphy API and appending all animal names, images, ratings to the page
function animalsDisplayed(animalName) {
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animalName + "&api_key=QcDB96pD9RRsGoPu39YeDzqG8nH5za6V&limit=10";
  
  $.ajax({
    url: queryURL,
    method:"GET"
    
    })
    .then(function(animalGIF) {

          // console.log(queryURL);
          console.log(animalGIF);

    $("#animal-gifs").empty();
   //for loop to make sure only 10 gifs display
    for (var i = 0; i < animalGIF.data.length; i++){
   //creating the elements for the page
      var animalDiv = $("<div>");
      animalDiv.addClass("animalDiv");
      //displaying ratings 
      var p = $("<p class='text-center'>");
      p.addClass("ratings");
       
      var gifImg = $("<img>");
      gifImg.addClass("gif-img");
   // displaying specific data from the gif
      gifImg.attr("data-state", "still");
      gifImg.attr("data-still", animalGIF.data[i].images.fixed_height_small_still.url);
      gifImg.attr("data-animate", animalGIF.data[i].images.fixed_height_small.url);    
      p.text("Rating: " + animalGIF.data[i].rating);
      gifImg.attr("src", animalGIF.data[i].images.fixed_height_small_still.url);

      animalDiv.append(gifImg);          
      animalDiv.append(p);
      $("#animal-gifs").prepend(animalDiv);  
    };
  });
};



//creating buttons for all default animals and redering to page
function renderButtons(){

    $("#animal-buttons").empty();
   //for loop to iterate through the array
    for (var i = 0; i < topics.length; i++){
      //creating buttons for the animals array
       var animalButton = $("<button>");
      
       animalButton.addClass("animal-action");
       animalButton.addClass("animal-btn");
       animalButton.attr("data-name", topics[i]);
       animalButton.text(topics[i]);

       $("#animal-buttons").append(animalButton); 
    };
};

//making the images turn to gifs or on click again, stop.
renderButtons();
$(document).on("click", ".gif-img", function() {
    var state = $(this).attr("data-state");
    if (state === "still"){
      $(this).attr("src", $(this).data("animate"));
      $(this).attr("data-state", "animate");
    } else{
      $(this).attr("src", $(this).data("still"));
      $(this).attr("data-state", "still");
    };
});


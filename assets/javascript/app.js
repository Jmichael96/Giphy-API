"use strict";

//array of defult animal options
let defaultAnimals = ["bear", "bat", "llama", "goat", "tiger", "fish", "wolf", "cat", "snake", "monkey", "elephant"];
// array for when a user adds an animal
let addedAnimals = [];

// upon window load render default button animal list
window.onload = function () {

  // iterate over default animal array list
  for (let i = 0; i < defaultAnimals.length; i++) {

    // creating button elements for the animal array
    let animalButton = $("<button>");

    // adding classes to animal buttons
    animalButton.addClass("animal-btn");
    // adding the attribute data-name to the appending animal button
    animalButton.attr("data-name", defaultAnimals[i]);
    // adding text to the animal buttons
    animalButton.text(defaultAnimals[i].toUpperCase());
    // and finally appending the created button elements
    $("#default-buttons").append(animalButton);
  };
}

//add animal input button on click and displays it to the page
$("#add-animal").on("click", function (event) {
  event.preventDefault();
  let newAnimal = $("#animal-input").val().trim();

  //pushes new animals to the array and adds it to page
  if (newAnimal) {
    addedAnimals.push(newAnimal.toLowerCase());
    renderAddedBtns();
  };

  // reset the input value to an empty string
  $("#animal-input").val("");
});


// giphy API and appending all animal names, images, ratings to the page
function animalsDisplayed(animalName) {
  let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animalName + "&api_key=QcDB96pD9RRsGoPu39YeDzqG8nH5za6V&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  })
    .then(function (animalGIF) {

      $("#animal-gifs").empty();
      //for loop to make sure only 10 gifs display
      for (let i = 0; i < animalGIF.data.length; i++) {
        //creating the elements for the page
        let animalDiv = $("<div>");
        animalDiv.addClass("animalDiv");
        // displaying ratings 
        let p = $("<p class='text-center'>");
        p.addClass("ratings");

        let gifImg = $("<img>");
        gifImg.addClass("gif-img");
        // displaying specific data from the gif
        gifImg.attr("data-state", "still");
        gifImg.attr("data-still", animalGIF.data[i].images.fixed_height_small_still.url);
        gifImg.attr("data-animate", animalGIF.data[i].images.fixed_height_small.url);
        p.text("RATING: " + animalGIF.data[i].rating.toUpperCase());
        gifImg.attr("src", animalGIF.data[i].images.fixed_height_small_still.url);

        animalDiv.append(gifImg);
        animalDiv.append(p);
        $("#animal-gifs").prepend(animalDiv);
      };
    });
};

// render created buttons to page
function renderAddedBtns() {

  // getting the last added animal in the array
  let lastAnimal = addedAnimals[addedAnimals.length - 1];

  // creating button elements for the animal array
  let animalButton = $("<button>");

  // adding classes to animal buttons
  animalButton.addClass("animal-btn");
  animalButton.addClass(lastAnimal.toLowerCase())
  // adding the attribute data-name to the appending animal button
  animalButton.attr("data-name", lastAnimal);

  // adding text to the animal buttons
  animalButton.text(lastAnimal.toUpperCase());
  // and finally appending the created button elements
  $("#added-buttons").append(animalButton);
  // adding oncontextmenu to animal button for removing a single button on right click
  $(`.${lastAnimal}`).attr("oncontextmenu", `removeSingleBtn('${lastAnimal}'); return false;`);
};

// removing a single added button from the page
function removeSingleBtn(name) {
  // remove existing buttons to prepare for re-rendering
  $('#added-buttons').empty();

  // iterate over addedAnimals array and remove selected animal from it
  addedAnimals.map((item, i) => {
    if (item === name) {
      addedAnimals.splice(i, 1);
      console.log('deleted', name)
    }
  });

  // call the render function to re-render animal buttons
  renderfilteredAnimals(addedAnimals);

};

function renderfilteredAnimals(array) {
  // iterate over filtered array and re-render to page
  for (let i = 0; i < array.length; i++) {

    // creating button elements for the animal array
    let animalButton = $("<button>");

    // adding classes to animal buttons
    animalButton.addClass("animal-btn");
    animalButton.addClass(array[i].toLowerCase())
    // adding the attribute data-name to the appending animal button
    animalButton.attr("data-name", array[i]);

    // adding text to the animal buttons
    animalButton.text(array[i].toUpperCase());
    // and finally appending the created button elements
    $("#added-buttons").append(animalButton);
    // adding oncontextmenu to animal button for removing a single button on right click
    $(`.${array[i]}`).attr("oncontextmenu", `removeSingleBtn('${array[i]}'); return false;`);
  }
}

// click function when animal button is clicked gifs render to page
$(document).on("click", ".animal-btn", function () {
  let animalName = $(this).attr("data-name");
  animalsDisplayed(animalName);
});

// for when a use clicks on a gif. this will dictate whether to stop or start the gif
$(document).on("click", ".gif-img", function () {
  let state = $(this).attr("data-state");
  if (state === "still") {
    $(this).attr("src", $(this).data("animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).data("still"));
    $(this).attr("data-state", "still");
  };
});


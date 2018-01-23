var main = {
  "genreChoice":"",
  "genreID":"", 
    "currentPairing": {
      "movie": {
        "title":"",
        "poster_path":"",
        "overview":"",
        "release_date":""
      },"drink": {
        "name":"",
        "image_path":"",
        "url":""
      }
    },
  "savedPairings":[]
}

var savedPairings = [];
   // "savedPairings": []


// renders our emoji buttons
function renderButtons() {
  console.log(main);
  // clear buttons area
  $("#buttons-view").empty();
  // Looping through the array of genres (in movies.js)
  for (var i = 0; i < genres.genres.length; i++) {
    // create emoji buttons
    var a = $("<img>");
    a.addClass("emoji-button");
    a.attr("genre-id", genres.genres[i].id);
    a.attr("genre-name", genres.genres[i].name);
    a.attr("src", genres.genres[i].emoji);
    $("#buttons-view").append(a);
  }
}

// go through savedPairings and generate table
function generateTable() {
  // clear table
  $('tbody').empty();
  // go through saved movies and create table rows
  $.each(main.savedPairings, function( index, value ) {
    var $tr = $('<tr>').append(
      $('<td>').text(main.savedPairings[index].genre),
      $('<td>').text(main.savedPairings[index].drink.name),
      $('<td>').text(main.savedPairings[index].movie.title),
      // $('<td>').text(snapshot.val().starttime).addClass('starttime'),
      // $('<td>').text(snapshot.val().frequency).addClass('frequency'),
      // $('<td>').addClass('arrival'),
      // $('<td>').addClass('min-away'),
      // $('<td>').append(btn) 
    ).appendTo('.table');


    //alert( index + ": " + value );
  });


  // generate table
  // var $tr = $('<tr>').append(
  //   $('<td>').text(hello),
  //   // $('<td>').text(snapshot.val().destination).addClass('destination'),
  //   // $('<td>').text(snapshot.val().starttime).addClass('starttime'),
  //   // $('<td>').text(snapshot.val().frequency).addClass('frequency'),
  //   // $('<td>').addClass('arrival'),
  //   // $('<td>').addClass('min-away'),
  //   // $('<td>').append(btn) 
  // ).appendTo('.table');

}



generateTable();



$(".title").hide();










// on startup create our emoji buttons
renderButtons();

// when you click an emoji
$('.emoji-button').on('click', function(){
  // update our main object with attributes from the emoji button
  main.genreID = $(this).attr("genre-id");
  main.genreChoice = $(this).attr("genre-name").toLowerCase();
  // call our function from movies.js to get a random movie
  getMovie(main.genreID);
  // call our function from drinks.js to get a random drink
  getDrink(main.genreChoice);

});

// keep movie but get a new drink
$(".new-drink").click(function() {
  getDrink(main.genreChoice);
});

// keep drink but get a new movie
$(".new-movie").click(function() {
  getMovie(main.genreID);
});

// get a new movie and a new drink
$(".new-pairing").click(function() {
  getDrink(main.genreChoice);
  getMovie(main.genreID);
});


// move current pairing to savedPairings and get a new movie and drink
$(".save-pairing").click(function() {
  current = main.currentPairing;
  // make empty objects and fill them with the current values
  var save ={"movie": {}, "drink":{}};
  save.genre = main.genreChoice;
  save.movie.title=current.movie.title;
  save.movie.poster_path=current.movie.poster_path;
  save.movie.overview=current.movie.overview;
  save.movie.release_date=current.movie.release_date;
  save.drink.name=current.drink.name;
  save.drink.image_path=current.drink.image_path; 
  // push the object to our savedPairings array
  main.savedPairings.push(save);
  // go through savedPairings and generate table
  generateTable();
  // get a new drink / movie
  getDrink(main.genreChoice);
  getMovie(main.genreID);
});
















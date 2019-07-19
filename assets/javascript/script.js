//Define the array for the buttons
var topics = ["Breaking Bad", "The Office", "The Sopranos", "Game Of Thrones",
    "The Shield", "The Simpsons", "Lost", "Seinfeld", "Friends", "House Of Cards",
    "Prison Break", "Money Heist"];
//function to get images from the Giphy API and show in the Html
function showGiphy() {
    $("#images-div").empty();
    var serieName = $(this).attr("data-name");
    console.log(serieName);
    //the URL get 100 images to show always diferents images
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        serieName + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=100";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (res) {
        console.log(res);
        var results = res.data;
        //create an random number to show only 12 random images
        var randomNumber = Math.floor(Math.random() * 90);
        for (var k = randomNumber; k < (randomNumber + 12); k++) {
            console.log(res.data[k]);
            //create the img tag and assing the attibutes and the show it in the div
            var image = $("<img>").attr("src", results[k].images.fixed_height_still.url)
            image.attr("class", "gif")
            image.attr("data-state", "still");
            image.attr("data-still", results[k].images.fixed_height_still.url);
            image.attr("data-animate", results[k].images.fixed_height.url);
            image.attr("height", "200px");
            image.attr("width", "300px");
            $("#images-div").append(image);
        }
    });
}

//function that create and show the buttons from the array
function showButtons() {
    $("#buttons-section").empty();
    for (var i = 0; i < topics.length; i++) {
        var b = $("<button>")
        b.addClass("btn btn-info btn_serie");
        b.attr("data-name", topics[i]);
        b.text(topics[i]);
        $("#buttons-section").append(b);

    }
}

//onclick to add new buttons
$("#serie-btn").on("click", function () {
    var textInBox = $("#text-input").val().trim();
    //create an empty temp array
    var tempArr = [];
    //copy the info in the temparray with all in lowercase
    for (var j = 0; j < topics.length; j++) {
        tempArr[j] = topics[j].toLowerCase();
    }
    //create a temp var and assing the value of the text box all in lowercase
    var textInBoxTemp = $("#text-input").val().trim().toLowerCase();
    console.log(tempArr);
    console.log(textInBoxTemp);
    //check if the value is in the array both the array and the text are in lower case
    //to doesnt allow duplicate the buttons even if the button start in lower case and the 
    //text is all in upper case or viceversa
    var pos = tempArr.indexOf(textInBoxTemp);
    event.preventDefault();

    //if the text-input is not empty and the text is not in the buttons add the text
    //to the array and call the function showbuttons then clear the textbox
    if ($("#text-input").val() != "" && pos < 0) {

        topics.push(textInBox)
        $("#text-input").val("");

        showButtons();
    } else {

        alert("You must enter a valid Serie and no repeat the serie")
        $("#text-input").val("");
    }

    console.log(pos);


})
//onClick for the buttons series
$(document).on("click", ".btn_serie", showGiphy);
//onClick for the gifs
$(document).on("click", ".gif", playOrPause);


//function to play or pause the gifs
function playOrPause() {
    var state = $(this).attr("data-state");
    console.log(state);
    if (state == "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");

    } else if (state == "animate") {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");

    }

    console.log(this);

}
//call the show buttons function to create and display the buttons at load the site
showButtons();

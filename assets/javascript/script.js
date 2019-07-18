var topics = ["Breaking Bad", "The Office", "The Sopranos", "Game Of Thrones",
    "The Shield", "The Simpsons", "Lost", "Seinfeld", "Friends", "House Of Cards",
    "Prison Break", "Money Heist"];

function showGiphy(){
    var serieName = $(this).attr("data-name");
    console.log(serieName);
}


function showButtons() {
    $("#buttons-section").empty();
    for (var i = 0; i < topics.length; i++) {
        var b = $("<button>")
        //console.log(topics[i]);
        b.addClass("btn btn-info btn_serie");
        b.attr("data-name", topics[i]);
        b.text(topics[i]);
        $("#buttons-section").append(b);

    }
}

$("#serie-btn").on("click", function () {
    var textInBox = $("#text-input").val().trim();
    //console.log(textInBox);
    
    event.preventDefault();
    if($("#text-input").val() != ""){
        console.log(topics.indexOf(textInBox));
        topics.push(textInBox)
        $("#text-input").val("");
    
        showButtons();
    }


})

$(document).on("click", ".btn_serie", showGiphy);


showButtons();

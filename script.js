var overallTerm = "";

$(".classes").on("click", function () {
    $(".nav2").empty();
    overallTerm = "classes";
    $(".picka2").text("Pick a class");
    var query = "https://api.open5e.com/" + overallTerm;
    $.ajax({
        url: query,
        method: "GET"
    }).then(function(response){
        for (var i=0; i < 12; i++){
            var className = $("<button>").attr("class", "classNames nav-item").attr("data-value", i);
            className.text(response.results[i].name);
            $(".nav2").append(className);
        }
        $(".classNames").on("click", function() {
            handleClassInfo(response, this);
        });
    });
});

function handleClassInfo(response, classChosen) {
    var hugeParagraph = response.results[$(classChosen).attr("data-value")].archetypes[0].desc;
    var smaller = hugeParagraph.split("#####");
    for (var i = 1; i < smaller.length; i++) {
        var smallerer = [];
        smallerer.push(smaller[i].split("**_"));
    }
    console.log(smallerer);
}

$(".races").on("click", function () {
    $(".nav2").empty();
    overallTerm = "races";
    $(".picka2").text("Pick a race");
    var query = "https://api.open5e.com/" + overallTerm;
    
    $.ajax({
        url: query,
        method: "GET"
    }).then(function (response) {
        for (var i = 0; i < 9; i++) {
            var raceName = $("<button>").attr("class", "raceNames nav-item").attr("data-value", i);
            raceName.text(response.results[i].name);
            $(".nav2").append(raceName);
        }
        $(".raceNames").on("click", function () {
            handleRaceInfo(response, this);
        });
    });
});

function handleRaceInfo(response, raceChosen) {

}

$(".weapons").on("click", function() {
    overallTerm = "weapons";
    var query = "https://api.open5e.com/" + overallTerm;
    
    $.ajax({
        url: query,
        method: "GET"
    }).then(function(response){
        console.log(response);
    })
});

$(".spells").on("click", function() {
    overallTerm = "spells";
    var query = "https://api.open5e.com/" + overallTerm;
    
    $.ajax({
        url: query,
        method: "GET"
    }).then(function(response){
        console.log(response);
    })
});
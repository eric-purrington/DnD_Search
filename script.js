const possibleClasses = ["Barbarian", "Bard", "Cleric", "Druid", "Fighter", "Monk", "Paladin", "Ranger", "Rogue", "Sorcerer", "Warlock", "Wizard"];

const possibleRaces = ["Dwarf", "Elf", "Halfling", "Human", "Dragonborn", "Gnome", "Half-elf", "Half-Orc", "Tiefling"];

const possibleWeaponTypes = ["Simple Melee", "Simple Ranged", "Martial Melee", "Martial Ranged"];

const query = "https://api.open5e.com/";

function createNav2() {
    var nav2 = `
    <nav class="navbar navbar-expand-lg navbar-custom">
        <i class="fab fa-d-and-d"></i>
        <span class="navbar-brand mb-0 picka2">Pick a ...</span>
        <div class="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
            <div class="navbar-nav nav2">
        
            </div>
        </div>
    </nav>`
    $(".nav2Here").append(nav2);
    $(".nav2").empty();
}

// CLASSES
$(".classes").on("click", function () {
    $(".nav2Here").empty();
    createNav2();
    $(".picka2").text("Pick a class");
    for (var i = 0; i < possibleClasses.length; i++) {
        var className = $("<button>").attr("class", "classNames nav-item").attr("data-value", i);
        className.text(possibleClasses[i]);
        $(".nav2").append(className);
    }
});
function getClassData() {
    $.ajax({
        url: query + "classes",
        method: "GET"
    }).then(function (response) {
        console.log(response);
        handleClassInfo(response, this);
    });
};
function handleClassInfo(response, classChosen) {
    var hugeParagraph = response.results[$(classChosen).attr("data-value")].archetypes[0].desc;
    var smaller = hugeParagraph.split("#####");
    for (var i = 1; i < smaller.length; i++) {
        var smallerer = [];
        smallerer.push(smaller[i].split("**_"));
    }
    console.log(smallerer);
}

// RACES
$(".races").on("click", function () {
    $(".nav2Here").empty();
    createNav2();
    $(".picka2").text("Pick a race");
    for (var i = 0; i < possibleRaces.length; i++) {
        var raceName = $("<button>").attr("class", "raceNames nav-item").attr("data-value", i);
        raceName.text(possibleRaces[i]);
        $(".nav2").append(raceName);
    }
});
function getRaceData() {
    $.ajax({
        url: query + "races",
        method: "GET"
    }).then(function (response) {
        console.log(response);
        handleRaceInfo(response, this);
    });
};
function handleRaceInfo(response, raceChosen) {

}

// WEAPONS
$(".weapons").on("click", function () {
    $(".nav2Here").empty();
    createNav2();
    $(".picka2").text("Pick a weapon type");
    $("weaponsVault").empty;
    for (var i = 0; i < possibleWeaponTypes.length; i++) {
        var weaponType = $("<button>").attr("class", "weaponTypes nav-item").attr("data-value", i);
        weaponType.text(possibleWeaponTypes[i]);
        $(".nav2").append(weaponType);
    }
});
function getWeaponData() {
    var weaponTypeChosen = $(this).attr("data-value");
    $.ajax({
        url: query + "weapons",
        method: "GET"
    }).then(function (response) {
        console.log(response);
        handleWeaponInfo(response, weaponTypeChosen);
    });
};
function handleWeaponInfo(response, weaponTypeChosen) {
    for (var i = 0; i < response.results.length; i++) {
        if (response.results[i].category == possibleWeaponTypes[weaponTypeChosen] + " Weapons") {
            var weapon = $("<h3>").text(`${response.results[i].name}: ${response.results[i].damage_dice} ${response.results[i].damage_type} damage; ${response.results[i].properties} ${response.results[i].cost}`);
            $(".weaponsVault").append(weapon);
        }
    }
}


$(document).on("click", ".classNames", getClassData);
$(document).on("click", ".raceNames", getRaceData);
$(document).on("click", ".weaponTypes", getWeaponData);





















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
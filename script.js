const possibleClasses = ["Barbarian", "Bard", "Cleric", "Druid", "Fighter", "Monk", "Paladin", "Ranger", "Rogue", "Sorcerer", "Warlock", "Wizard"];

const possibleRaces = ["Dwarf", "Elf", "Halfling", "Human", "Dragonborn", "Gnome", "Half-elf", "Half-Orc", "Tiefling"];

const possibleWeaponTypes = ["Simple Melee", "Simple Ranged", "Martial Melee", "Martial Ranged"];

const possibleSpellCasters = ["Bard", "Cleric", "Druid", "Sorcerer", "Warlock", "Wizard"];

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
    $(".weaponsVault").empty;
    $(".weaponTable").empty;
    for (var i = 0; i < possibleWeaponTypes.length; i++) {
        var weaponType = $("<button>").attr("class", "weaponTypes nav-item").attr("data-value", i);
        weaponType.text(possibleWeaponTypes[i]);
        $(".nav2").append(weaponType);
    }
});
function getWeaponData() {
    var weaponTypeChosen = $(this).attr("data-value");
    $(".weaponsVault").html("");
    $.ajax({
        url: query + "weapons",
        method: "GET"
    }).then(function (response) {
        handleWeaponInfo(response, weaponTypeChosen);
    });
};
function handleWeaponInfo(response, weaponTypeChosen) {
    var weaponTable = `
    <table class="weaponTable">
        <tr>
            <th>Name</th>
            <th>Damage</th>
            <th>Properties</th>
            <th>Cost</th>
        </tr>
    </table>`
    $(".weaponsVault").append(weaponTable);
    for (var i = 0; i < response.results.length; i++) {
        if (response.results[i].category == possibleWeaponTypes[weaponTypeChosen] + " Weapons") {
            var weapon = `
            <tr>
                <td>${response.results[i].name}</td>
                <td>${response.results[i].damage_dice} ${response.results[i].damage_type} damage</td>
                <td>${response.results[i].properties.join(", ")}</td>
                <td>${response.results[i].cost}</td>
            </tr>`;
            $(".weaponTable").append(weapon);
        }
    }
}

// Spells
$(".spells").on("click", function () {
    $(".nav2Here").empty();
    createNav2();
    $(".picka2").text("Pick a caster");
    for (var i = 0; i < possibleSpellCasters.length; i++) {
        var spellCaster = $("<button>").attr("class", "spellCasters nav-item").attr("data-value", i);
        spellCaster.text(possibleSpellCasters[i]);
        $(".nav2").append(spellCaster);
    }
});
function getSpellData() {
    var spellCasterChosen = $(this).attr("data-value");
    var query = "https://api.open5e.com/spells/?limit=321";
    $.ajax({
        url: query,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        handleSpellInfo(response, spellCasterChosen);
    });
};
function handleSpellInfo(response, spellCasterChosen) {
    for (var i = 0; i < response.results.length; i++) {
        if (response.results[i].dnd_class.indexOf(possibleSpellCasters[spellCasterChosen]) !== -1) {
            console.log(response.results[i].name);
            // ACCORDIAN
        }
        
    }
}

$(document).on("click", ".classNames", getClassData);
$(document).on("click", ".raceNames", getRaceData);
$(document).on("click", ".weaponTypes", getWeaponData);
$(document).on("click", ".spellCasters", getSpellData);
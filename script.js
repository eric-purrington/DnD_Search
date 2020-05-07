const possibleClasses = ["Barbarian", "Bard", "Cleric", "Druid", "Fighter", "Monk", "Paladin", "Ranger", "Rogue", "Sorcerer", "Warlock", "Wizard"];

const possibleRaces = ["Dwarf", "Elf", "Halfling", "Human", "Dragonborn", "Gnome", "Half-elf", "Half-Orc", "Tiefling"];

const possibleWeaponTypes = ["Simple Melee", "Simple Ranged", "Martial Melee", "Martial Ranged"];

const possibleSpellCasters = ["Bard", "Cleric", "Druid", "Sorcerer", "Warlock", "Wizard"];

const possibleSpellLevel = ["Cantrip", "1st-level", "2nd-level", "3rd-level", "4th-level", "5th-level", "6th-level", "7th-level", "8th-level", "9th-level"];

const query = "https://api.open5e.com/";

function createNav2() {
    var nav2 = `
    <nav class="navbar navbar-expand-lg navbar-custom">
        <i class="fab fa-d-and-d fa-2x"></i>
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
    $(".weaponsVault").html("");
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
    $(".weaponsVault").html("");
    for (var i = 0; i < possibleRaces.length; i++) {
        var raceName = $("<button>").attr("class", "raceNames nav-item").attr("data-value", i);
        raceName.text(possibleRaces[i]);
        $(".nav2").append(raceName);
    }
});
function getRaceData() {
    var raceChosen = $(this).attr("data-value");
    $.ajax({
        url: query + "races",
        method: "GET"
    }).then(function (response) {
        console.log(response);
        handleRaceInfo(response, raceChosen);
    });
};
function handleRaceInfo(response, raceChosen) {

}

// WEAPONS
$(".weapons").on("click", function () {
    $(".nav2Here").empty();
    createNav2();
    $(".picka2").text("Pick a weapon type");
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
    $(".weaponsVault").html("");
    for (var i = 0; i < possibleSpellCasters.length; i++) {
        var spellCaster = $("<button>").attr("class", "spellCasters nav-item").attr("data-value", i);
        spellCaster.text(possibleSpellCasters[i]);
        $(".nav2").append(spellCaster);
    }
});
function getSpellData() {
    var spellCasterChosen = $(this).attr("data-value");
    $.ajax({
        url: query + "spells/?limit=321",
        method: "GET"
    }).then(function (response) {
        console.log(response);
        handleSpellInfo(response, spellCasterChosen);
    });
};
function handleSpellInfo(response, spellCasterChosen) {
    var spellAccordian = `
    <div class="accordion" id="accordionExample">
        <div class="card">
          <div class="card-header" id="headingOne">
            <h2 class="mb-0">
              <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                Cantrips
              </button>
            </h2>
          </div>
          <div id="collapseOne" class="collapse" aria-labelledby="headingOne"  data-parent="#accordionExample">
            <div class="card-body">
                <ul class="cantripList" data-value="100">
                </ul>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header" id="headingTwo">
            <h2 class="mb-0">
              <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                1st-Level
              </button>
            </h2>
          </div>
          <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo"   data-parent="#accordionExample">
            <div class="card-body">
                <ul class="1stList" data-value="101">
                </ul>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header" id="headingThree">
            <h2 class="mb-0">
              <button class="btn btn-link collapsed" type="button" data-toggle="collapse"   data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                2nd-Level
              </button>
            </h2>
          </div>
          <div id="collapseThree" class="collapse" aria-labelledby="headingThree"   data-parent="#accordionExample">
            <div class="card-body">
                <ul class="2ndList" data-value="102">
                </ul>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header" id="headingFour">
            <h2 class="mb-0">
              <button class="btn btn-link collapsed" type="button" data-toggle="collapse"   data-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                3rd-Level
              </button>
            </h2>
          </div>
          <div id="collapseFour" class="collapse" aria-labelledby="headingFour"   data-parent="#accordionExample">
            <div class="card-body">
                <ul class="3rdList" data-value="103">
                </ul>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header" id="headingFive">
            <h2 class="mb-0">
              <button class="btn btn-link collapsed" type="button" data-toggle="collapse"   data-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                4th-Level
              </button>
            </h2>
          </div>
          <div id="collapseFive" class="collapse" aria-labelledby="headingFive"   data-parent="#accordionExample">
            <div class="card-body">
                <ul class="4thList" data-value="104">
                </ul>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header" id="headingSix">
            <h2 class="mb-0">
              <button class="btn btn-link collapsed" type="button" data-toggle="collapse"   data-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
                5th-Level
              </button>
            </h2>
          </div>
          <div id="collapseSix" class="collapse" aria-labelledby="headingSix"   data-parent="#accordionExample">
            <div class="card-body">
                <ul class="5thList" data-value="105">
                </ul>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header" id="headingSeven">
            <h2 class="mb-0">
              <button class="btn btn-link collapsed" type="button" data-toggle="collapse"   data-target="#collapseSeven" aria-expanded="false" aria-controls="collapseSeven">
                6th-Level
              </button>
            </h2>
          </div>
          <div id="collapseSeven" class="collapse" aria-labelledby="headingSeven"   data-parent="#accordionExample">
            <div class="card-body">
                <ul class="6thList" data-value="106">
                </ul>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header" id="headingEight">
            <h2 class="mb-0">
              <button class="btn btn-link collapsed" type="button" data-toggle="collapse"   data-target="#collapseEight" aria-expanded="false" aria-controls="collapseEight">
                7th-Level
              </button>
            </h2>
          </div>
          <div id="collapseEight" class="collapse" aria-labelledby="headingEight"   data-parent="#accordionExample">
            <div class="card-body">
                <ul class="7thList" data-value="107">
                </ul>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header" id="headingNine">
            <h2 class="mb-0">
              <button class="btn btn-link collapsed" type="button" data-toggle="collapse"   data-target="#collapseNine" aria-expanded="false" aria-controls="collapseNine">
                8th-Level
              </button>
            </h2>
          </div>
          <div id="collapseNine" class="collapse" aria-labelledby="headingNine"   data-parent="#accordionExample">
            <div class="card-body">
                <ul class="8thList" data-value="108">
                </ul>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header" id="headingTen">
            <h2 class="mb-0">
              <button class="btn btn-link collapsed" type="button" data-toggle="collapse"   data-target="#collapseTen" aria-expanded="false" aria-controls="collapseTen">
                9th-Level
              </button>
            </h2>
          </div>
          <div id="collapseTen" class="collapse" aria-labelledby="headingTen"   data-parent="#accordionExample">
            <div class="card-body">
                <ul class="9thList" data-value="109">
                </ul>
            </div>
          </div>
        </div>
    </div>`
    $(".spellSack").append(spellAccordian);
    for (var i = 0; i < response.results.length; i++) {
        if (response.results[i].dnd_class.indexOf(possibleSpellCasters[spellCasterChosen]) !== -1) {
            for (var j = 0; j < possibleSpellLevel.length; j++) {
                if (response.results[i].level == possibleSpellLevel[j]) {
                    var newLi = $("<li>").text(response.results[i].name);
                    $(`[data-value='${j + 100}']`).append(newLi);
                }
            }
        }
    }
}

$(document).on("click", ".classNames", getClassData);
$(document).on("click", ".raceNames", getRaceData);
$(document).on("click", ".weaponTypes", getWeaponData);
$(document).on("click", ".spellCasters", getSpellData);
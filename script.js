const possibleClasses = ["Barbarian", "Bard", "Cleric", "Druid", "Fighter", "Monk", "Paladin", "Ranger", "Rogue", "Sorcerer", "Warlock", "Wizard"];

const possibleRaces = ["Dwarf", "Elf", "Halfling", "Human", "Dragonborn", "Gnome", "Half-elf", "Half-Orc", "Tiefling"];

const possibleWeaponTypes = ["Simple Melee", "Simple Ranged", "Martial Melee", "Martial Ranged"];

const possibleSpellCasters = ["Bard", "Cleric", "Druid", "Sorcerer", "Warlock", "Wizard"];

const possibleSpellLevel = ["Cantrip", "1st-level", "2nd-level", "3rd-level", "4th-level", "5th-level", "6th-level", "7th-level", "8th-level", "9th-level"];

const query = "https://api.open5e.com/";

function createNav2() {
  var nav2 = `
    <nav class="navbar navbar-expand-sm navbar-custom">
      <i class="fab fa-d-and-d fa-2x"></i>
      <span class="navbar-brand mb-0 h1 picka2">Pick a ...</span>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"><i class="fas fa-dice-d20 fa"></i></span>
      </button>
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
}
function makeSpellNav(spellCasterChosen) {
  var spellLevelNav = `
    <div class = "spellLevelNav">
      <h3>${possibleSpellCasters[spellCasterChosen]} Spells</h3>
      <ul class="spellNavList">
      </ul>
    </div>`

  $(".navCol").append(spellLevelNav);

  for (var i = 0; i < possibleSpellLevel.length; i++) {
    if (i === 0) {
      var spellNavLi = `<li><a href="#${possibleSpellLevel[i]}s">${possibleSpellLevel[i]}s</a></li>`
    } else {
      var spellNavLi = `<li><a href="#${possibleSpellLevel[i]}">${possibleSpellLevel[i]}</a></li>`
    }
    $(".spellNavList").append(spellNavLi);
  }
}
function makeSpellList(spellCasterChosen) {
  var spellLevelList = `<h1>${possibleSpellCasters[spellCasterChosen]} Spells</h1>`

  $(".listCol").append(spellLevelList);

  for (var i = 0; i < possibleSpellLevel.length; i++) {
    if (i === 0) {
      var spellLevelandUl = `
      <a name="${possibleSpellLevel[i]}s"></a>
      <h2>${possibleSpellLevel[i]}s</h2>
      <ul class="${possibleSpellLevel[i]}">
      </ul>`
    } else {
      var spellLevelandUl = `
      <a name="${possibleSpellLevel[i]}"></a>
      <h2>${possibleSpellLevel[i]}</h2>
      <ul class="${possibleSpellLevel[i]}">
      </ul>`
    }
    $(".listCol").append(spellLevelandUl);
  }
}
function handleSpellInfo(response, spellCasterChosen) {
  makeSpellNav(spellCasterChosen);
  makeSpellList(spellCasterChosen);
  for (var i = 0; i < response.results.length; i++) {
    if (response.results[i].dnd_class.indexOf(possibleSpellCasters[spellCasterChosen]) !== -1) {
      for (var j = 0; j < possibleSpellLevel.length; j++) {
        if (response.results[i].level == possibleSpellLevel[j]) {
          var newLi = `
          <li>
            <div class="accordion" id="accordionExample">
              <button class="btn btn-link collapsed spellBtn" type="button" data-toggle="collapse" data-target="#${response.results[i].name.replace(/[ '-/]/g,"")}" aria-expanded="false" aria-controls="${response.results[i].name.replace(/[ '-/]/g,"")}">
              ${response.results[i].name}
              </button>
              <div id="${response.results[i].name.replace(/[ '-/]/g,"")}" class="collapse" data-parent="#accordionExample">
                <p><strong>Casting Time</strong>: ${response.results[i].casting_time}</p>
                <p><strong>Range</strong>: ${response.results[i].range}</p>
                <p><strong>Components</strong>: ${response.results[i].components}</p>
                <p><strong>Duration</strong>: ${response.results[i].duration}</p>
                <p>${response.results[i].desc} ${response.results[i].higher_level}</p>

              </div>
            </div>
          </li>`
          $(`[class='${possibleSpellLevel[j]}']`).append(newLi);
        }
      }
    }
  }
}


$(window).bind("scroll", function () {
  if ($(window).scrollTop() >= $(".spellSack").offset().top) {
    $(".spellLevelNav").addClass("sticky")
  } else {
    $(".spellLevelNav").removeClass("sticky");
  }
});

$(document).on("click", ".classNames", getClassData);
$(document).on("click", ".raceNames", getRaceData);
$(document).on("click", ".weaponTypes", getWeaponData);
$(document).on("click", ".spellCasters", getSpellData);
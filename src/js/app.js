"use script";
// ---------------------
// Drag and drop 
// ---------------------
// Attach drag/drop listeners to pitch players
var pitchPlayers = document.querySelectorAll('.pitch__player');
for (var _i = 0, pitchPlayers_1 = pitchPlayers; _i < pitchPlayers_1.length; _i++) {
    var pitchPlayer = pitchPlayers_1[_i];
    pitchPlayer.addEventListener('dragover', dragOverHandler);
    pitchPlayer.addEventListener('dragenter', dragEnterHandler);
    pitchPlayer.addEventListener('dragleave', dragLeaveHandler);
    pitchPlayer.addEventListener('drop', dropHandler);
}
// RENDER PLAYERS SIDEBAR LIST FROM JSON
var playerEl = document.querySelector('.controls__players');
fetch('json/players.json')
    .then(function (response) { return response.json(); }) // converts JSON from string to array
    .then(function (data) {
    var playersArr = data.players; // Sort players array into positions
    playersArr.sort(function (a, b) {
        return a.positionKey - b.positionKey;
    });
    for (var _i = 0, playersArr_1 = playersArr; _i < playersArr_1.length; _i++) {
        player = playersArr_1[_i];
        var shirtNumber = player.shirtNumber;
        var playerName = player.name;
        var position = player.position.toLowerCase();
        var positionKey = player.positionKey;
        playerEl.innerHTML +=
            "<div class=\"controls__player ".concat(position, "\" id=\"shirt-").concat(shirtNumber, "\" draggable=\"true\" >\n               <img class=\"player-shirt\" src=\"images/pool-shirt.svg\" alt=\"Blackpool FC shirt\">\n               <p class=\"player-name\" positionkey=\"").concat(positionKey, "\" squadno=").concat(shirtNumber, "> ").concat(playerName, "</p>\n               <span class=\"player-squad-no\">").concat(shirtNumber, "</span>\n               <span class=\"player-position\">- ").concat(position, "</span>\n            </div>");
    }
    console.log(typeof (player));
})
    .then(function () {
    var players = document.querySelectorAll('.controls__player');
    for (var _i = 0, players_1 = players; _i < players_1.length; _i++) {
        var player = players_1[_i];
        player.addEventListener('dragstart', dragStartHandler);
        player.addEventListener('dragend', dragEndHandler);
    }
})
    .then(function () {
    var firstGK = document.querySelector('.controls__players .goalkeeper');
    var firstDF = document.querySelector('.controls__players .defender');
    var firstMF = document.querySelector('.controls__players .midfield');
    var firstFW = document.querySelector('.controls__players .forward');
    firstGK.insertAdjacentHTML('beforebegin', '<div class="position-label">Goalkeepers</div>');
    firstDF.insertAdjacentHTML('beforebegin', '<div class="position-label">Defenders</div>');
    firstMF.insertAdjacentHTML('beforebegin', '<div class="position-label">Midfielders</div>');
    firstFW.insertAdjacentHTML('beforebegin', '<div class="position-label">Forwards</div>');
});
function dragStartHandler(e) {
    var _this = this;
    e.dataTransfer.setData('text', e.target.innerHTML); // Set data payload to transfer
    this.classList.toggle('hold');
    setTimeout(function () { return _this.classList.toggle('hide'); }, 2);
    console.log('drag start fired');
}
function dragEndHandler() {
    this.classList.toggle('hold');
    this.classList.toggle('hide');
    console.log('drag end fired');
}
function dropHandler(e) {
    e.preventDefault();
    var playerData = e.dataTransfer.getData('text'); // Store dragged player data payload
    var playerHTML = new DOMParser().parseFromString(playerData, "text/html"); // Convert string to DOM element
    // STOP DUPLICATED PLAYERS BEING ALLOW ONTO THE PITCH
    // 1. Get squad numbers of all current players on the pitch into an array
    var playersOnPitch = document.querySelectorAll('.pitch__player.active');
    var playersPitchArr = [];
    for (var _i = 0, _a = playersOnPitch.entries(); _i < _a.length; _i++) {
        var _b = _a[_i], index = _b[0], player = _b[1];
        var current = player.querySelector('p').getAttribute('squadno');
        playersPitchArr.push(current);
    }
    // 2. Get the squad ID of the player being dropped
    var playerDroppedSquadID = playerHTML.querySelector('.player-squad-no').textContent;
    // 3. Compare the Squad ID of dropped player with all those in the current players on the pitch array
    var isPLayerDuplicated = false;
    for (var _c = 0, playersPitchArr_1 = playersPitchArr; _c < playersPitchArr_1.length; _c++) {
        player = playersPitchArr_1[_c];
        if (player === playerDroppedSquadID) { // 4. If the  plyaer ID is already on pitch, show an error modal and refuse the action
            isPLayerDuplicated = true;
            alert('This player is already on the pitch, you cannot add him again.');
            this.classList.remove('over');
            break;
        }
    }
    if (isPLayerDuplicated === false) {
        var isGoalkeeper = playerHTML.body.children[1].getAttribute("positionkey"); // Grab the postion to use in GK test
        if (isGoalkeeper == '1') { // If goalie, replace with GK shirt
            var gk = playerData.replace('images/pool-shirt.svg', 'images/pool-shirt-gk.svg');
            this.innerHTML = gk;
        }
        else {
            this.innerHTML = playerData;
        }
        this.classList.remove('over');
        this.classList.add('active');
    }
}
function dragOverHandler(e) {
    e.preventDefault();
    this.classList.add('over');
}
function dragEnterHandler(e) {
    e.preventDefault();
}
function dragLeaveHandler() {
    this.classList.remove('over');
}
// ---------------------
// Formation changer
// ---------------------
var teamGrid = document.querySelector('#pitch__team-grid');
var formations = document.querySelectorAll('.controls__formation-btns button');
var formationLabel = document.querySelector('.formation-label');
for (var _a = 0, formations_1 = formations; _a < formations_1.length; _a++) {
    var formation = formations_1[_a];
    formation.addEventListener('click', function () {
        // Get the formation class from the button
        var btnFormation = this.classList.value;
        // Change pitch__team-grid based on the formation class within the button
        if (btnFormation == 442) {
            teamGrid.className = "";
            teamGrid.classList.add('formation-442');
            formationLabel.textContent = '4-4-2';
        }
        if (btnFormation == 433) {
            teamGrid.className = "";
            teamGrid.classList.add('formation-433');
            formationLabel.textContent = '4-3-3';
        }
        if (btnFormation == 532) {
            teamGrid.className = "";
            teamGrid.classList.add('formation-532');
            formationLabel.textContent = '5-3-2';
        }
        if (btnFormation == 352) {
            teamGrid.className = "";
            teamGrid.classList.add('formation-352');
            formationLabel.textContent = '3-5-2';
        }
        if (btnFormation == 4231) {
            teamGrid.className = "";
            teamGrid.classList.add('formation-4231');
            formationLabel.textContent = '4-2-3-1';
        }
    });
}

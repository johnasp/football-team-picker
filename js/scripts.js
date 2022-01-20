// ---------------------
// Bring in the players JSON // https://www.youtube.com/watch?v=C3dfjyft_m4 
// ---------------------
function renderPlayers() {
   const playersEl = document.querySelector('.controls__players')
   fetch('players.json')
      .then(response => response.json()) // converts JSON from string to array
      .then(data => {
         for (let i = 0; i < data.players.length; i++ ) {
            const shirtNumber = data.players[i].shirtNumber
            const playerName = data.players[i].name
            playersEl.innerHTML += `<p class="controls__player" id="shirt-${shirtNumber}" draggable="true" ondragstart="dragPlayer(event)"><span>${shirtNumber}</span> ${playerName}</p>`
         }
      })    
}
renderPlayers()

// ----------------------------
// Create node list of players
// ----------------------------
//const playerItems = document.querySelectorAll('.controls__players')
//playerItems.forEach(item => {
  // item.addEventListener('click', (e) => {
    //  console.log(e.path[0].textContent)
   //})
//})

// ---------------------
// Drag and drop player 
// ---------------------

//overrides default behviour of the dragEvent not dropable
function allowPlayerDrop(ev) { 
   ev.preventDefault();
 }

 // Sets the data to transfer on drag (https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer)
 function dragPlayer(ev) {
   ev.dataTransfer.setData("text/plain", ev.target.textContent)
}

// Transfer player data from list to shirt
function dropPlayer(ev) {
   ev.preventDefault();
   let playerData = ev.dataTransfer.getData("text");
   playerData = playerData.replace(/[0-9]/g, ''); //strip out the number from the string
   let playerLabel = ev.path[2].childNodes[3]
   playerLabel.textContent = playerData
 }

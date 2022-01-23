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

// ---------------------
// Drag and drop  
// ---------------------
/* 
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
 */

 // ---------------------
// Drag and drop 2.0 
// ---------------------

// Grab references to all items in players list and attach drag event listeners to each item

const btn = document.querySelector('.bollox')
btn.addEventListener('click', function(){
   console.log(document.querySelector('.controls__player'))
})

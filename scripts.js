// ---------------------
// Bring in the players JSON // https://www.youtube.com/watch?v=C3dfjyft_m4 
// ---------------------
function renderPlayers() {
   const playersEl = document.querySelector('.controls__players')
   fetch('players.json')
      .then(response => response.json()) // converts JSON from string to array
      .then(data => {
         for (let i = 0; i < data.players.length; i++ ) {
            //console.log (data)
            const playerName = data.players[i].name
            const shirtNumber = data.players[i].shirtNumber
            const player = shirtNumber + " - " + playerName
            playersEl.innerHTML += `<a class="controls__player" id="shirt-${shirtNumber}" draggable="true" ondragstart="dragPlayer(event)">${player}</a>`
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
 // Sets the data to transfer on drag
 function dragPlayer(ev) {
   ev.dataTransfer.setData("text", ev.target.textContent)
}

//overrides default behviour of the dragEvent not dropable
function allowPlayerDrop(ev) { 
   ev.preventDefault();
 }


// Drop the player onto the shirt
function dropPlayer(ev) {
   ev.preventDefault();
   let playerData = ev.dataTransfer.getData("text");
   let playerLabel = ev.path[2].childNodes[3]
   playerLabel.textContent = playerData
 }

// Listen for click events on the player label
//let playerLabels = document.querySelectorAll('.pitch__player-label')
//for (let i = 0; i < playerLabels.length; i++ ) {
 //  playerLabels[i].addEventListener('click', function(){
   //   playerLabels[i].textContent = i + "John"
     // console.log(i)
  // })
//}


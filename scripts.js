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
const playerItems = document.querySelectorAll('.controls__players')

playerItems.forEach(item => {
   item.addEventListener('click', (e) => {
      console.log(e.path[0].textContent)
   })
})

// ---------------------
// Drag and drop player 
// ---------------------


//overrides default behviour of the dragEvent not dropable
function allowPlayerDrop(ev) { 
   ev.preventDefault();
 }
 
 // Sets the data to transfer on drag
function dragPlayer(ev) {
   console.log(ev)
   ev.dataTransfer.setData("text", ev.target.textContent)
}

// Stuff to do on drop
function dropPlayer(ev) {
   ev.preventDefault();
   let data = ev.dataTransfer.getData("text");
   console.log(data)
 }



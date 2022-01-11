// https://www.youtube.com/watch?v=C3dfjyft_m4 


// ---------------------
// Bring in the players JSON
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
// ---------------------
// Drag and drop player
// ---------------------

//overrides default behviour of the dragEvent which does not allow data/elements to be dragged onto another element
function allowPlayerDrop(ev) { 
   ev.preventDefault();
 }
 
 // Sets the data to transfer on drag
function dragPlayer(ev) {
   console.log(ev)
   ev.dataTransfer.setData("text", ev.target.id)
}

function dropPlayer(ev) {
   ev.preventDefault();
   var data = ev.dataTransfer.getData("text");
   ev.target.appendChild(document.getElementById(data));
 }


// Create node list of players
const playerItems = document.querySelectorAll('.controls__players')

playerItems.forEach(item => {
   item.addEventListener('click', (e) => {
      console.log(e.path[0].textContent)
   })
})

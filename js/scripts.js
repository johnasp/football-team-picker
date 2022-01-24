// ---------------------
// Bring in the players JSON // https://www.youtube.com/watch?v=C3dfjyft_m4 
// ---------------------
let playerList1 

function renderPlayers() {
   const playersEl = document.querySelector('.controls__players')
   fetch('players.json')
      .then(response => response.json()) // converts JSON from string to array
      .then(data => {
         for (let i = 0; i < data.players.length; i++ ) {
            const shirtNumber = data.players[i].shirtNumber
            const playerName = data.players[i].name
            playersEl.innerHTML += 
               `<p class="controls__player" id="shirt-${shirtNumber}" draggable="true" >
                  <span class="squad-number">${shirtNumber}</span>
                  <span class="squad-name"> ${playerName}</span>
               </p>`
         }
      })    
}
renderPlayers()


let playerz = null
function addDragListeners() {
   const singlePlayer = document.querySelectorAll('.controls__player')
   for (i = 0; i < singlePlayer.length; i++) {
      let playerz = (singlePlayer[i])
      playerz.addEventListener('dragstart', function(){
         console.log(playerz.innerHTML)
      })
      playerz.addEventListener('dragend', function(){
         //alert(playerz.innerHTML)
         console.log('drag has ended')
      })
   }
}

setTimeout(addDragListeners, 500)


 // ---------------------
// Drag and drop 2.0 
// ---------------------

const btn = document.querySelector('.bollox')
btn.addEventListener('click', function(){
   const playerList = document.querySelectorAll('.controls__player')
   for ( i=0; i < playerList.length; i++ ) { 
      console.log( playerList[i])
   }
})


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


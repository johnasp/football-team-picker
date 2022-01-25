// ---------------------
// Bring in the players JSON 
// https://www.youtube.com/watch?v=C3dfjyft_m4 
// ---------------------
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

// ---------------------
// Drag and drop 2.0 
// ---------------------

// Drag listeners

function addDragListeners() {
   const singlePlayer = document.querySelectorAll('.controls__player')
   for (i = 0; i < singlePlayer.length; i++) {
      let playerz = (singlePlayer[i])
      playerz.addEventListener('dragstart', function() {
         this.classList.add('hold')
         console.log(this.innerHTML)
      })
      playerz.addEventListener('dragend', function() {
         this.classList.remove('hold')
      })
   }
}
setTimeout(addDragListeners, 500) //Needed to allow DOM to paint list or will return null

// Loop through pitch players and attch drag listeners to pitch player
const pitchPlayers = document.querySelectorAll('.pitch__player-shirt')
for (const pitchPlayer of pitchPlayers ) {
   pitchPlayer.addEventListener('dragover', dragOver)
   pitchPlayer.addEventListener('dragenter', dragEnter)
   pitchPlayer.addEventListener('dragleave', dragLeave)
   pitchPlayer.addEventListener('drop', dragDrop)
}

// Drag functions
function dragOver(e) {
   e.preventDefault()
   console.log('over')
}

function dragEnter() {
  console.log('enter')
}

function dragLeave() {
   console.log('leave')
}

function dragDrop() {
   //console.log(e);
   alert('dropped')

}


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


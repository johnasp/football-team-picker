// ---------------------
// Drag and drop 
// ---------------------
// https://www.youtube.com/watch?v=C3dfjyft_m4 

// ATTACH DRAG EVENT LISTENERS TO PITCH PLAYERS
const pitchPlayers = document.querySelectorAll('.pitch__player-shirt')
for (const pitchPlayer of pitchPlayers ) {
   pitchPlayer.addEventListener('dragover', dragOverHandler)
   pitchPlayer.addEventListener('dragenter', dragEnterHandler)
   pitchPlayer.addEventListener('dragleave', dragLeaveHandler)
   pitchPlayer.addEventListener('drop', dropHandler)
}

// RENDER THE PLAYERS LIST FROM THE JSON

const playerEl = document.querySelector('.controls__players')
fetch('players.json')
   .then(response => response.json()) // converts JSON from string to array
   .then(data => { // Print out player names
      for (let i = 0; i < data.players.length; i++ ) {
         const shirtNumber = data.players[i].shirtNumber
         const playerName = data.players[i].name
         playerEl.innerHTML += 
            `<p class="controls__player" id="shirt-${shirtNumber}" draggable="true" >
               <span class="squad-number">${shirtNumber}</span>
               <span class="squad-name"> ${playerName}</span>
            </p>`
      }
   })  
   .then(function(){   // List player handlers
      const players = document.querySelectorAll('.controls__player')
      for (i = 0; i < players.length; i++) {
         players[i].addEventListener('dragstart', dragStartHandler)
      }
   })  
  
function dragStartHandler(e){
   console.log(this)
   e.dataTransfer.setData('text/html', this.innerHTML)
   
}

function dropHandler(e) {
   e.stopPropagation(); // stops the browser from redirecting.
   console.log('DROPPED') 
   const john = e.dataTransfer.getData('text/html')
   console.log(john)
   console.log(this)
}

function dragOverHandler(e) {
   e.preventDefault()
   //console.log('over')
}

function dragEnterHandler(e) {
   e.preventDefault()
   //console.log('enter')
}

function dragLeaveHandler() {
   //console.log('leave')
}



// ---------------------
// Drag and drop  
// ---------------------
/* 
//overrides default behviour of the dragEvent not dropable
function allowPlayerDrop(ev) { 
   ev.preventDefault();
 }

 Sets the data to transfer on drag (https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer)
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


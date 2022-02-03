// ---------------------
// Drag and drop 
// ---------------------
// https://www.youtube.com/watch?v=C3dfjyft_m4 

// Attach drag/drop listeners to pitch players
const pitchPlayers = document.querySelectorAll('.pitch__player')
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
            `<div class="controls__player" id="shirt-${shirtNumber}" draggable="true" >
               <img src="images/pool-shirt.svg" alt="Blackpool FC shirt">
               <p class="squad-number">${shirtNumber}</p>
               <p class="squad-name"> ${playerName}</p>
            </div>`
      }
   })  
   .then(function(){   // Attach drag handlers to players list
      const players = document.querySelectorAll('.controls__player')
      for (i = 0; i < players.length; i++) {
         players[i].addEventListener('dragstart', dragStartHandler)
      }
   })  
  
function dragStartHandler(e){
   e.dataTransfer.setData('text', e.target.innerHTML)
}

function dropHandler(e) {
   e.preventDefault()
   const data = e.dataTransfer.getData('text')
   this.classList.remove('over')
   this.classList.add('active')
   this.innerHTML = data

}

function dragOverHandler(e) {
   e.preventDefault()
   this.classList.add('over')
}
function dragEnterHandler(e) {
   e.preventDefault()
   //this.classList.add('over')
}
function dragLeaveHandler() {
   this.classList.remove('over')
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


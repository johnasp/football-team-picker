"use script"

// ---------------------
// Drag and drop 
// ---------------------

// Attach drag/drop listeners to pitch players
const pitchPlayers = document.querySelectorAll('.pitch__player')
for (const pitchPlayer of pitchPlayers ) {
   pitchPlayer.addEventListener('dragover', dragOverHandler)
   pitchPlayer.addEventListener('dragenter', dragEnterHandler)
   pitchPlayer.addEventListener('dragleave', dragLeaveHandler)
   pitchPlayer.addEventListener('drop', dropHandler)
}

// Render the players list
const playerEl = document.querySelector('.controls__players')
fetch('players.json')
   .then(response => response.json()) // converts JSON from string to array
   .then(data => { 
      const playersArr = data.players // Sort players array into positions
      playersArr.sort((a, b) => {
         return a.positionKey - b.positionKey
     })
   for (let i = 0; i < playersArr.length; i++ ) {
      const shirtNumber = playersArr[i].shirtNumber
      const playerName = playersArr[i].name
      const position = playersArr[i].position.toLowerCase()
      const positionKey = playersArr[i].positionKey
      playerEl.innerHTML += 
         `<div class="controls__player ${position}" id="shirt-${shirtNumber}" draggable="true" >
            <img class="player-shirt" src="images/pool-shirt.svg" alt="Blackpool FC shirt">
            <p class="player-name" positionkey="${positionKey}"> ${playerName}</p>
            <span class="player-squad-no">${shirtNumber}</span>
            <span class="player-position">- ${position}</span>
         </div>`
   }
   })  
   .then(function(){   // Attach drag handlers to players list
      const players = document.querySelectorAll('.controls__player')
      for (let i = 0; i < players.length; i++) {
         players[i].addEventListener('dragstart', dragStartHandler)
      }
   })  
  
function dragStartHandler(e){
   e.dataTransfer.setData('text', e.target.innerHTML) // Set data payload to transfer
}

function dropHandler(e) {
   e.preventDefault()
   const playerData = e.dataTransfer.getData('text') // Store dragged player data payload
   const playerHTML = new DOMParser().parseFromString(playerData, "text/html")  // Convert string to DOM element
   const positionCode = playerHTML.body.children[1].getAttribute("positionkey") 
   if ( positionCode == '1') { // If goalie, replace with GK shirt
      const gk = playerData.replace('images/pool-shirt.svg','images/pool-shirt-gk.svg')
      this.innerHTML = gk
   }  
   else {
      this.innerHTML = playerData
   }
   this.classList.remove('over')
   this.classList.add('active')
}

function dragOverHandler(e) {
   e.preventDefault()
   this.classList.add('over')
}

function dragEnterHandler(e) {
   e.preventDefault()
}

function dragLeaveHandler() {
   this.classList.remove('over')
}

// ---------------------
// Add postion labels to sidebar
// ----------------------

function createPositionLabels() {
   const positions = ['goalkeeper', 'defender', 'midfield', 'forward']
   for (const position of positions) {
      let labelEl = document.createElement('div')
      let labelText = document.createTextNode(position);
      labelEl.appendChild(labelText);
      labelEl.classList.add(position)
      console.log(labelEl)
   }
}
setTimeout(createPositionLabels, 1000)

// ---------------------
// Formation changer
// ---------------------

const teamGrid = document.querySelector('#pitch__team-grid')
const formations = document.querySelectorAll('.controls__formation-btns button')
const formationLabel = document.querySelector('.formation-label')

for (let i = 0; i < formations.length; i++) {
   formations[i].addEventListener('click', function(){
      // Get the formation class from the button
      let btnFormation = this.classList.value
      // Change pitch__team-grid based on the formation class within the button
      if (btnFormation == 442) {
         teamGrid.className = ""
         teamGrid.classList.add('formation-442')
         formationLabel.textContent = '4-4-2'
      } 
      if (btnFormation == 433) {
         teamGrid.className = ""
         teamGrid.classList.add('formation-433')
         formationLabel.textContent = '4-3-3'
      } 
      if (btnFormation == 532) {
         teamGrid.className = ""
         teamGrid.classList.add('formation-532')
         formationLabel.textContent = '5-3-2'
      } 
      if (btnFormation == 352) {
         teamGrid.className = ""
         teamGrid.classList.add('formation-352')
         formationLabel.textContent = '3-5-2'
      } 
      if (btnFormation == 4231) {
         teamGrid.className = ""
         teamGrid.classList.add('formation-4231')
         formationLabel.textContent = '4-2-3-1'
      } 
   })
}




// STOP DUPLICATED PLAYERS BEING ALLOW ONTO THE PITCH

// Check the player being dragged and store this in a variable

// Check to see if the player is already on the pitch

// If he is isnt on the pitch, allow the drop

// If he IS already on the pitch, block the drop/do not allow it AND popup an error message






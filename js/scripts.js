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

// RENDER PLAYERS SIDEBAR LIST FROM JSON
const playerEl = document.querySelector('.controls__players')
fetch('players.json')
   .then(response => response.json()) // converts JSON from string to array
   .then(data => { 
      const playersArr = data.players // Sort players array into positions
      playersArr.sort((a, b) => {
         return a.positionKey - b.positionKey
     })
      for (player of playersArr) {
         const shirtNumber = player.shirtNumber
         const playerName = player.name
         const position = player.position.toLowerCase()
         const positionKey = player.positionKey
         playerEl.innerHTML += 
            `<div class="controls__player ${position}" id="shirt-${shirtNumber}" draggable="true" >
               <img class="player-shirt" src="images/pool-shirt.svg" alt="Blackpool FC shirt">
               <p class="player-name" positionkey="${positionKey}" squadno=${shirtNumber}> ${playerName}</p>
               <span class="player-squad-no">${shirtNumber}</span>
               <span class="player-position">- ${position}</span>
            </div>`
      }
   })  
   .then(function(){   // Attach drag handlers to players list
      const players = document.querySelectorAll('.controls__player')
      for (const player of players) {
         player.addEventListener('dragstart', dragStartHandler)
      }
   })  
   .then(function(){   // Attach position labels above first position
      const firstGK = document.querySelector('.controls__players .goalkeeper')
      const firstDF = document.querySelector('.controls__players .defender')
      const firstMF = document.querySelector('.controls__players .midfield')
      const firstFW = document.querySelector('.controls__players .forward')
      firstGK.insertAdjacentHTML('beforebegin', '<div class="position-label">Goalkeepers</div>')
      firstDF.insertAdjacentHTML('beforebegin', '<div class="position-label">Defenders</div>')
      firstMF.insertAdjacentHTML('beforebegin', '<div class="position-label">Midfielders</div>')
      firstFW.insertAdjacentHTML('beforebegin', '<div class="position-label">Forwards</div>')
   })  
  
function dragStartHandler(e){
   e.dataTransfer.setData('text', e.target.innerHTML) // Set data payload to transfer
}

function dropHandler(e) {  // Actioms to perform when a shirt is dropped
   e.preventDefault()
   const playerData = e.dataTransfer.getData('text') // Store dragged player data payload
   const playerHTML = new DOMParser().parseFromString(playerData, "text/html")  // Convert string to DOM element
   console.clear()

   // STOP DUPLICATED PLAYERS BEING ALLOW ONTO THE PITCH
   // 1. Get squad numbers of all current players on the pitch, to be used in test
   const playersOnPitch = document.querySelectorAll('.pitch__player.active')
   for (const player of playersOnPitch) {
      let current = player.querySelector('p')
      console.log(current.getAttribute('squadno'))
   }

   // 2. Get the squad ID of the player being dropped
    //console.log(this.querySelector('p').getAttribute('squadno'))

   // 3. Compare the Squad ID of dropped player with all those in the current team array

   // 4. If the ID is matched, show an error modal and refuse the action
   
   // 5. Otherwise allow the drop to happens


   const isGoalkeeper = playerHTML.body.children[1].getAttribute("positionkey")  // Grab the postion to use in GK test
   if ( isGoalkeeper == '1') { // If goalie, replace with GK shirt
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
// Formation changer
// ---------------------

const teamGrid = document.querySelector('#pitch__team-grid')
const formations = document.querySelectorAll('.controls__formation-btns button')
const formationLabel = document.querySelector('.formation-label')

for (const formation of formations) {
   formation.addEventListener('click', function(){
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








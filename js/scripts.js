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
   .then(data => { // Print out player names
      for (let i = 0; i < data.players.length; i++ ) {
         const shirtNumber = data.players[i].shirtNumber
         const playerName = data.players[i].name
         const position = data.players[i].position
         playerEl.innerHTML += 
            `<div class="controls__player" id="shirt-${shirtNumber}" draggable="true" >
               <img src="images/pool-shirt.svg" alt="Blackpool FC shirt">
               <p class="squad-number">${shirtNumber}</p>
               <p class="squad-name"> ${playerName}</p>
               <p class="squad-position"> ${position}</p>
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
   e.dataTransfer.setData('text', e.target.innerHTML) // Set data payload to transfer
}

function dropHandler(e) {
   e.preventDefault()
   const data = e.dataTransfer.getData('text') // Get data payload
   const htmlString = data    //convert string data to array for GK test and strip
   let playerHTML = new DOMParser().parseFromString(htmlString, "text/html")
   playerHTML = playerHTML.body.children
   let playerArr = Array.from(playerHTML)
   let playerPosition = playerArr[3].innerHTML
   playerPosition = playerPosition.trim() // Removing whitespace from string which was causing if comporison test to fail
   if ( playerPosition == 'Goalkeeper') {
      this.classList.add('goalie-on')
      playerArr.shift() 
      let strPlayer = 
      `
         <img src="images/pool-shirt-gk.svg" class="goalie-shirt" alt="Blackpool FC goalkeeper shirt">
      `
      for (let i=0; i < playerArr.length; i++) {
         strPlayer += playerArr[i].outerHTML
      }
      console.log(strPlayer)
      this.innerHTML = strPlayer
   }  
   else {
      this.innerHTML = data
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

// PITCH FORMATION CHANGER 
const teamGrid = document.querySelector('#pitch__team-grid')
const formations = document.querySelectorAll('.controls__formation-btns button')

for (let i = 0; i < formations.length; i++) {
   formations[i].addEventListener('click', function(){
      // Get the formation class from the button
      let btnFormation = this.classList.value
      // Change pitch__team-grid based on the formation class within the button
      if (btnFormation == 442) {
         teamGrid.className = ""
         teamGrid.classList.add('formation-442')
      } 
      if (btnFormation == 433) {
         teamGrid.className = ""
         teamGrid.classList.add('formation-433')
      } 
      if (btnFormation == 532) {
         teamGrid.className = ""
         teamGrid.classList.add('formation-532')
      } 

   })
}




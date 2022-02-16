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
         return a.positionKey - b.positionKey;
     });

     playersArr.forEach((e) => {
      console.log(`$ ${e.position}`);
  });
     

      for (let i = 0; i < playersArr.length; i++ ) {
         const shirtNumber = playersArr[i].shirtNumber
         const playerName = playersArr[i].name
         const position = playersArr[i].position
         playerEl.innerHTML += 
            `<div class="controls__player" id="shirt-${shirtNumber}" draggable="true" >
               <img src="images/pool-shirt.svg" alt="Blackpool FC shirt">
               <p class="squad-number">${shirtNumber}</p>
               <p class="squad-name"> ${playerName}</p>
               <p class="squad-position"> ${position}</p>
            </div>`
      }

      console.log(playersArr)
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






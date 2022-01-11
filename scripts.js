// https://www.youtube.com/watch?v=C3dfjyft_m4 

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
            playersEl.innerHTML += `<a class='controls__player'>${player}</a>`
         }
      })    
}
renderPlayers()

// Create node list of players
const playerItems = document.querySelectorAll('.controls__players')

playerItems.forEach(item => {
   item.addEventListener('click', () => {
      console.log('clicked')
   })
})

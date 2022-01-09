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

let playerItemEl = document.querySelector('.controls__player')
playerItemEl.addEventListener('click', function() {
   console.log('test')
})
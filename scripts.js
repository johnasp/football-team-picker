// https://www.youtube.com/watch?v=C3dfjyft_m4 

const playersEl = document.querySelector('.players')
fetch('players.json')
   .then(response => response.json()) // converts JSON from string to array
   .then(data => {
      console.log(data.players)
      

   })
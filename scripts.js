// LIST PLAYERS JSON DOWN THE SIDEBAR

// 1. Get reference to players ELement
let playerEl = document.querySelector('.players') 

// 2. Create request object
const request = new XMLHttpRequest()

// 3. Check for when the data file has been successfully delivered i.e. 'the ready stats is code 4' 
request.addEventListener('readystatechange', function() {
   if (request.readyState === 4 && request.status === 200) { // checking status codes for successful data transfer
      console.log(`The readyState is ${request.readyState} and statusCode is ${request.status}`)
   } else {
      console.log(`The readyState is ${request.readyState} and statusCode is ${request.status}`)
   }
})

// 3. Use open method of request object, (passing in GET and file name as parameters) and then send the request
request.open('GET', 'players.json')
request.send()

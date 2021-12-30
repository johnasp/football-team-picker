// LIST PLAYERS JSON DOWN THE SIDEBAR

// 1. Get reference to players ELement
let playerEl = document.querySelector('.players') 

// 2. Create request object
const request = new XMLHttpRequest()

// 3. Check for when the data file has been successfully delivered i.e. 'the ready stats is code 4' 
request.addEventListener('readystatechange', function() {
   console.log(request, request.readyState)
   if (request.readyState === 4) {
      console.log(request.responseText)
   }
})

// 3. Use open method of request object, (passing in GET and file name as parameters) and then send the request
request.open('GET', 'players.json')
request.send()

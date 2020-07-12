console.log('Client side JavaScript file is loaded!'); 

// fetch is a browser based API that can be used for Client-side API;  not accessible via node

// Example -- puzzle.mead.io/puzzle returns a simple JSON object w/ one propert of 'puzzle' w/ different values each time
/*fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data); 
    })
});   // returns a randomly generated puzzle;  .then() is used with promises;  */

const weatherForm = document.querySelector('form'); 
const search = document.querySelector('input'); 
const msg1 = document.querySelector('#message-1');
const msg2 = document.querySelector('#message-2'); 

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();         // e is for event;  preventDefault prevents the browser from automatically refreshing
    const location = search.value; 

    msg1.textContent = 'Loading...'
    msg2.textContent = '';  

/* logic here modified to relative path to handle localhost & heroku Production URL  */  
//    fetch('http://localhost:3000/weather?address=' + location).then((response) => {  
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                msg1.textContent = data.error;
            }
            else {
                msg1.textContent = data.location;
                msg2.textContent = data.forecast;  
            }
        })
    });  

    console.log(location); 
})


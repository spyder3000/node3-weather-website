/* note:  to automatically restart server as we're updating, use >nodemon src/app.js from cmd prompt */

// express found at expressjs.com (includes documentation & API reference);  makes it easy to create webservers 
const path = require('path');   // core node module (nodejs.org);  do not need to install via npm i xxx on cmd prompt 
const express = require('express');   // express is a function (as opposed to an object);  see expressjs.com 
const hbs = require('hbs'); 
const geocode = require('./utils/geocode'); 
const forecast = require('./utils/forecast'); 

// console.log(__filename);  // path to current file

const app = express();   // creates a new express application 
const port = process.env.PORT || 3000;     // e.g. process environment var from heroku;  if running locally, will default to 3000

// DEfine paths for Express config;  __dirname is path to current directory;  path.join to go up one level & into public dir;  
const publicDirectoryPath = path.join(__dirname, '../public');  // this line will match to public files first (e.g. index.html) prior to app.get stmts below  
const viewsPath = path.join(__dirname, '../templates/views');  // express defaults to 'views' folder;  this modifies that to 'templates/views' instead 
const partialsPath = path.join(__dirname, '../templates/partials'); 

// Setup handlebars engine & views location 
app.set('view engine', 'hbs');     // e.g. set up a view engine (handlebar) for Express 
app.set('views', viewsPath);   // express default is 'views' folder for .hbs content;  this overrides that  
hbs.registerPartials(partialsPath);  

// Setup static directory;  app.use to customize our server;  
app.use(express.static(publicDirectoryPath))    

// app.get lets us configure what the server should do when user enters a url -- e.g. call will return HTML or JSON
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather', 
        name: 'Oreo'
    });    // allows us to render one of our views (one of the handlebar templates) 
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page', 
        name: 'Oreo'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help', 
        name: 'Oreo', 
        helpText: 'This is help text of some sort.'
    })
})

/*app.get('/about', (req, res) => {
    res.send('<h1>About</h1>') 
})*/

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({       // return stops the code from executing below 
            error: 'You must provide a address' 
        })
    }

    // object destructuring;  replacing data object w/ {lat, long, location};  default object of {} to prevent error
    geocode(req.query.address, (err, {long: longitude, lat: latitude, location} = {}) => {   
        if (err) { 
            console.log('geo error'); 
            return res.send({       // return stops the code from executing below 
                error: err  
            })
            //return console.log('Error: ', err);
        }
        //callForecast(longitude, latitude, location); 
        forecast(longitude, latitude, (err, data) => {
            if (err) { 
                return res.send({       // return stops the code from executing below 
                    error: err 
                })
                //return console.log('Error: ', err);
            }
            console.log('Location: ' + location); 
            console.log('Forecast: ' +  data);  
            res.send({      // sends JSON to requestor;  this could also be an array of objects
                location: location, 
                forecast: data, 
                address: req.query.address
            }) 
        });
    });     

})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({       // return stops the code from executing below 
            error: 'You must provide a search term' 
        })
    }
    console.log(req.query);    // req.query includes the query string parameters (e.g. localhosts:3000?search=games&rating=5)
    res.send({
        products: []
    })
})

/* uses wildcard to match to any page that begins with /help/   */
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Page', 
        errorMsg: 'Help article not found.'
    })
})

// '*' match anything else that hasn't matched so far;  node starts at public directory check and works through app.get until it gets here  
app.get('*', (req, res) => {
//    res.send('my 404 page'); 
    res.render('404', {
        title: '404 Page', 
        errorMsg: 'Page not found.'
    })
})

// To start the server up;  access this via localhost:3000 URL  
app.listen(port, () => {    // port 3000 is default development port;  live HTML port is typically 80
    console.log('Server started on port '+port); 
});  
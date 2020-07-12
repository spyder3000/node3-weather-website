// Geocoding -- use www.mapbox.com to signup;  API key = pk.eyJ1IjoianZhcmR5IiwiYSI6ImNrY2V4czFuZDBjeWUyeGtrdmU2OHI2dncifQ.3hKk1876qZg_lnWw0rWE-A;  
//     reference -- https://docs.mapbox.com/api/search/#geocoding

// sample -- https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?limit=1&access_token=pk.eyJ1IjoianZhcmR5IiwiYSI6ImNrY2V4czFuZDBjeWUyeGtrdmU2OHI2dncifQ.3hKk1876qZg_lnWw0rWE-A
//  limit =1 returns just most relevant match;  default is array of the 5 most relevant matches;  features[0] is the most relevant match

//const url3 = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Charlotte.json?limit=1&access_token=pk.eyJ1IjoianZhcmR5IiwiYSI6ImNrY2V4czFuZDBjeWUyeGtrdmU2OHI2dncifQ.3hKk1876qZg_lnWw0rWE-A'; 


const request = require('request');     // note: request is deprecated;  may need to replace this 

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?limit=1&access_token=pk.eyJ1IjoianZhcmR5IiwiYSI6ImNrY2V4czFuZDBjeWUyeGtrdmU2OHI2dncifQ.3hKk1876qZg_lnWw0rWE-A'; 
    
    request({ url: url, json: true }, (error, {body}) => {  // destructuring of response object to var body (as in response.body)
        if (error) {
            callback('Server error -- Unable to connect to location services');  
        }
        else if (body.features.length === 0) {
            callback('Unable to find Geocode location.  Try a different search');
        }
        else {
            callback(null, {
                lat: body.features[0].center[1],
                long: body.features[0].center[0], 
                location: body.features[0].place_name
            }) 
        }
    })
} 

module.exports = geocode; 
// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');


// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors())

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 5050;
const server = app.listen(port, function() {
    console.log(`running on localhost: ${port}`);

});


const data = [];
app.post('/add-information', addInformation);

function addInformation(req, res) {
  projectData['date'] = req.body.date;
  projectData['temp'] = req.body.temp;
  projectData['feeling'] = req.body.feeling;
  res.send(projectData);
  console.log(projectData);
}

app.get('/all-information', function(req, res){
  console.log(projectData)
    res.send(projectData);
});





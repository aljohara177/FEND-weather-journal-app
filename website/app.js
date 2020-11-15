/* Global Variables */
const apiURL = 'https://api.openweathermap.org/data/2.5/weather?zip='
const apiKey = '&appid=0fe3b8623465b852187a6de190ef0831&units=imperial';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

const generateButton = document.getElementById('generate');




generateButton.addEventListener('click', function() {
    const feeling = document.getElementById('feelings').value;
    const zipCode = document.getElementById('zip').value;
    getWeather(apiURL, zipCode, apiKey)
    .then(function (result) {
      console.log(result);
      postData('/add-information', { date: newDate, temp: result.main.temp, feeling: feeling })
    }).then(function (newData) {
      updateUI()
    })
});

const getWeather = async (apiURL, zipCode, apiKey) => {
    const res = await fetch(apiURL + zipCode + apiKey);
    try {
      const result = await res.json();
      return result;
    } catch (error) {
      console.log("error", error);
    }
};




const postData = async ( url = '', data = {})=>{

    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),      
  });

    try {
      const newData = await response.json();
      return newData;
    }catch(error) {
    console.log("error", error);
    }
};


const updateUI = async () => {
    const request = await fetch('/all-information');
    try {
      const allSearched= await request.json()
      document.getElementById('date').innerHTML = allSearched.date;
      document.getElementById('temp').innerHTML = allSearched.temp;
      document.getElementById('content').innerHTML = allSearched.feeling;
    }
    catch (error) {
      console.log("error", error);
    }
};
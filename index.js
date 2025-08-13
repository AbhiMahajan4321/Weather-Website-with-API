// Weather App Project

// API from - openweather
// https://home.openweathermap.org/api_keys

const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");

const apiKey = "1b2950bf769f557196eb9a527fec4466";

weatherForm.addEventListener("submit", async event => {
    // Forms have a default behaviour where they refresh the page after interaction, we don't want that so we use,
    event.preventDefault();
    
    const city = cityInput.value;

    if (city) {
        try {
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        } 
        catch (error) {
            console.error(error);
            displayError(error);
        }
    } else {
        displayError("Please Enter a City");
    }


});

async function getWeatherData(city) {
    
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const response = await fetch(apiUrl);

    // Check if response's "ok" property is true and status is between 200 to 300
    // console.log(response);  

    if (!response.ok)
        throw new Error("Could not fetch weather data")

    return await response.json();
}

function displayWeatherInfo(data){
    console.log(data);  // to check if everything's fine

    // Name, temp, humidity, weather description, weather id (will be used for emoji)
    // will be fetched from data(JSON version)
    const {name: city, 
           main: {temp, humidity}, 
           weather: [{description, id}]} = data;


    const cityDisplay = document.querySelector(".cityDisplay");
    const tempDisplay = document.querySelector(".tempDisplay");
    const humidityDisplay = document.querySelector(".humidityDisplay");
    const descriptionX = document.querySelector(".description");
    const weatherEmojiID = document.querySelector(".weatherEmoji");
    
    
    
    cityDisplay.textContent = city;
    tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descriptionX.textContent = description;
    weatherEmojiID.textContent = getWeatherEmoji(id);

    card.style.display = "flex"; 
}

function getWeatherEmoji(weatherID){

    switch (true){
        case(weatherID >= 200 && weatherID < 300):
            return "⛈️";
        case(weatherID >= 300 && weatherID < 400):
            return "🌧️";
        case(weatherID >= 500 && weatherID < 600):
            return "🌧️";
        case(weatherID >= 600 && weatherID < 700):
            return "❄️";
        case(weatherID >= 700 && weatherID < 800):
            return "💨";
        case(weatherID === 800):
            return "☀️";
        case(weatherID >= 801 && weatherID < 810):
            return "☁️";
        default: return "❓"; 
        }


}

function displayError(message){
    const errorDisplay = document.querySelector(".errorDisplay");
    
    errorDisplay.textContent = message;

    card.textContent = "";
    card.style.display = "flex"; 
    card.appendChild(errorDisplay);
}





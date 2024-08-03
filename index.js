import axios from 'axios';

const API_AUTHO_KEY = 'bd323aaf262d4c85bd2172928240308';
const URL = 'http://api.weatherapi.com/v1/current.json';

async function getWeather(city) {
    try {
        const response = await axios.get(URL, {
            params: {
                access_key: API_AUTHO_KEY,
                query: city
            }
        });

        if (response.data.error) {
            console.log(`Error: ${response.data.error.info}`);
        } else {
            displayWeather(response.data);
        }
    } catch (error) {
        console.error(`Error fetching weather data: ${error}`);
    }
}

function displayWeather(data) {
    const location = data.location;
    const current = data.current;

    console.log(`Weather in ${location.name}, ${location.country}:`);
    console.log(`Temperature: ${current.temperature}°C`);
    console.log(`Weather Descriptions: ${current.weather_descriptions.join(', ')}`);
    console.log(`Humidity: ${current.humidity}%`);
    console.log(`Wind Speed: ${current.wind_speed} km/h`);
    console.log(`Observation Time: ${current.observation_time}`);
}

// Run the service with a city argument
const city = process.argv[2];
if (!city) {
    console.log('Usage: node weatherService.js <city>');
} else {
    getWeather(city);
}

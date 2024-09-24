const axios = require("axios");
const opencage = require("opencage-api-client");
require("dotenv").config();

const getWeatherEmoji = (weatherCode) => {
    switch (weatherCode) {
        case 0:
            return '☀️'; //clear sky
        case 1:
        case 2:
        case 3:
            return '⛅'; //partly cloudy
        case 45:
        case 48:
            return '☁️'; //cloudy
        case 51:
        case 53:
        case 55:
            return '🌦️'; //drizzle
        case 61:
        case 63:
        case 65:
        case 80:
        case 81:
        case 82:
            return '🌧️'; //rain
        case 95:
            return '⛈️'; //thunderstorm
        case 96:
        case 99:
            return '🌩️'; //thunderstorm with hail
        default:
            return '🌡️';
    }
};

const getWeatherForecast = async (req, res) => {
    const query = req.query.q;
    if (!query) {
        return res.render('index', { error: 'Please enter a valid location' });
    }

    try {
        const geoData = await opencage.geocode({ q: query, key: process.env.API_KEY }); //use API key from OpenCage API
        
        if (geoData.status.code === 200 && geoData.results.length > 0) {
            const place = geoData.results[0];
            const { lat, lng } = place.geometry;
            const location = place.formatted;

            console.log('Coordinates:', lat, lng); //to see latlong

            const weatherResponse = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&hourly=temperature_2m,weathercode&current_weather=true`);

            if (weatherResponse.data.hourly && weatherResponse.data.hourly.temperature_2m && weatherResponse.data.hourly.weathercode) {
                const latlong = weatherResponse.data;
                const currentWeather = weatherResponse.data.current_weather;
                const hourlyForecast = weatherResponse.data.hourly.temperature_2m.slice(0, 24); //forecast for next 24 hours
                const weatherCodes = weatherResponse.data.hourly.weathercode.slice(0, 24);

                const currentWeatherEmoji = getWeatherEmoji(currentWeather.weathercode);
                const hourlyEmojis = weatherCodes.map(code => getWeatherEmoji(code));

                const currentHour = new Date().getHours();
                const hourlyTimes = hourlyForecast.map((_, index) => {
                    let hour = (currentHour + index + 1) %24;
                    let period = hour >= 12? 'PM':'AM';
                    return `${hour} ${period}`;
                });

                res.render('forecast', { latlong, location, currentWeather: { ...currentWeather, emoji: currentWeatherEmoji }, hourlyForecast, hourlyEmojis, hourlyTimes });
            } else {
                return res.render('index', { error: 'Hourly forecast data not available for this location.' });
            }

        } else {
            return res.render('index', { error: 'Location not found. Please try another location.' });
        }
    } catch (error) {
        console.error('Error fetching weather data:', error.message);
        res.render('index', { error: 'Error fetching weather data. Please try again later.' });
    }
};

module.exports = { getWeatherForecast };

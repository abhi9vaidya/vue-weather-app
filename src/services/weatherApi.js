import axios from 'axios'

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY
const BASE_URL = 'https://api.openweathermap.org/data/2.5'

const weatherApi = axios.create({
  baseURL: BASE_URL,
  params: {
    appid: API_KEY,
    units: 'metric'
  }
})

export const getWeatherByCity = async (cityName) => {
  if (!API_KEY) {
    return { 
      data: null, 
      error: 'API key is not configured. Please set VITE_WEATHER_API_KEY in your .env file and restart the dev server.' 
    }
  }

  try {
    const response = await weatherApi.get('/weather', {
      params: {
        q: cityName
      }
    })
    return { data: response.data, error: null }
  } catch (error) {
    if (error.response) {
      // API returned an error response
      if (error.response.status === 404) {
        return { data: null, error: 'City not found. Please check the city name and try again.' }
      } else if (error.response.status === 401) {
        const apiMessage = error.response.data?.message || 'Invalid API key'
        return { 
          data: null, 
          error: `Invalid API key: ${apiMessage}. Please verify your API key is active in your OpenWeatherMap account.` 
        }
      } else if (error.response.status === 429) {
        return { data: null, error: 'API quota exceeded. Please try again later.' }
      }
      return { data: null, error: error.response.data?.message || 'An error occurred while fetching weather data.' }
    } else if (error.request) {
      // Request was made but no response received
      return { data: null, error: 'Network error. Please check your internet connection.' }
    } else {
      // Something else happened
      return { data: null, error: 'An unexpected error occurred.' }
    }
  }
}

export default weatherApi

import { defineStore } from 'pinia'
import { getWeatherByCity } from '../services/weatherApi'

export const useWeatherStore = defineStore('weather', {
  state: () => ({
    weatherData: null,
    loading: false,
    error: null,
    lastSearchedCity: ''
  }),

  getters: {
    hasWeatherData: (state) => state.weatherData !== null,
    temperature: (state) => state.weatherData?.main?.temp ?? null,
    feelsLike: (state) => state.weatherData?.main?.feels_like ?? null,
    humidity: (state) => state.weatherData?.main?.humidity ?? null,
    windSpeed: (state) => state.weatherData?.wind?.speed ?? null,
    pressure: (state) => state.weatherData?.main?.pressure ?? null,
    visibility: (state) => state.weatherData?.visibility ?? null,
    cloudiness: (state) => state.weatherData?.clouds?.all ?? null,
    sunrise: (state) => state.weatherData?.sys?.sunrise ?? null,
    sunset: (state) => state.weatherData?.sys?.sunset ?? null,
    description: (state) => state.weatherData?.weather?.[0]?.description ?? '',
    weatherIcon: (state) => state.weatherData?.weather?.[0]?.icon ?? '',
    weatherMain: (state) => state.weatherData?.weather?.[0]?.main ?? '',
    cityName: (state) => state.weatherData?.name ?? '',
    country: (state) => state.weatherData?.sys?.country ?? '',
    latitude: (state) => state.weatherData?.coord?.lat ?? null,
    longitude: (state) => state.weatherData?.coord?.lon ?? null,
    windDirection: (state) => state.weatherData?.wind?.deg ?? null
  },

  actions: {
    async fetchWeather(cityName) {
      if (!cityName || cityName.trim() === '') {
        this.error = 'Please enter a city name.'
        return
      }

      this.loading = true
      this.error = null
      this.lastSearchedCity = cityName.trim()

      try {
        const { data, error } = await getWeatherByCity(cityName.trim())
        
        if (error) {
          this.error = error
          this.weatherData = null
        } else {
          this.weatherData = data
          this.error = null
        }
      } catch (err) {
        this.error = 'An unexpected error occurred. Please try again.'
        this.weatherData = null
      } finally {
        this.loading = false
      }
    },

    clearError() {
      this.error = null
    },

    clearWeather() {
      this.weatherData = null
      this.error = null
      this.lastSearchedCity = ''
    }
  }
})

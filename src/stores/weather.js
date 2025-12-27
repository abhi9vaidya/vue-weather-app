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
    description: (state) => state.weatherData?.weather?.[0]?.description ?? '',
    weatherIcon: (state) => state.weatherData?.weather?.[0]?.icon ?? '',
    cityName: (state) => state.weatherData?.name ?? '',
    country: (state) => state.weatherData?.sys?.country ?? ''
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

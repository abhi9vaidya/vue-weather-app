# Vue Weather App

A modern, responsive weather web application built with Vue 3, Pinia, and Tailwind CSS. Fetch and display real-time weather data for any city using the OpenWeatherMap API.

## 🌟 Features

- **Real-time Weather Data**: Get current weather information for any city worldwide
- **Search Functionality**: Search weather by city name with instant results
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop devices
- **Modern UI**: Clean, modern interface with smooth animations and transitions
- **Error Handling**: Comprehensive error handling for API failures, network issues, and invalid inputs
- **Loading States**: Visual feedback during data fetching
- **Weather Details**: Display temperature, feels-like temperature, humidity, wind speed, weather description, and icons

## 🛠️ Tech Stack

- **Framework**: Vue 3 (Composition API)
- **Build Tool**: Vite
- **State Management**: Pinia
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **API**: OpenWeatherMap API

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- OpenWeatherMap API key (free at [openweathermap.org](https://openweathermap.org/api))

## 🚀 Installation & Setup

### 1. Clone the repository

```bash
git clone <repository-url>
cd vue-weather-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure API Key

1. Get your free API key from [OpenWeatherMap](https://openweathermap.org/api)
2. Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

3. Add your API key to the `.env` file:

```
VITE_WEATHER_API_KEY=your_api_key_here
```

Replace `your_api_key_here` with your actual OpenWeatherMap API key.

### 4. Run the development server

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the port shown in your terminal).

### 5. Build for production

```bash
npm run build
```

The production build will be in the `dist` directory.

### 6. Preview production build

```bash
npm run preview
```

## 📁 Project Structure

```
vue-weather-app/
├── src/
│   ├── components/
│   │   ├── WeatherSearch.vue      # Search input component
│   │   ├── WeatherCard.vue         # Main weather display card
│   │   ├── LoadingSpinner.vue      # Loading indicator
│   │   └── ErrorMessage.vue       # Error display component
│   ├── stores/
│   │   └── weather.js              # Pinia store for weather state
│   ├── services/
│   │   └── weatherApi.js           # API service for OpenWeatherMap
│   ├── App.vue                     # Main application component
│   ├── main.js                     # Application entry point
│   └── style.css                   # Global styles with Tailwind
├── index.html                      # HTML template
├── vite.config.js                  # Vite configuration
├── tailwind.config.js              # Tailwind CSS configuration
├── postcss.config.js               # PostCSS configuration
├── package.json                    # Project dependencies
└── README.md                       # This file
```

## 🎨 Features Overview

### Search Functionality
- Text input to search weather by city name
- Real-time data fetching on search
- User-friendly error messages for invalid cities

### Weather Display
- **Temperature**: Current temperature in Celsius
- **Feels Like**: Perceived temperature
- **Humidity**: Air humidity percentage
- **Wind Speed**: Wind speed in meters per second
- **Weather Icon**: Visual representation from OpenWeatherMap
- **Location**: City name and country code

### Responsive Layout
- Mobile-first design approach
- Adaptive grid layouts
- Touch-friendly interface elements
- Optimized for all screen sizes

### Error Handling
- Invalid city name detection
- API key validation
- Network error handling
- User-friendly error messages
- Dismissible error notifications

## 🔧 Configuration

### Environment Variables

The application uses environment variables for configuration:

- `VITE_WEATHER_API_KEY`: Your OpenWeatherMap API key (required)

### API Configuration

The API service is configured in `src/services/weatherApi.js`. By default, it uses:
- Base URL: `https://api.openweathermap.org/data/2.5`
- Units: Metric (Celsius)
- Language: English

## 📱 Usage

1. Enter a city name in the search box
2. Click "Search" or press Enter
3. View the weather information displayed in the card
4. If an error occurs, an error message will be displayed with details

## 🎯 Architecture

### Components
- **Reusable Components**: Modular Vue components for maintainability
- **Composition API**: Modern Vue 3 Composition API for better code organization
- **Props & Emits**: Proper component communication

### State Management
- **Pinia Store**: Centralized state management for weather data
- **Getters**: Computed properties for derived state
- **Actions**: Async actions for API calls

### API Service
- **Separated Concerns**: API logic isolated in service file
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Axios Integration**: Reliable HTTP client for API calls

## 🐛 Troubleshooting

### API Key Issues
- Ensure your API key is correctly set in the `.env` file
- Verify the API key is active on OpenWeatherMap
- Check for API quota limits (free tier has limits)

### Network Errors
- Check your internet connection
- Verify OpenWeatherMap API is accessible
- Check browser console for detailed error messages

### Build Issues
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Ensure Node.js version is 16 or higher
- Check that all dependencies are installed correctly

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- [OpenWeatherMap](https://openweathermap.org/) for providing the weather API
- [Vue.js](https://vuejs.org/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework

## 📝 Notes

- The free tier of OpenWeatherMap API has rate limits (60 calls/minute)
- API key is required for the application to function
- Weather data is fetched in real-time on each search
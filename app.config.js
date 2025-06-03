import 'dotenv/config';

export default {
  expo: {
    name: "Weather App",
    slug: "weather-app",
    version: "1.0.0",
    extra: {
      OPEN_WEATHER_API_KEY: process.env.OPEN_WEATHER_API_KEY,
    },
  },
};

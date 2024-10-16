async function start() {
  const weatherPromise = await fetch('https://api.weather.gov/gridpoints/STO/29,164/forecast')
  const weatherData = await weatherPromise.json()
  const ourTemperature = weatherData.properties.periods[0].temperature

  document.querySelector('#weather-temperature').textContent = ourTemperature
}

start()
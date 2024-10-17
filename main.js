const template = document.querySelector('#pet-card-template')
const wrapper = document.createDocumentFragment()

async function start() {
  const weatherPromise = await fetch('https://api.weather.gov/gridpoints/STO/29,164/forecast')
  const weatherData = await weatherPromise.json()
  const ourTemperature = weatherData.properties.periods[0].temperature

  document.querySelector('#weather-temperature').textContent = ourTemperature
}

start()

async function petsArea() {
  const petsAreaPromise = await fetch('https://learnwebcode.github.io/bootcamp-pet-data/pets.json')
  const PetsAreaData = await petsAreaPromise.json()
  PetsAreaData.forEach(pet => {
    const clone = template.content.cloneNode(true)
    clone.querySelector('h3').textContent = pet.name
    clone.querySelector('.pet-description').textContent = pet.description
    clone.querySelector('.pet-age').textContent = createAgeText(pet.birthYear)
    clone.querySelector('.pet-card-photo img').src = pet.photo
    clone.querySelector('.pet-card-photo img').alt = `A ${pet.species} named ${pet.name}`
    wrapper.appendChild(clone)
  });
  document.querySelector('.list-of-pets').appendChild(wrapper)
}

petsArea()

function createAgeText(birthYear) {
  const currentYear = new Date().getFullYear()
  const age = currentYear - birthYear

  if (age == 1) return '1 Year Old'
  if (age == 0) return 'Less Than A Year Old'
  if (age > 1) return `${age} Years Old`
}
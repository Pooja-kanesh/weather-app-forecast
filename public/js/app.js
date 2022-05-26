'use strict'

//---------Home Page---------
const weatherForm = document.querySelector('form');
const searchAddress = document.querySelector('input');
const contentBox = document.querySelector('.sub-content')

const place = document.querySelector('.place')
const info = document.querySelector('.forecast')
const weatherIcon = document.querySelector('.w-icon')
const temperature = document.querySelector('.temp')

let currentWeather = "";

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const address = searchAddress.value

    weatherIcon.classList.add('hidden')
    temperature.classList.add('hidden')
    contentBox.classList.remove('hidden')
    temperature.textContent = ''
    place.textContent = 'Loading...'
    info.textContent = ''
    searchAddress.blur();

    fetch(`/weather?address=${address}`).then((response) => {
        response.json().then((data) => {

            if (data.error) {
                weatherIcon.classList.remove('hidden')
                weatherIcon.src = `../img/search.png`
                place.textContent = data.error
            }
            else {
                searchAddress.value = ''
                weatherIcon.src = `../img/${data.w_icon}.png`
                weatherIcon.classList.remove('hidden')
                temperature.classList.remove('hidden')
                temperature.textContent = `${data.temperature}°C`

                place.textContent = data.location
                info.textContent = data.forecast
            }
        })
    })
})

/*
fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data);
    })
})
*/

/*
fetch('http://localhost:3000/weather?address=gwalior').then((response) => {
    response.json().then((data) => {
        if (data.error) {
            console.log(data.error)
        }
        else {
            console.log(data.location)
            console.log(data.forecast)
        }
    })
})
*/

//----------More Features-------
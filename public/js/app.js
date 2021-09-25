'use strict'

//---------Home Page---------
const weatherForm = document.querySelector('form');
const searchAddress = document.querySelector('input');
const paraOne = document.getElementById('one')
const paraTwo = document.getElementById('two')
const weatherIcon = document.querySelector('.w-icon')
const temperature = document.querySelector('.temp')

let currentWeather = "";

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const address = searchAddress.value

    weatherIcon.classList.add('hidden')
    temperature.classList.add('hidden')
    temperature.textContent = ''
    paraOne.textContent = 'Loading information! Please wait......'
    paraTwo.textContent = ''
    searchAddress.blur();

    fetch(`/weather?address=${address}`).then((response) => {
        response.json().then((data) => {

            if (data.error) {
                paraOne.textContent = data.error
            }
            else {
                searchAddress.value = ''
                weatherIcon.src = `../img/${data.w_icon}.png`
                weatherIcon.classList.remove('hidden')
                temperature.classList.remove('hidden')
                temperature.textContent = `${data.temperature}°C`
                paraOne.textContent = data.location
                paraTwo.textContent = data.forecast
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
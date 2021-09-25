const path = require('path');
const hbs = require('hbs');
const express = require('express');        // imports module
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const weather_type = require('./utils/weather-type');
// const news = require('./utils/news');
// const { title } = require('process');
// const exp = require('constants');
// const { randomInt } = require('crypto');

const app = express();                      // generates express application


//Defines path for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handldebars engine and views path
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve   
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Forecaster ',
        creator: 'Pooja Kanesh',
    })
})
// app.get('', (req, res) => {
//     res.send('<h1>WEATHER</h1>')
// })

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        creator: 'Pooja Kanesh'
    })
})
// app.get('/about', (req, res) => {
//     res.send('About page')
// })

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        creator: 'Pooja Kanesh',
        message: 'Enter location to know weather'
    })
})
// app.get('/help', (req, res) => {
//     res.send('This is help page')
// })

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Address not provided! Please enter a location and retry.'
        })
    }

    geocode(req.query.address, (error, { longitude, latitude, location } = {}) => {
        if (error) return res.send(error)
        else {
            forecast(longitude, latitude, (error, weatherData) => {
                if (error) {
                    return res.send(error)
                }

                const weather = weatherData.current;
                const w_descrip = weather.weather_descriptions[0];
                const type = weather_type(w_descrip);
                // console.log(weather)

                res.send({
                    location: location,
                    description: w_descrip,
                    w_icon: type,
                    temperature: weather.temperature,
                    forecast: `Current weather: ${w_descrip}`
                })
                // console.log(data)
                // console.log(data.location)
                // const weather = weatherData.current
                // console.log(`${weather.weather_descriptions[0]}. \nIt is currently ${weather.temperature} degrees and ${weather.precip}% chance of raining.`)
            })
        }
    })

    // res.send({
    //     location: req.query.address,
    //     forecast: 'Light rain',
    //     temperature: '22'
    // })
})


// app.get('/more', (req, res) => {
//     news((error, response) => {
//         if (error) {
//             res.send(error)
//         }
//         else {
//             res.send(response)
//         }
//     })
// })


// app.get('/products', (req, res) => {
//     console.log(req.query)
//     res.send({
//         products: []
//     })
// })

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: 'Error 404 ',
        creator: 'Pooja Kanesh',
        message: 'Help page not found'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: 'Error 404',
        creator: 'Pooja Kanesh',
        message: 'Page not found'
    })
})

// first arg of 'get' method accept routes to direct to differnet pages on our domain
// '' for app.com
// '/help' for app.com/help

app.listen(3000, () => {
    console.log('Server started..')
})


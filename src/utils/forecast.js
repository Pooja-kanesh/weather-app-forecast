const request = require('request')

const weather = (lon, lat, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=24f04a9bf87c7896111d6031557211b5&query=${lat},${lon}`

    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('No connection!', undefined)
        }
        else if (response === undefined) {
            callback({ error: 'Place not found' }, undefined)
        }
        else {
            callback(undefined, response.body)
        }
    })
}

module.exports = weather;
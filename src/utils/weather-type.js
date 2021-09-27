const w_type = function (descrip) {
    const d = descrip.toLowerCase();

    if (d === 'windy' || d.index('sunny') > -1 || d === 'cloudy'
        || d === 'overcast') {
        return d;
    }

    else if (d === 'clear') {
        return 'sunny';
    }

    else if (d.indexOf('thunderstorm') > -1) {
        return 'thunderstorm';
    }

    else if (d === 'patchy rain possible' || d === 'light rain shower' || d.indexOf('drizzle') > -1) {
        return 'light rain shower';
    }

    else if (d.indexOf('rain') > -1) {
        return 'rain';
    }

    else if (d.indexOf('partly') > -1) {
        return 'partly cloudy';
    }

    else if (d === 'haze' || d === 'smoke' || d === 'mist') {
        return 'haze';
    }

}

module.exports = w_type;
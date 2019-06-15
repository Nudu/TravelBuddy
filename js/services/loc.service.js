var locs;

const WEATHER_API = '481bd7008b869d995efdadacfce10144'

function getLocs1() {
    return Promise.resolve(locs);
}

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs);
        }, 2000)
    });

}

function getPosition() {
    console.log('Getting Device Positon:');
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function getWeather(locs) {
    console.log('Getting Weather:');
    // console.log(locs)
    // console.log('http://api.openweathermap.org/data/2.5/weather?lat=' + locs.lat + '&lon=' + locs.lng + '&APPID=' + WEATHER_API)
    return axios.get('https://api.openweathermap.org/data/2.5/weather?lat=' + locs.lat + '&lon=' + locs.lng + '&APPID=' + WEATHER_API+'&units=metric')
    .then(res => res.data)
}

window.getWeather = getWeather


export default {
    getLocs: getLocs,
    getPosition: getPosition,
    locs: locs,
    getWeather
}
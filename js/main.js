// console.log('Main!');
import locService from './services/loc.service.js'
import mapService from './services/map.service.js'



// console.log(axios)

// locService.getLocs()
//     .then(locs => console.log('locs', locs))

document.body.onload = () => {
    // console.log(locService.locs)
    mapService.initMap()
        .then(
            () => {
                mapService.addMarker({ lat: 32.0672529, lng: 34.7687332 }, 'Nadav\'s House');
                locService.getPosition()
                    .then(pos => {
                        console.log(pos.coords);
                        // document.querySelector('.user-location-lat').innerHTML = pos.coords.latitude;
                        // document.querySelector('.user-location-long').innerHTML = pos.coords.longitude;
                        locService.locs = { lat: pos.coords.latitude, lng: pos.coords.longitude }
                        mapService.addMarker(locService.locs, 'Current Location');
                        locService.getWeather(locService.locs)
                        .then(data => {
                            console.log(data)
                            document.querySelector('.loc').innerHTML = data.name+' In '+ data.sys.country
                            document.querySelector('.temp').innerHTML = data.main.temp+'°'
                            document.querySelector('.temp-min').innerHTML = data.main.temp_min+'°'
                            document.querySelector('.temp-max').innerHTML = data.main.temp_max+'°'
                            document.querySelector('.weather-description').innerHTML = data.weather[0].description
                            document.querySelector('.weather-icon').src = 'https://openweathermap.org/img/w/'+data.weather[0].icon+'.png'
                            document.querySelector('.pressure').innerHTML = data.main.pressure+' hpa'
                            document.querySelector('.humidity').innerHTML = data.main.humidity+'%'
                            document.querySelector('.wind').innerHTML = data.wind.speed+' m/s '
                            document.querySelector('.wind-deg').innerHTML = data.wind.deg+'°'
                            // document.querySelector('.sun-rise').innerHTML = new Date(data.sys.sunrise).toTimeString().split(' ')[0]
                            // document.querySelector('.sun-set').innerHTML = new Date(data.sys.sunset).toTimeString().split(' ')[0]
                        })
                        // console.log(locService.locs)
                        // panTo(pos.coords.latitude, pos.coords.longitude)
                        // for Production Stage Only:
                        // window.locs = locService.locs
                    })
                    .catch(err => {
                        console.log('err!!!', err);
                    })
            }
        ).catch(console.warn);



}

// document.querySelector('.btn1').onclick =  () => {
//     console.log('Thanks!');
// }


document.querySelector('.btn').addEventListener('click', (ev) => {
    console.log('Panning to Current Location');
    mapService.panTo(locService.locs.lat, locService.locs.lng);
})
// document.querySelector('.btn').addEventListener('click', (ev) => {
//     console.log('Aha!', ev.target);
//     mapService.panTo(35.6895, 139.6917);
// })


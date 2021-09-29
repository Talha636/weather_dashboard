let APIkey = '73e31f882779b7486ccebdb8509f2742';
let search = document.querySelector('#btn');
let historyList = document.getElementById('history');
let currentInfo = document.getElementById('current');

search.addEventListener('click', function() {
    event.preventDefault();
    let cityName = document.getElementById('citySearch').value;
    localStorage.setItem('history', cityName);
    let cities = localStorage.getItem('history');
    let button = document.createElement('button');
    button.innerText = (cities);
    button.classList.add('btn-primary', 'btn', 'my-2');
    historyList.appendChild(button);

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIkey}`)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        let lon = (Object.values(data.coord)[0]);
        let lat = (Object.values(data.coord)[1]);
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=metric&appid=${APIkey}`)
        .then(function(reply) {
        return reply.json();
        })
        .then(function(info) {
            console.log(info);
            this.showCurrentInfo(info);
        })
    })
    
})

function showCurrentInfo(info) {
    let h4El = document.querySelector('h4');
    let imgEl = document.createElement('img');
    let uvi = info.current.uvi;
    let icon = info.current.weather[0].icon;
    console.log(icon);
    imgEl.src = 'http://openweathermap.org/img/wn/' + icon + '.png';
    h4El.innerText = (info.timezone + '  (' + moment().format('MMMM Do, YYYY')) + ')'; // + imgEl);
    let pEl = document.querySelector('p');
    pEl.innerHTML = ('Temp: ' + info.current.temp + '°C' + '<br />' + 'Wind: ' + info.current.wind_speed + ' m/s' + '<br />' + 'Humidity: ' + info.current.humidity + ' %' + '<br />' + 'UV Index: ' + uvi);
};


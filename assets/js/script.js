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
            this.futureIcon(info);
            this.futureTemp(info);
            this.futureWind(info);
            this.futureHumidity(info);
        })
    })
    
})

function showCurrentInfo(info) {
    document.querySelector('#current').innerHTML = info.timezone + '(' + moment().format('MMMM Do, YYYY') + ')';
    // let icon0 = info.current.weather[0].icon;
    // console.log(icon0);
    // document.querySelector('#icon').src = 'http://openweathermap.org/img/wn/' + icon0 + '.png';
    document.querySelector('#temp').innerHTML = info.current.temp;
    document.querySelector('#wind').innerHTML = info.current.wind_speed;
    document.querySelector('#humidity').innerHTML = info.current.humidity;
    document.querySelector('#uvi').innerHTML = info.current.uvi;
    if (info.current.uvi <= 2) {
        uvi.classList = 'green';
    } else if (info.current.uvi > 2 && info.current.uvi <= 5) {
        uvi.classList = 'yellow';
    } else {
        uvi.classList = 'red';
    }
}

function futureDate() {
    document.getElementById('future1').innerText = moment().add(1, 'd').format('MMMM Do, YYYY');
    document.getElementById('future2').innerText = moment().add(2, 'd').format('MMMM Do, YYYY');
    document.getElementById('future3').innerText = moment().add(3, 'd').format('MMMM Do, YYYY');
    document.getElementById('future4').innerText = moment().add(4, 'd').format('MMMM Do, YYYY');
    document.getElementById('future5').innerText = moment().add(5, 'd').format('MMMM Do, YYYY');
}
futureDate();

function futureIcon(info) {
    let icon1 = info.daily[0].weather[0].icon;
    let icon2 = info.daily[1].weather[0].icon;
    let icon3 = info.daily[2].weather[0].icon;
    let icon4 = info.daily[3].weather[0].icon;
    let icon5 = info.daily[4].weather[0].icon;
    document.querySelector('#icon1').src = 'http://openweathermap.org/img/wn/' + icon1 + '.png';
    document.querySelector('#icon2').src = 'http://openweathermap.org/img/wn/' + icon2 + '.png';
    document.querySelector('#icon3').src = 'http://openweathermap.org/img/wn/' + icon3 + '.png';
    document.querySelector('#icon4').src = 'http://openweathermap.org/img/wn/' + icon4 + '.png';
    document.querySelector('#icon5').src = 'http://openweathermap.org/img/wn/' + icon5 + '.png';
}

function futureTemp(info) {
    document.querySelector('#temp1').innerHTML = info.daily[0].temp.day;
    document.querySelector('#temp2').innerHTML = info.daily[1].temp.day;
    document.querySelector('#temp3').innerHTML = info.daily[2].temp.day;
    document.querySelector('#temp4').innerHTML = info.daily[3].temp.day;
    document.querySelector('#temp5').innerHTML = info.daily[4].temp.day;
}

function futureWind(info) {
    document.querySelector('#wind1').innerHTML = info.daily[0].wind_speed;
    document.querySelector('#wind2').innerHTML = info.daily[1].wind_speed;
    document.querySelector('#wind3').innerHTML = info.daily[2].wind_speed;
    document.querySelector('#wind4').innerHTML = info.daily[3].wind_speed;
    document.querySelector('#wind5').innerHTML = info.daily[4].wind_speed;
}

function futureHumidity(info) {
    document.querySelector('#humidity1').innerHTML = info.daily[0].humidity;
    document.querySelector('#humidity2').innerHTML = info.daily[1].humidity;
    document.querySelector('#humidity3').innerHTML = info.daily[2].humidity;
    document.querySelector('#humidity4').innerHTML = info.daily[3].humidity;
    document.querySelector('#humidity5').innerHTML = info.daily[4].humidity;
}
let APIkey = '73e31f882779b7486ccebdb8509f2742';


fetch('https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&appid=73e31f882779b7486ccebdb8509f2742').then(function(response) {
    console.log(response);
})
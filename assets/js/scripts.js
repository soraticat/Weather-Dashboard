//declare global variables
var apiKey = 'ce7901d48531cc6e9a42e5deaaa30507';
var onecallAPIUrl;
var city;
var citiesListArr = [];



//event listener for button, call saveCityData function
$('form').submit(function(event){
    event.preventDefault();
    city = $('#search').val();
    console.log(city);
    saveCityData(city);
    getCurrentWeather(city);    
    });

//function to save form data to local storage
function saveCityData(city) {
    citiesListArr.push(city);
    localStorage.setItem("citiesList", citiesListArr)
};

//on click query api using form input, create cityListEl with href to api source

//fetch api city data and use the longitude and latitude values to create a new url. Use that url to fetch current weather conditions and forecast conditions.
var getCurrentWeather = function(city){
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&APPID=' + apiKey;
    console.log(apiUrl);
    fetch(apiUrl).then(function(response){
        if(response.ok){
            response.json().then(function(data){
                console.log(data);
                $('#currentCity').append(data.name);
                var lon = data.coord.lon;
                var lat = data.coord.lat;
                var onecallAPIUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&units=imperial&APPID=' + apiKey;
                fetch(onecallAPIUrl).then(function(response){
                    if(response.ok){
                    response.json().then(function(data){
                    console.log(data);
                    displayCurrentWeather(data);
                    
            })
        }
    })
            })
        }else {
            citiesListArr.pop;
            return;
        }
    })
    $.ajax('https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&units=imperial&APPID=' + apiKey)
    .then(function(fiveDayForcast){
        console.log(fiveDayForcast);
        weatherForecast(fiveDayForcast);
    })
}

//function to append current weather conditions to the currentWeather list
var displayCurrentWeather = function(weatherData){
    //check to see if weatherData was created
    if(weatherData.length === 0){
        console.log('Something went wrong')
    }
    // $('#currentCity').append(weatherData.name);
    $('#currentTemp').append(weatherData.current.temp);
    $('#currentWind').append(weatherData.current.wind_speed);
    $('#currentHumidity').append(weatherData.current.humidity);
    $('#uvIndex').append(weatherData.current.uvi)
}

//function to append weather forecast to forecast cards
var weatherForecast = function(weatherData){
//    var weatherData = $(weatherData.daily).slice(0, 5);
//    console.log(weatherData);
var i = 0;
$(`.card-group`).empty();
 for(var i=3; i<weatherData.list.length; i+=8){
    //    console.log(index)
       
        console.log(weatherData.list)
        var tempForecast =weatherData.list[i].main.temp;
        console.log(tempForecast);
        var windForecast =weatherData.list[i].wind.speed;
        console.log(windForecast);
        var humidityForecast =weatherData.list[i].main.humidity;
        console.log(humidityForecast);

        $(`.card-group`).append(` 
        
        <div class="col">
        <div class="card text-white bg-secondary h-100">
            <div class="card-body" id="0">
                <h5 class="card-title">Date Placeholder</h5>
                <p class="card-weatherIcon"></p>
                <p class="card-temp">Temp: <span id="temp">${tempForecast } </span> &#176;F</p>
                <p class="card-wind"><span id="wind">${windForecast}</span> MPH</p>
                <p class="card-humidity"><span id="humidity">${humidityForecast}</span> %</p>   
            </div>
        </div>
    </div>`)
        // $('#' + i).find($('#temp')).text(tempForecast);
        // $('#' + i).find($('#wind')).text(windForecast);
        // $('#' + i).find($('#humidity')).text(humidityForecast);
 
    }
}

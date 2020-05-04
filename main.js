async function myFunc() { ///Async func for using await
    var responce = await fetch('https://restcountries.eu/rest/v2/all'); ///Getting json of all countries
    if (responce.ok) { /// Checking the status, if HTTP-status is 200-299
        var myData = await responce.json(); ///Convertiong the response into JSON or getting the body of the response
        var flexDiv = document.createElement('div'); ///container flex div(Main div)
        flexDiv.className = 'flex-container'; ///Assigning class name(class properties mentioned in external CSS)
        for (var ind = 0; ind < myData.length; ind++) { ///Loop for creating div for All countries
            var newDiv = document.createElement('div'); ///creating div this will contain flag and country name
            var flagImg = document.createElement('img'); /// image tag to diplay flag
            var newP = document.createElement('p'); ///Paragraph tag for displaying the country name
            newP.innerHTML = myData[ind].name; ///Assigning country name
            flagImg.src = myData[ind].flag; ///setting source URL for flag
            flagImg.alt = myData[ind].name + ' flag'; ///setting alteration attribute
            newDiv.appendChild(flagImg); ///Adding flag into div
            newDiv.appendChild(newP); /// adding country name below the flag
            newDiv.setAttribute('onclick', 'getWeather(\'' + (myData[ind].capital).replace(/'/g, '%27') + '\',\'' + myData[ind].alpha2Code + '\')'); ///Setting onclick attribute. when the div gets clicked it will invoke getWeather func with capital city name and 2 char country code
            flexDiv.appendChild(newDiv); ///Adding newly created div into Main div
        }
        document.getElementsByTagName('body')[0].append(flexDiv); ///Finally adding main div into body
    }
}
async function getWeather(city, code) { ///Function defenition of getWeather
    /// #city -> capital city name
    /// #code -> two char country code
    var responce = await fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + ',' + code + '&appid=00113f369758fba0ae4ee18b5c4f35ea'); /// Fetching weather data using city and code
    if (responce.ok) { ///Checking the status of the response if HTTP-status is 200-299
        var weatherData = await responce.json(); ///getting json(body) from the response
        Swal.fire('Temperature : \n' + weatherData.main.temp_min + '°C <= ' + weatherData.main.temp + '°C <= ' + weatherData.main.temp_max + '°C,\nDescription : ' + weatherData.weather[0].description + ', \n Wind Speed : ' + weatherData.wind.speed); ///Notification
    }
    if (responce.status == 404) { /// If that city data not available
        var responseJson = await responce.json(); /// convertiong response into JSON
        Swal.fire(responseJson.message); /// Displaying response message
    }
}

window.onload = myFunc; ///Driver Function
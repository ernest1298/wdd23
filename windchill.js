
    // let temp = document.querySelector('#temp').textContent;
    // let windspeed = document.querySelector('#wind').textContent;
    // let chill =  Math.round((35.74 + (0.6215 * temp))-(35.75 * Math.pow(windspeed,0.16)) + (0.4275*temp*Math.pow(windspeed,0.16)));;
    //     if (temp <=50 && wind >= 3){
    //         chill = Math.round((35.74 + (0.6215 * temp))-(35.75 * Math.pow(windspeed,0.16)) + (0.4275*temp*Math.pow(windspeed,0.16)));
    //         document.getElementById('temp').innerHTML= chill;
    //         document.getElementById('wind').innerHTML= chill;
    //     }
    //      else{

    //           N/A
    //          }
                

    let currentTemperature = document.querySelector("#current-temperature");
    let windSpeed = document.querySelector("#wind-speed");
    let windChill = document.querySelector("#wind-chill");

    if(currentTemperature <= 50 || windSpeed > 3) {
        let windChillValue = (35.74 + 0.6215) * (currentTemperature - 35.75) * (windSpeed**0.16 + 0.4275) * currentTemperature * windSpeed**0.16;
        windChill.innerHTML = windChillValue;
    } else {
        windChill.innerHTML = "N/A"
    };
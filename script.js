// For DOM Manipulation I am getting these elements
let searchCity= document.querySelector('#searchCity')
let cityName=document.querySelector('#cityName')
let cityFlag=document.querySelector('#cityFlag')
let temperature=document.querySelector('.temperature')
let temperatureImage=document.querySelector('.temperatureImage')
let description = document.querySelector('.description')
let wind =document.querySelector('#wind')
let humidity = document.querySelector('#humidity')
let pressure = document.querySelector('#pressure')
let details=document.querySelector('.details')
let form = document.querySelector('form')

// data fetching based on form input
form.addEventListener('submit',(event)=>{
    event.preventDefault();
    searchWeather();
})

const apiKey='334b48f49e8f6049649c2227bbab2863' // api key from openweatherapi
const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${apiKey}` // url by which we'll get weather data

// asyncronous js function fetching weather data from api 
const searchWeather =async()=>{
    if(searchCity.value!=''){
        try{
            const response = await fetch(`${url}&q=${searchCity.value}`)
            if(!response.ok){
                throw new Error("City Not Found")
            }
            const data = await response.json()
            updateUI(data)
        }
        catch(error){
            handleError(error)
        }
        searchCity.value=''
    }
}
const updateUI=(data)=>{
    cityFlag.style.visibility = "visible"; // enabling visiblity for flag of the country 
    // fetched data values are updated using DOM manipulation
    cityName.innerText = data.name;
    cityFlag.src = `https://flagsapi.com/${data.sys.country}/shiny/32.png`;
    temperature.querySelector('span').innerText = data.main.temp;
    let temperatureType = data.weather[0].main;
    switch (temperatureType) {
         case 'Clouds':
            temperatureImage.src = "./images/cloud.png";
            break;

         case 'Clear':
            temperatureImage.src = "/images/clear.png";
            break;

         case 'Rain':
            temperatureImage.src = "/images/rain.png";
            break;

         case 'Snow':
            temperatureImage.src = "/images/snow.png";
            break;

         case 'Mist':
            temperatureImage.src = "/images/mist.png";
            break;
        // default src of temperatureImage if condition is not above
         default:
            temperatureImage.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
            break;
         }
        description.innerText = data.weather[0].description;
        details.style.visibility = "visible"; // enabling visibility of weather details
        wind.innerText = `${data.wind.speed} Kmph`;
        humidity.innerText = `${data.main.humidity}%`;
        pressure.innerText = `${data.main.pressure} Pha`;
}

const handleError=(error)=>{
    console.log(error.message);
    cityFlag.style.visibility = "hidden"; // flag is hidden as no city found
    // resetting the data values to empty as no city found (error)
    cityName.innerText = '';
    temperature.querySelector('span').innerText = '';
    temperatureImage.src = "/images/404.png"; // not found image
    temperatureImage.style.width = "140px";
    description.innerText = "City Not Found";
    details.style.visibility = "hidden"; // hiding visibility of weather details
    main.classList.add('error');
    setTimeout(() => {
      main.classList.remove('error');
    }, 1000);       
}


// initial loading of weather app using hometown city so that app will have data when initial load
const initApp = ()=>{
    searchCity.value="Salem";
    searchWeather();
}
initApp(); // default search with hometown value provided in function

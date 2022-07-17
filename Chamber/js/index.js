

// lazyload
const imagesToLoad = document.querySelectorAll('img[data-src]');

const imgOptions = {
    thresholder: 1,
    rootMargin: "10px 20px 30px 40px" 
};

const loadImages = (image) => {
  image.setAttribute('src', image.getAttribute('data-src'));
  image.onload = () => {
    image.removeAttribute('data-src');
  };
};


if('IntersectionObserver' in window) {
    const imgObserver = new IntersectionObserver((items, observer) => {
      items.forEach((item) => {
        if(item.isIntersecting) {
          loadImages(item.target);
          observer.unobserve(item.target);
        }
      });
    });
    imagesToLoad.forEach((img) => {
      imgObserver.observe(img);
    });
  } 
else {
    imagesToLoad.forEach((img) => {
      loadImages(img);
    });
}

//local storage
let visit_heading = document.querySelector('.visited');

let now_date = new Date();

let stored_date = localStorage.getItem('last_visited');
let last_date = new Date(stored_date);

if(!stored_date) {
    visit_heading.textContent = "Welcome";
} else {
    //cal the diff to the two dates
    let diff_time = now_date.getTime() - last_date.getTime();

    //cal the number of days between the two dates
    let diff_days = Math.round(diff_time/(1000 * 60 * 60 * 24));

    visit_heading.textContent = diff_days + ' days since your last visit';

}

localStorage.setItem('lastvisited', now_date);

//directory page

const gridbutton = document.querySelector("#grid");
const listbutton = document.querySelector("#list");
const display = document.querySelector("article");



gridbutton.addEventListener("click", () => {
	
	display.classList.add("grid");
	display.classList.remove("list");
});

listbutton.addEventListener("click", showList); 

function showList() {
	display.classList.add("list");
	display.classList.remove("grid");
}

const requestURL = 'https://ernest1298.github.io/wdd23/data.json';
const cards = document.querySelector('.cards');

fetch(requestURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (jsonObject) {
    console.table(jsonObject);  

    const affiliates = jsonObject['affiliates'];
    affiliates.forEach(displayAffiliates);
  });

function displayAffiliates(affiliate) {
  
  let card = document.createElement('section');
  let h2 = document.createElement('h2');
  let phone = document.createElement('p');
  let address = document.createElement('d')
  
  let website = document.createElement('p');
  let image = document.createElement('img');
  //let description = documnet.createElement('des');
  // 
  
  h2.textContent = `${affiliate.name}`;
  phone.textContent = `Phone: ${affiliate.phone}`;
  address.textContent = `Address: ${affiliate.address}`;
  website.textContent = `Website: ${affiliate.website}`;
  //description.textContent = `Description: ${affiliate.description}`;
  // membership.textContent = `${affiliate.membership} Member`;

  // Build the image attributes by using the setAttribute method for the src, alt, and loading attribute values.
  image.setAttribute('src', affiliate.image);
  image.setAttribute('alt', `Company logo of ${affiliate.name}, Great Lakes Chamber of Commerce Affiliiate`);
  image.setAttribute('loading', 'lazy');

  // Add/append the section(card) with the h2 element
  card.classList.add('card')
  card.appendChild(h2);
  card.appendChild(image);
  card.appendChild(phone);
  card.appendChild(address);
  card.appendChild(website);
  //card.appendChild(description);
  // card.appendChild(membership);

  // Add/append the existing HTML div with the cards class with the section(card)
  document.querySelector('div.cards').appendChild(card);
}
// select HTML elements in the document
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');
// const maxTemp = document.querySelector('#temp_max');
// const minTemp = document.querySelector('#temp_min');
const windSpeed = document.querySelector('#speed')

let temp= currentTemp;
let wSpeed= windSpeed;

var windChill= (35.74 + (0.6215 * temp))-(35.75 * Math.pow(wSpeed,0.16)) + (0.4275*temp*Math.pow(wSpeed,0.16));
var windChill= Math.round(windChill);
document.getElementById("windChill").innerHTML= windChill;

const url = 'https://api.openweathermap.org/data/2.5/weather?q=Sunyani&units=imperial&appid=1c46ab2790dbd1be365348f91b70dda1';

apiFetch(url);

async function apiFetch(apiURL) {
    const response = await fetch(apiURL);
    if (response.ok) {
      const data = await response.json();
      console.log(data); // this is for testing the call
      displayResults(data);
    } else {
        throw Error(await response.text());
    }
}

function  displayResults(weatherData) {
    currentTemp.innerHTML = `<strong>${weatherData.main.temp.toFixed(1)}</strong>`;
    // maxTemp.innerHTML = weatherData.main.temp_max.toFixed(1);
    // minTemp.innerHTML = weatherData.main.temp_min.toFixed(1);
    windSpeed.innerHTML = weatherData.wind.speed.toFixed(2)

    const iconsrc = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
    const desc = weatherData.weather[0].description;
  
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);
    captionDesc.innerHTML = desc.toUpperCase();
  }
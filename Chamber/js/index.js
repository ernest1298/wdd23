

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

// The following code could be written cleaner. How? We may have to simplfiy our HTMl and think about a default view.

gridbutton.addEventListener("click", () => {
	// example using arrow function
	display.classList.add("grid");
	display.classList.remove("list");
});

listbutton.addEventListener("click", showList); // example using defined function

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
    console.table(jsonObject);  // temporary checking for valid response and data parsing

    const affiliates = jsonObject['affiliates'];
    affiliates.forEach(displayAffiliates);
  });

function displayAffiliates(affiliate) {
  // Create elements to add to the document
  let card = document.createElement('section');
  let h2 = document.createElement('h2');
  let phone = document.createElement('p');
  // let email = document.createElement('p');
  let website = document.createElement('p');
  let image = document.createElement('img');
  // let membership = document.createElement('p');

  // Change the textContent property of the h2 element to contain the prophet's full name
  h2.textContent = `${affiliate.name}`;
  phone.textContent = `Phone: ${affiliate.phone}`;
  // email.textContent = `Email: ${affiliate.email}`;
  website.textContent = `Website: ${affiliate.website}`;
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
  // card.appendChild(email);
  card.appendChild(website);
  // card.appendChild(membership);

  // Add/append the existing HTML div with the cards class with the section(card)
  document.querySelector('div.cards').appendChild(card);
}
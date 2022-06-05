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
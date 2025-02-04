import { headerScroll, picker, hamburger, hiddenMenu } from "./general.js";
import { nextSlide, prevSlide } from "./slider.js";
import {
  items,
  next,
  prev,
  thumbnails,
  countItem,
  itemActive,
  refreshInterval,
  showSlider,
} from "./generalSlider.js";
import {
  numHotel,
  numCity,
  numCountry,
  startingHotel,
  startingCity,
  startingCountry,
  renderNumber,
  countUp,
  info,
  observer,
} from "./info.js";

const inputButton = document.querySelector(".search-button");

inputImages();
headerScroll();
hiddenMenu();

//////  API Calls ////////

//Fetch the images
const fetchAPI = async (query) => {
  const url = `https://pixabay.com/api/?key=48130696-f47f7f07d4fee61d343dc4a52&q=${query}&image_type=photo`;
  try {
    const response = await fetch(url, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status ${response.status}`);
    }
    const data = await response.json();
    if (data.hits && data.hits.length > 0) {
      return data.hits.map((photo) => photo.largeImageURL);
    } else {
      return [];
    }
  } catch (error) {
    console.error("error fetching images");
    return [];
  }
};

// Function to fetch the City descriptions
async function getCityInfo() {
  try {
    const response = await fetch("../data/cities.json");
    const data = await response.json();

    const input = document.getElementById("input").value.trim().toLowerCase();

    const matchingCity = data.find((city) => city.name.toLowerCase() === input);
    if (matchingCity) {
      const cityDescription = matchingCity.description[0];
      displayCityInfo(cityDescription);
    } else {
      console.log("fetch error");
    }
  } catch (error) {
    console.log("error");
  }
}

//Fetch hotel images
async function hotelImages() {
  const response = await fetch(
    "https://pixabay.com/api/?key=48130696-f47f7f07d4fee61d343dc4a52&q=hotel+room&image_type=photo"
  );
  const data = await response.json();
  return data;
}

//Fetch the Hotels
async function fetchHotels() {
  const response = await fetch("./data/Hotels-Array.json");
  const data = await response.json();
  return data;
}

//Fetch the Country Images
export const fetchCountryImg = async () => {
  const url = `https://pixabay.com/api/?key=48130696-f47f7f07d4fee61d343dc4a52&q=Tourist+Attraction&image_type=photo&orientation=horizontal`;
  try {
    const response = await fetch(url, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status ${response.status}`);
    }
    const data = await response.json();

    if (data.hits && data.hits.length > 0) {
      return data.hits.map((photo) => photo.largeImageURL);
    } else {
      return [];
    }
  } catch (error) {
    console.error("error fetching images");
    return [];
  }
};
/////////////////////////////////////////////////////////

// search button Function
function inputImages() {
  const input = document.getElementById("input");
  const destinationSection = document.getElementById("show-place-div");
  const destinationImg = document.querySelectorAll(".destination-img");

  const destinationName = document.querySelectorAll(".input-name");

  inputButton.addEventListener("click", async () => {
    const descriptionDiv = document.querySelector(".citydescriptionP");
    descriptionDiv.textContent = "";
    getCityInfo();

    const query = input.value.trim();
    destinationName.forEach((item) => (item.textContent = query.toUpperCase()));
    if (!query) {
      return;
    }
    const imagePath = await fetchAPI(query);

    window.scrollTo({ top: 3500, behavior: "smooth" });
    if (imagePath && imagePath.length > 0) {
      destinationImg.forEach((img) => {
        const randomImage = Math.floor(Math.random() * imagePath.length);
        img.style.backgroundImage = `url(${imagePath[randomImage]})`;
      });
    } else {
      console.error("no images found");
    }
    destinationSection.style.display = "block";
  });
}

// Function to display city description
function displayCityInfo(cityDescription) {
  const descriptionDiv = document.querySelectorAll(".citydescriptionP");
  descriptionDiv.forEach((item) => (item.textContent = cityDescription));
}

//Render the Hotels
async function renderHotels() {
  const hotelResult = document.getElementById("hotel-results");
  const whereInput = document.getElementById("destination");

  const data = await fetchHotels();

  const matchinghotel = data.filter((hotel) => {
    const sameCity =
      hotel.city.toLowerCase() === whereInput.value.toLowerCase();
    const sameCountry =
      hotel.country.toLowerCase() === whereInput.value.toLowerCase();

    return sameCity || sameCountry;
  });
  console.log(matchinghotel);

  hotelResult.innerHTML = "";
  let html = "";
  matchinghotel.forEach((hotel) => {
    let services = "";
    hotel.amenities.forEach((amenitie) => {
      services += `<p class="hotelService">${amenitie}</p>`;
    });

    html += ` <div class="hotel-div">
          <div class="hotel-image-div">
          <img class="hotel-image" alt="" />
        </div>
        <div class="hotel-info">
          <div class="hotel-info-subdiv  hotel-name">
            <h2 class="hotelName">${hotel.name}</h2>
          </div>
          <div  class="hotel-info-subdiv hotel-location">
            <i class="fa-solid fa-location-dot"></i>
            <h3 class="hotel-city">${hotel.city}</h3>
            <h3 class="hotel-country">${hotel.country}</h3>
          </div>
          <div  class="hotel-info-subdiv hotel-cost">
            <p>Price per Night:</p>
            <p class="price">$${hotel.price_per_night}</p>
          </div>
          <div class="hotel-info-subdiv hotel-service">
           ${services}
          </div>
          <div class="hotel-info-subdiv hotel-rating">
           <p class="rating">
            <i class="fa-solid fa-star"></i>
            ${hotel.ratings}
           </p> 
          </div>
        </div>
        </div>`;
  });
  hotelResult.innerHTML = html;
  renderHotelImage();
}

document
  .querySelector(".search-hotel-button")
  .addEventListener("click", (event) => {
    event.preventDefault();
    renderHotels();
  });
// Render hotel images
function renderHotelImage() {
  const hotelImage = document.querySelectorAll(".hotel-image");
  hotelImage.forEach(async (image) => {
    const data = await hotelImages();
    const imagePath = data.hits;
    const randomImage = Math.floor(Math.random() * imagePath.length);
    const img = data.hits[randomImage].largeImageURL;
    image.src = img;
  });
}

//Display the country images
async function DisplayCountries() {
  const img = await fetchCountryImg();
  const generalImage = document.querySelectorAll(".general-image");
  const generalSmallImage = document.querySelectorAll(".general-small-image");

  if (img.length < 10) {
    console.error("Not enough images available.");
    return;
  }

  const shuffledImages = img.sort(() => Math.random() - 0.5);

  const selectedImages = shuffledImages.slice(0, 10);

  generalImage.forEach((item, index) => {
    item.src = selectedImages[index];
  });

  generalSmallImage.forEach((item, index) => {
    item.src = selectedImages[index];
  });
}
DisplayCountries();

//text animation

const textAnimation = document.querySelector('.dinamic');
const textArray = ['Landmarks', 'Urban life', 'Mountains', 'Beaches', 'Deserts']
let counter = 0;

function textLoop() {
  const intervalId = setInterval(() => {
  textAnimation.textContent = (textArray[counter]);
  counter += 1
  if (counter === 5) {
    counter = 0
  }
}, 3000);
};

textLoop();


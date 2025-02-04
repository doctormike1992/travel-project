  const numHotel = document.querySelector(".numHotel");
  const numCity = document.querySelector(".numCity");
  const numCountry = document.querySelector(".numCountry");
  let startingHotel = 120;
  let startingCity = 30;
  let startingCountry = 0;
  //render the numbers
  function renderNumber() {
    numHotel.textContent = startingHotel;
    numCity.textContent = startingCity;
    numCountry.textContent = startingCountry;
};

//count up the numbers
function countUp() {
  setInterval(() => {
    if (
      startingHotel === 260 ||
      startingCity === 170 ||
      startingCountry === 140
    ) {
      return;
    }
    startingHotel += 1;
    startingCity += 1;
    startingCountry += 1;
    renderNumber();
  }, 10);
}

//run the count up function on view
const info = document.querySelector(".info-numbers");
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      countUp();
      observer.unobserve(entry.target);
    }
  });
});
observer.observe(info);


export {
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
};

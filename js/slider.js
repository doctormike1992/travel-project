let nextSlide = document.querySelector('.nextSlide');
let prevSlide = document.querySelector(".prevSlide");

nextSlide.addEventListener('click', () => {
  let items = document.querySelectorAll('.destination-img')
  document.querySelector('.slide').appendChild(items[0])
})

prevSlide.addEventListener("click", () => {
  let items = document.querySelectorAll(".destination-img");
  document.querySelector(".slide").prepend(items[items.length - 1]);
});


export {nextSlide,prevSlide}
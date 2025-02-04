///////header on scroll///////
export function headerScroll() {
  window.addEventListener("scroll", function () {
    const header = document.querySelector(".header");

    if (window.scrollY > 100) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
}
///////Litepicker date selector//////
export const picker = new Litepicker({
  element: document.getElementById("litepicker"),
  singleMode: false,
  format: "YYYY-MM-DD",
  onSelect: (startDate, endDate) => {
    console.log("Start Date:", startDate.format("YYYY-MM-DD"));
    console.log("End Date:", endDate.format("YYYY-MM-DD"));
  },
});

////Popular divs animation on scroll

document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".animate-on-scroll");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  });

  elements.forEach((element) => observer.observe(element));
});

export function hamburger() {
  const check = document.getElementById("check");
  const menuLi = document.querySelectorAll(".menuLi");

  if (check.checked === true) {
    menuLi.forEach((li) => (li.style = "display:block"));
  }
  else {
    menuLi.forEach((li) => (li.style = "display:none"));
  }
}

export function hiddenMenu() {
  const barMenu = document.getElementById("check");
  barMenu.addEventListener("change", () => {
    hamburger();
  });
}

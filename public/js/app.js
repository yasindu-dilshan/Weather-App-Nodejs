console.log("client side javascript file is loaded");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const locationEl = document.querySelector("#location");
const forecastEl = document.querySelector("#forecast");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  locationEl.textContent = "Loading....";
  forecastEl.textContent = "";

  const location = search.value;

  fetch("http://localhost:3000/weather?address=" + location).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          locationEl.textContent = data.error;
        } else {
          locationEl.textContent = data.location;
          forecastEl.textContent = data.forecast;
        }
      });
    }
  );
});

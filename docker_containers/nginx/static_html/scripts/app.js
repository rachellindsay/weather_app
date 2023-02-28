// app.js file is for DOM manipulation

const cityForm = document.querySelector("form"); // selects element <form>
const card = document.querySelector(".card"); // selects <div> class="card"
const details = document.querySelector(".details"); // selects <div> class="details" -- this <div> contains the weather details of the location and is where the data properties (cityDets, weather) will be displayed.
const time = document.querySelector("img.time"); // selects <img> class="time" and will be used to determine whether a daytime or nighttime image will be displayed.
const icons = document.querySelector(".icon img"); // selects the <div> class="icon" and will be used to determine which weather icon will be displayed

// to update the UI when the user enters a new city.
const updateUI = (data) => {
  // destructure properties (easy way to get properties from an object and store them in a constant)
  const { cityDets, weather } = data;

  // update the html with the specified property values
  details.innerHTML = `
      <h5 class="my-3">${cityDets.EnglishName}</h5>
      <div class="class my-3">${weather.WeatherText}</div>
      <div class="display-4 my-4">
        <span>${weather.Temperature.Imperial.Value}</span>
        <span>&deg;F</span>
      </div>
  `;

  // add and update icon images based on WeatherIcon values in the returned data
  const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
  icons.setAttribute("src", iconSrc);

  // add and update day/night image based on IsDayTime value returned in data
  let timeSrc = weather.IsDayTime ? "img/day.svg" : "img/night.svg";
  time.setAttribute("src", timeSrc);

  //remove the d-none class if present - this prevents the template from showing when there is no data to display yet
  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }
};

async function updateCity(city) {
  const cityDets = await getCity(city);
  const weather = await getWeather(cityDets.Key);

  return { cityDets, weather };
}

cityForm.addEventListener("submit", (e) => {
  //prevent default action
  e.preventDefault();

  //get city value
  const city = cityForm.city.value.trim();
  cityForm.reset();

  //update the ui with new city
  updateCity(city)
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));
});

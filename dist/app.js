// SCRIPT FOR THE FORM //

function passvalues() {
  var countryname = document.getElementById("txt").value;
  localStorage.setItem("textvalue", countryname);
 return false;
}


// WEATHER API SECTION //

const form =  document.querySelector('.top-banner form');
const input = document.querySelector('.top-banner input');
const msg = document.querySelector('.top-banner .msg');
const list = document.querySelector('.ajax-section .cities');
 

const apiKey="594f37f3e2ce38aa648dfabb16c41c6e"; 

form.addEventListener("submit", e => {
  e.preventDefault();
  let inputVal = input.value;

fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`)
  .then(response => response.json()) // to see if is working
  .then(data => {
  const { main, name, sys, weather } = data;
      const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${
        weather[0]["icon"]
      }.svg`;

      const li = document.createElement("li");
      li.classList.add("city");
      const markup = `
        <h2 class="city-name" data-name="${name},${sys.country}">
          <span>${name}</span>
          <sup>${sys.country}</sup>
        </h2>
        <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>
        <figure>
          <img class="city-icon" src="${icon}" alt="${
        weather[0]["description"]
      }">
          <figcaption>${weather[0]["description"]}</figcaption>
        </figure>
      `;
      li.innerHTML = markup;
      list.appendChild(li);
    })
    .catch(() => {
      msg.textContent = "Please search for a valid city 😩";
    });

  msg.textContent = "";
  form.reset();
  input.focus();
});




///////////////////////////////////////////////////////

window.localStorage
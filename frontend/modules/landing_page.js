import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  let url = config.backendEndpoint + "/cities";
  let citiesArr;
  try{
    let apiCall = await fetch(url);
     citiesArr = await apiCall.json();
  } catch(error){
    return null;
  }
  
  return citiesArr;

}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let newCity = document.createElement('div');
  newCity.className = 'tile my-3';
  newCity.id = `${id}`;
 
  let imgNode= document.createElement('img');
  imgNode.src=`${image}`;
  let text = document.createElement('div');
  text.className = 'tile-text';
  let cityName= document.createElement('p');
  cityName.innerText = `${city}`;
  let cityDescription= document.createElement('p');
  cityDescription.innerText = `${description}`;
  text.appendChild(cityName);
  text.appendChild(cityDescription);
  let redirectId = document.createElement('a');
  redirectId.href= `./pages/adventures/?city=${id}`;



  newCity.appendChild(imgNode);
  newCity.appendChild(text);
  redirectId.append(newCity);

  let colDiv = document.createElement('div');
  colDiv.className="col-lg-3 col-sm-6 col-mb-6 col-xs-12"
  colDiv.append(redirectId);

  document.getElementById('data').append(colDiv);
}

export { init, fetchCities, addCityToDOM };

import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  let city = search.replace("?city=", "");
  return city;
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  let url = `${config.backendEndpoint}/adventures?city=${city}`;
  let result;
  try {
    let apiCall = await fetch(url);
    result = await apiCall.json();
  } catch (error) {
    return null;
  }
  return result;
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  document.getElementById("adventureCards").innerHTML = "";
  let dispAdvCards = document.getElementById("adventureCards");
  adventures.forEach((adventure) => {
    let colDiv = document.createElement("div");
    colDiv.className = "col-lg-3 col-sm-6 col-mb-6 col-xs-12";
    colDiv.id = adventure.category;
    let aTag = document.createElement("a");
    aTag.href = `detail/?adventure=${adventure.id}`;
    aTag.id = adventure.id;
    let activityCard = document.createElement("div");
    activityCard.className = "activity-card my-3";
    let activityBanner = document.createElement("div");
    // let activityCardBody =document.createElement('div');
    // activityCardBody.className='activity-card card-body ';
    // activityCardBody.innerHTML=`<h5>Resort</h5>
    // <h5>&#x20b9 1200</h5>`;

    activityBanner.className = "category-banner";
    activityBanner.innerText = adventure.category;
    let activityCardImg = document.createElement("img");
    activityCardImg.src = adventure.image;

    colDiv.appendChild(aTag);
    aTag.appendChild(activityCard);

    activityCard.appendChild(activityCardImg);
    activityCard.appendChild(activityBanner);
    // activityCard.appendChild(activityCardBody);

    dispAdvCards.appendChild(colDiv);
  });
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list

  let filteredArrByDuration = list.filter(
    (adventure) => adventure.duration >= low && adventure.duration <= high
  );
  return filteredArrByDuration;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  let filteredArrByCategory = [];
  categoryList.forEach((categoryL) => {
    let result = list.filter((adventure) => adventure.category === categoryL);
    filteredArrByCategory = [...filteredArrByCategory, ...result];
  });
  return filteredArrByCategory;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  let durationArr = filters.duration.split("-");
  let duration = [];
  let category = [];
  if (durationArr.length > 1 && filters.category.length) {
    duration = filterByDuration(list, durationArr[0], durationArr[1]);
    category = filterByCategory(duration, filters.category);
    return category;
  }

  if (durationArr.length > 1 && !filters.category.length) {
    duration = filterByDuration(list, durationArr[0], durationArr[1]);
    return duration;
  }

  if (!(durationArr.length > 1) && filters.category.length) {
    category = filterByCategory(list, filters.category);
    return category;
  }

  return list;

  // Place holder for functionality to work in the Stubs
  // return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage

  localStorage.setItem("filters", JSON.stringify(filters));

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object

  return JSON.parse(localStorage.getItem("filters"));

  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  document.getElementById("category-list").innerHTML = "";
  document.getElementById("duration-list").innerHTML = "";
  if (filters.category.length) {
    filters.category.forEach((filter) => {
      let pill = document.createElement("div");
      pill.className = "category-filter";
      pill.innerText = `${filter}`;
      document.getElementById("category-list").append(pill);
    });
  }
  if (filters.duration !== "") {
      let pill = document.createElement("div");
      pill.className = "category-filter";
      pill.innerText = `${filters.duration}`;
      document.getElementById("duration-list").append(pill);
  }
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};

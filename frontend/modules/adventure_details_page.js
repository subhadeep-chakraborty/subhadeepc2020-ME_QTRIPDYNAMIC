import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  return search.replace("?adventure=","");


  // Place holder for functionality to work in the Stubs
  return null;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call

  let url = `${config.backendEndpoint}/adventures/detail?adventure=${adventureId}`
  
  let data ;
  try{
    let apiCall = await fetch(url);
    data = await apiCall.json();
  } catch(error){
    return null;
  }

  return data;

  // Place holder for functionality to work in the Stubs
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  document.getElementById('adventure-name').innerHTML= `${adventure.name}`;
  document.getElementById('adventure-subtitle').innerHTML= `${adventure.subtitle}`;
  adventure.images.forEach((image) => {
    let img= document.createElement('img');
    img.src=image;
    img.className='activity-card-image';
    document.getElementById('photo-gallery').append(img);
  });
  let aboutPara = document.createElement('p');
  aboutPara.innerText=`${adventure.content}`;
  document.getElementById('adventure-content').append(aboutPara);

}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  document.getElementById('photo-gallery').innerHTML=``;
  let photos = document.getElementById('photo-gallery');
  let carouselDiv = document.createElement('div');
  carouselDiv.className="carousel slide";
  carouselDiv.id='carouselExampleIndicators';
  let indicatorDiv = document.createElement('div');
  indicatorDiv.className='carousel-indicators';
  indicatorDiv.innerHTML=`<div class="carousel-indicators">
  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
</div>
</button>`;
carouselDiv.append(indicatorDiv);
  // carouselDiv.data-ride="carousel";
  photos.append(carouselDiv);
  let carouselInner= document.createElement('div');
  carouselInner.className='carousel-inner';
  carouselDiv.dataset.bsRide=`carousel`;
  carouselDiv.append(carouselInner);

  images.forEach((image, index) => {
    if(index==0){
      // let img= document.querySelector('.carousel-inner');
      let activeImgDiv= document.createElement('div');
      activeImgDiv.className='carousel-item active';
      let img= document.createElement('img');
      img.src=image;
      img.className='activity-card-image'
      // img.className='d-block w-100';
      activeImgDiv.append(img);
      document.querySelector('.carousel-inner').appendChild(activeImgDiv);
    }else{

      let activeImgDiv= document.createElement('div');
      activeImgDiv.className='carousel-item';
      let img= document.createElement('img');
      img.src=image;
      img.className='activity-card-image'
      // img.className='d-block w-100';
      activeImgDiv.append(img);
      document.querySelector('.carousel-inner').appendChild(activeImgDiv);
    }
  });

}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  if(adventure.available){
    document.getElementById('reservation-panel-sold-out').style.display='none';
    document.getElementById('reservation-panel-available').style.display='block';
    document.getElementById('reservation-person-cost').innerHTML=`${adventure.costPerHead}`;
   
  }else{
    document.getElementById('reservation-panel-available').style.display='none';
    document.getElementById('reservation-panel-sold-out').style.display='block';
  }

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field

  let totalCost= parseInt(persons)*adventure.costPerHead;
  totalCost= isNaN( totalCost)? 0: totalCost;
  document.getElementById('reservation-cost').innerHTML=totalCost;

}

//Implementation of reservation form submission
 function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  let obj={ name:"", date:"", person:"",adventure: adventure.id};
  let url=`${config.backendEndpoint}/reservations/new`
  
  document.getElementById('myForm').addEventListener('submit', async (e)=> {
    e.preventDefault();
    obj.name=e.target?.name?.value || 'no-data';
    obj.date=e.target?.date?.value || 'no-data';
    obj.person=e.target?.person?.value || 'no-data';

    let apiCallPromise= fetch(url, {method:'POST',
    headers: {
      'Content-Type': 'application/json',
      },
     body:JSON.stringify(obj)
    });
    apiCallPromise.then(response =>{
      return response.json();
    }).then(adv =>{
      if(adv.reserved){
        alert('Success!');
        location.reload();
      }
    }).catch(err => {
      alert('Failed!');
    })
  });

}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if(adventure.reserved){
    document.getElementById('reserved-banner').style.display='block';
  }else{
    document.getElementById('reserved-banner').style.display='none';
  }

}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};

import officeData from "./data.js"

const searchInput = document.querySelector('.searchInput')
const officeContainer = document.querySelector('.officeContainer')

searchInput.addEventListener('change',(e)=>{
 
  const value = e.target.value?.toLowerCase().trim()
  
  const newData=officeData.filter(data=>{  

    const matchedKeyword = data.city.toLowerCase().trim().includes(value) || data.address.split(' ').pop().includes(value)
      return matchedKeyword
  })
  renderOfficeCard(newData)
})


const renderOfficeCard=(data)=>{

  officeContainer.innerHTML=''

  data.forEach((office,i) => {
    // renderMap(office.location,i)
    const officeCard = document.createElement('div')
    officeCard.classList.add('office-card');
    
    officeCard.innerHTML = `
      <h1>${office.city},${office.state}</h1>
      <p>${office.company}</p>
      <p> ${office.address}</p>
      <p><a href="mailto:${office.email}">${office.email}</a></p>
      <p>${office.officePhone}</p>
      <button class='btn'>Show in Maps</button>
    `;
    
    officeContainer.appendChild(officeCard); 

    const btn = officeCard.querySelector('.btn')
    btn.addEventListener('click',()=>{
      initMap([office])
    })
  });
}




// Initialize and add the map

async function initMap(data) {
  

  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  // The map, centered at Uluru
  const map = new Map(document.getElementById("map"), {
    zoom: 4,
    center: { lat: 39.1117665, lng: -108.6425127 },
    mapId:'demo_id'
  });

  function renderMarker(location){
    const marker= new AdvancedMarkerElement({
      position: location,
      map: map,
    });

  } 

  data.forEach(office=>{
    renderMarker(office.location)
  })
}


renderOfficeCard(officeData)
initMap(officeData)
"use strict";

// function for our list view
async function getAllRecords() {
  let getResultElement = document.getElementById("contacts");

  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer patLtkbXakgkT1gFZ.6b9484757dadc3f47ed82a9ff56bd5882c082f0a7f1bcdba4d70748365394363`,
    },
  };

  await fetch(`https://api.airtable.com/v0/appv9pErMJsyQ1KU6/Lawyers`, options)
    .then((response) => response.json())
    .then((data) => {
      console.log(data); // response is an object w/ .records array

      getResultElement.innerHTML = ""; // clear brews

      let newHtml = "";

      for (let i = 0; i < data.records.length; i++) {
        let lawyer = data.records[i].fields["Lawyer"]; // here we are getting column values
        let name = data.records[i].fields["Name"]; //here we are using the Field ID to fecth the name property
        let rating = data.records[i].fields["Rating"];
        let language = data.records[i].fields["Language"];
        let briefDescription = data.records[i].fields["BreveDescripcion"];

       newHtml += `

       <article class="col-sm-12 col-md-6 col-lg-4 col-xxl-3 justify-content-center">
       <div class = "grid-container">
          <div class = "card list-view">
           <a href="lawyersSpanish.html?id=${data.records[i].id}">
            ${
              lawyer
                ? `<img class="img-container card-img-top rounded" alt="${name}" src="${lawyer[0].url}">`
                : ``
            }
            </a>
            <div class="card-body">
              <h5 class="card-title text-center name"><strong>${name}</strong> </h5>
              <h4 class="text-center rating">★ ${rating} </h4>
              <p class="card-text description text-center">
                ${briefDescription}
              </p>
              <p class = "text-center">
              
              </p>
              <p class = "text-center language">
     
             <strong> ${language} </strong>
              </p>

            </div>
            
          </div>
        </article>
 `;
      }

      getResultElement.innerHTML = newHtml;
    });
}

async function getOneRecord(id) {
  let jobsResultElement = document.getElementById("contacts");

  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer patLtkbXakgkT1gFZ.6b9484757dadc3f47ed82a9ff56bd5882c082f0a7f1bcdba4d70748365394363`,
    },
  };

  await fetch(
    `https://api.airtable.com/v0/appv9pErMJsyQ1KU6/Lawyers/${id}`,
    options
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data); // response is a single object

      let lawyer = data.fields["Lawyer"]; // here we are getting column values
      let name = data.fields["Name"]; //here we are using the Field ID to fecth the name property
      let rating = data.fields["Rating"];
      let language = data.fields["Language"];
      let office = data.fields["Office"]; // here we are getting column values
      let website = data.fields["Website"]; //here we are using the Field ID to fecth the name property
      let email = data.fields["Email"];
      let address = data.fields["Address"];
      let phone = data.fields["Phone"];
      let description = data.fields["Descripcion"];
      let hours = data.fields["Horas"];

      let newHtml = `
  <div class="card shadow-lg p-3 mb-5 bg-white rounded ">
    <div class="row g-0">
      
      <div class="col-md-4 d-flex flex-column align-items-center p-3 profile-sidebar">
        ${
          lawyer
            ? `<img class="img-fluid rounded-circle shadow mb-3" style="width: 150px; height: 150px; object-fit: cover;" alt="${name}" src="${lawyer[0].url}">`
            : ``
        }
        <h3 class=" mb-1 text-center">${name}</h3>
        <p class="small text-secondary">Abogado/a de Inmigración</p>
        <p class="badge bg-primary text-wrap fs-6">${language}</p>
        <div class="rating-info mb-3">
            <span class="text-warning h5 me-2">★</span>
            <span class="fs-5">${rating}</span>
        </div>
      </div>
      
      <div class="col-md-8">
        <div class="card-body">
          
          <h4 class="card-title text-danger border-bottom pb-2 mb-3"><i class="fas fa-info-circle me-2"></i> Descripcion</h4>
          
          <p class="card-text description">${description}</p>
          
          <h4 class="card-title text-danger border-bottom pb-2 mt-4 mb-3"><i class="fas fa-headset me-2"></i> Contacto</h4>
          <ul class="list-unstyled">
            <li class="mb-2"><i class="fas fa-map-marker-alt me-2 text-danger"></i> <strong>Domicilio:</strong> ${address}</li>
            <li class="mb-2"><i class="fas fa-phone me-2 text-danger"></i> <strong>Telefono:</strong> <a href="tel:${phone}" class="text-dark">${phone}</a></li>
            <li class="mb-2"><i class="fas fa-envelope me-2 text-danger"></i> <strong>Correo Electronico:</strong> <a href="mailto:${email}" class="text-dark">${email}</a></li>
            ${website ? `<li class="mb-2"><i class="fas fa-globe me-2 text-danger"></i> <strong>Sitio Web:</strong> <a href="${website}" target="_blank" class="text-dark">${website}</a></li>` : ''}
          </ul>
          
          <div class="row mt-4">
            <div class="col-md-6">
              <h4 class="card-title text-danger border-bottom pb-2 mb-3"><i class="far fa-clock me-2"></i>Horas de Oficina</h4>
              <p class="card-text">${hours}</p>
              
            </div>
            
            <div class="col-md-6 d-flex align-items-center justify-content-center">
              ${
                office
                  ? `<img class="img-fluid rounded shadow-sm" alt="Office of ${name}" src="${office[0].url}">`
                  : `<div class="p-4 bg-light text-center rounded">Office Photo N/A</div>`
              }
            </div>
          </div>
          
        </div>
      </div>
    </div>
  </div>
`;

      jobsResultElement.innerHTML = newHtml;
    });
}

// look up window.location.search and split, so this would take
// https://dmspr2021-airtable-app.glitch.me/index.html?id=receHhOzntTGZ44I5
// and look at the ?id=receHhOzntTGZ44I5 part, then split that into an array
// ["?id=", "receHhOzntTGZ44I5"] and then we only choose the second one
let idParams = window.location.search.split("?id=");
if (idParams.length >= 2) {
  // has at least ["?id=", "OUR ID"]
  getOneRecord(idParams[1]); // create detail view HTML w/ our id
} else {
  getAllRecords(); // no id given, fetch summaries
}

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
        let briefDescription = data.records[i].fields["BriefDescription"];

        newHtml += `

       <article class="col-sm-12 col-md-6 col-lg-4 col-xxl-3">
       <div class = "grid-container">
          <div class = "card">
           
            ${
              lawyer
                ? `<img class="img-container card-img-top rounded" alt="${name}" src="${lawyer[0].url}">`
                : ``
            }
            
            <div class="card-body">
              <h5 class="card-title">${name}</h5>
              <p class="card-text">
                ${briefDescription}
              </p>
              <p class = "text-center">
              Rating: ${rating}
              </p>
              <p class = "text-center">
     
              ${language}
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

      let lawyer = data.records[i].fields["Lawyer"]; // here we are getting column values
      let name = data.records[i].fields["Name"]; //here we are using the Field ID to fecth the name property
      let rating = data.records[i].fields["Rating"];
      let language = data.records[i].fields["Language"];
      let office = data.records[i].fields["Office"]; // here we are getting column values
      let website = data.records[i].fields["Website"]; //here we are using the Field ID to fecth the name property
      let email = data.records[i].fields["Email"];
      let address = data.records[i].fields["Address"];
      let phone = data.records[i].fields["Phone"];
      let description = data.records[i].fields["Description"];
      let hours = data.records[i].fields["Hours"];

      let newHtml = `
        <div class="card list mb-3">
  <div class="row g-0">
    <div class="col-md-4 d-flex justify-content-center align-items-center">
     ${
       logo
         ? `<img class="img-fluid back ms-4" alt="${name}" src="${lawyer[0].url}">`
         : ``
     }
    </div>
    <div class="col-md-6 d-flex justify-content-center align-items-center desc">
      <div class="card-body">
        <h5 class="card-title bar">${name}</h5>
        <p class="card-text">${description}</p>
        <p class="card-text">Rating: <small>${rating}</p>
        <p class="card-text">${address}</p>
        <a href="${map}" target="_blank"><button type="button" class="btn btn-primary btn-sm">Get Directions</button></a>
      </div>
    </div>
  </div>
</div>

<div class="card list mb-3">
  <div class="row g-0">
    <div class="col-md-4 d-flex justify-content-center ">
    ${
      picture
        ? `<img class="img-fluid front" alt="${name}" src="${picture[0].url}">`
        : ``
    }
       </div>
       <div class="col-md-6 d-flex justify-content-center align-items-center">
       <div class="card-body">
       <div class="card-group hours mx-auto">    
  <div class="card list hours shift">
    <div class="card-body">
      <h4 class="card-title">🕔 Hours</h4>
      <p class="card-text">${formattedString(hours)}</p>
      
    </div>
  </div>
  <div class="card list hours">
    <div class="card-body">
      <h4 class="card-title">😁 🕔 Happy Hours</h4>
      <p class="card-text">${formattedString(happy)}</p>
     
    </div>
  </div>
</div>
<div class="moves">
<table class="table misc">
    <tbody>
    <tr>
      <th scope="row misc">Neighborhood</th>
      <td class="card-text">${neighborhood}</td>
    </tr>
    <tr>
      <th scope="row misc">Outdoor Seating</th>
      <td>${outdoor}</td>
    </tr>
    <tr>
      <th scope="row misc">Food Served</th>
      <td colspan="2">${formattedString(food)}</td>
    </tr>
     <tr>
      <th scope="row misc">Merchandise</th>
      <td colspan="2">${formattedString(merchandise)}</td>
    </tr>
    <tr>
      <th scope="row misc">Links</th>
      <td colspan="2"><a href="${website}" target="_blank"><button type="button" class="btn btn-primary btn-sm go">Website</button></a> <a href="${yelp}" target="_blank"><button type="button" class="btn btn-primary btn-sm go">Yelp</button></a></td>
    </tr>
  </tbody>
</table>
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

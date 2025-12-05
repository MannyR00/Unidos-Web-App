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

        newHtml += `

       <article class="col-12 col-lg-4 d-flex justify-content-center mb-4">
          <div class="card">
            ${
              lawyer
                ? `<img class="card-img-top rounded" alt="${name}" src="${lawyer[0].url}">`
                : ``
            }
            <div class="card-body">
              <h5 class="card-title">${name}</h5>
              <p class="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <p>
              ${rating}
              </p>
              <p>
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

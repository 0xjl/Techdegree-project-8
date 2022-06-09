const url = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`;
const main = document.getElementById("main");
const gridContainer = document.querySelector(".grid-container");
let employees = [];

/// fetch ///
fetch(url)
  .then((res) => res.json())
  .then((res) => res.results)
  .then(generateCards)
  .catch((err) => console.log(err));

/// generateCard function
function generateCards(data) {
  let employeeHTML = "";
  data.forEach((data, index) => {
    let name = data.name;
    let email = data.email;
    let city = data.location.city;
    let picture = data.picture;
    employeeHTML += `
    <div class="card" data-index="${index}">
    <img class="avatar" src="${picture.large}" />
    <div class="text-container">
    <h2 class="name">${name.first} ${name.last}</h2>
    <p class="email">${email}</p>
    <p class="address">${city}</p>
    </div>
    </div>
    `;
  });
  gridContainer.innerHTML = employeeHTML;
}

const url = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`;
const gridContainer = document.querySelector(".grid-container");
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");
const userInput = document.getElementById("userinput");
const nextButton = document.querySelector(".modal-next");
const previousButton = document.querySelector(".modal-previous");
let employees = [];
let employeesIndex;

/// fetch ///
let fetchResults = fetch(url)
  .then((res) => res.json())
  .then((res) => res.results)
  .then(displayEmployees)
  .catch((err) => console.log(err));

/// generateCard function
function displayEmployees(employeeData) {
  employees = employeeData;
  let employeeHTML = "";
  employees.forEach((employee, index) => {
    let name = employee.name;
    let email = employee.email;
    let city = employee.location.city;
    let picture = employee.picture;
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

//displayModal function
function displayModal(index) {
  let {
    name,
    dob,
    phone,
    email,
    location: { city, street, state, postcode },
    picture,
  } = employees[index];
  employeesIndex = employees.indexOf(employees[index]);
  let date = new Date(dob.date);
  const modalHTML = `
  <img class="avatar" src="${picture.large}" />
  <div class="text-container">
  <h2 class="name">${name.first} ${name.last}</h2>
  <p class="email">${email}</p>
  <p class="address">${city}</p>
  <hr>
  <p>${phone}</p>
  <p class="address">${street.number} ${street.name}, ${state} ${postcode}</p>
  <p>Birthday:
  ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
  </div>
  `;
  overlay.classList.remove("hidden");
  modalContainer.innerHTML = modalHTML;
}

// next card function
function nextCard() {
  if (employeesIndex < 11) {
    displayModal((employeesIndex += 1));
  }
}

// previous card function
function previousCard() {
  if (employeesIndex > 0) {
    displayModal((employeesIndex -= 1));
  }
}

// search filter function
function searchFilter() {
  const employeeNames = document.getElementsByClassName("name");
  const searchFilter = userInput.value.toUpperCase();
  const employeeArr = [...employeeNames];
  employeeArr.forEach((employee) => {
    if (employee.innerHTML.toUpperCase().indexOf(searchFilter) > -1) {
      employee.closest(".card").style.display = "flex";
    } else {
      employee.closest(".card").style.display = "none";
    }
  });
}

//event listeners
nextButton.addEventListener("click", nextCard);
previousButton.addEventListener("click", previousCard);
userInput.addEventListener("keyup", searchFilter);
modalClose.addEventListener("click", () => {
  overlay.classList.add("hidden");
});

gridContainer.addEventListener("click", (e) => {
  if (e.target !== gridContainer) {
    const card = e.target.closest(".card");
    const index = card.getAttribute("data-index");
    displayModal(index);
  }
});

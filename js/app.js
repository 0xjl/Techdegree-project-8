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
  <div class="card" id="card${index}" data-index="${index}">
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
  let date = new Date(dob.date);
  const modalHTML = `
  <img class="avatar" src="${picture.large}" />
  <div class="text-container">
  <h2 class="name">${name.first} ${name.last}</h2>
  <p class="email">${email}</p>
  <p class="address">${city}</p>
  <hr>
  <p>${phone}</p>
  <p class="address">${street.name}, ${state} ${postcode}</p>
  <p>Birthday:
  ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
  </div>
  `;
  overlay.classList.remove("hidden");
  modalContainer.innerHTML = modalHTML;
}

gridContainer.addEventListener("click", (e) => {
  if (e.target !== gridContainer) {
    const card = e.target.closest(".card");
    const index = card.getAttribute("data-index");
    displayModal(index);
  }
});

modalClose.addEventListener("click", () => {
  overlay.classList.add("hidden");
});

userInput.addEventListener("keyup", () => {
  const employeeNames = document.getElementsByClassName("name");
  const searchInput = userInput.value.toUpperCase();
  console.log(searchInput);
  const EmployeeArray = [...employeeNames];
  EmployeeArray.forEach((employee) => {
    if (employee.innerHTML.toUpperCase().indexOf(searchInput) > -1) {
      employee.closest(".card").style.display = "";
    } else {
      employee.closest(".card").style.display = "none";
    }
  });
});

function nextCard(index) {
  nextButton.addEventListener("click", (e) => {
    if (e.target.className === "modal-next") {
      if (index < 11 && index > 0) {
        index++;
        displayModal(index);
      } else {
        return index;
      }
    }
  });
}

function previousCard(index) {
  previousButton.addEventListener("click", (e) => {
    if (e.target.className === "modal-previous") {
      if (index < 11 && index > 0) {
        index--;
        displayModal(index);
      } else {
        return index;
      }
    }
  });
}

const url = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`;
const main = document.getElementById("main");
let employees = [];

/// Fetch
fetch(url)
  .then((res) => res.json())
  .then((res) => console.log(res.results))
  .catch();
/// generateCard function

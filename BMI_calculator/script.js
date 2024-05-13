const form = document.querySelector("form");
const result = document.getElementById("results");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const height = parseInt(document.getElementById("height").value.trim());
  const weight = parseInt(document.getElementById("weight").value.trim());

  if (height === "" || height < 0 || isNaN(height)) {
    result.textContent = "Please Give a Valid Height";
  } else if (weight === "" || weight < 0 || isNaN(weight)) {
    result.textContent = "Please Give a Valid Weight";
  } else {
    const bmi = (weight / ((height * height) / 10000)).toFixed(2);
    result.textContent = `Your BMI is ${bmi}`;
  }
});

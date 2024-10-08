const Base_URL =
  "https://api.currencyapi.com/v3/latest?apikey=cur_live_LwQseSC4JrWQItyY6ByQsU1lU56sbs0AoP98VThY&currencies";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".form select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "PKR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  select.addEventListener("change", (Event) => {
    updateFlag(Event.target);
  });
}

btn.addEventListener("click", async (Event) => {
  Event.preventDefault();
  let amount = document.querySelector(".amount input");
  let amtval = amount.value;

  if (amtval === "" || amtval < 1) {
    amtval = 1;
    amount.value = "1";
  }

  const URL = `${Base_URL}=${fromCurr.value},${toCurr.value}&base_currency=${fromCurr.value}`;
  try {
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data.data[toCurr.value].value;
    let finalAmount = amtval * rate;
    msg.innerText = `${amtval} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
  } catch (error) {
    msg.innerText = "Error fetching exchange rate. Please try again.";
    console.error(error);
  }
});

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

window.addEventListener("load", () => {
  updateExchangeRate();
});

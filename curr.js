const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const result = async () => {
  const URL = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCurr.value.toLowerCase()}.json`;
  let amount = document.querySelector(".amount input");
    let amtvalue = amount.value;

    if(amtvalue==="" || amtvalue<1){
        amtvalue=1;
        amount.value="1";
    }

  try {
    const response = await fetch(URL);
    if (!response.ok) throw new Error("API error");

    const data = await response.json();
    const rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    const finalrate = amtvalue * rate;
    msg.innerText = `${amtvalue} ${fromCurr.value} = ${finalrate} ${toCurr.value}`;
  } catch (err) {
    msg.innerText = "Could not fetch rate.";
    console.error(err);
  }
};


const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  result();
});

window.addEventListener("load", () => {
  result();
});
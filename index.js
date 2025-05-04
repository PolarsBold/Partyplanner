// === consts ===
const $app = document.querySelector("#app");
const partiesContainer = document.createElement("article");
const partyDataContainer = document.createElement("section");

// === functions ===
async function getParties() {
  try {
    const partiesTemp = await fetch(
      "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2504-FTB-ET-WEB-FT/events"
    );
    const parties = await partiesTemp.json();
    return parties.data;
  } catch (err) {
    console.log(err);
  }
}

async function partiesUI() {
  try {
    partiesContainer.innerHTML = "";
    partiesArray = await getParties();
    partiesArray.forEach((party) => {
      const partyDiv = document.createElement("div");
      partyDiv.classList.add("parties");
      const partyDivContent = document.createTextNode(`${party.name}`);
      partyDiv.appendChild(partyDivContent);

      partyDiv.addEventListener("click", function () {
        partyDataContainer.innerHTML = "";
        const partyData = partyInfoUI(party);
        partyDataContainer.appendChild(partyData);
      });
      partiesContainer.appendChild(partyDiv);
    });
    return partiesContainer;
  } catch (err) {
    console.log(err);
  }
}

function partyInfoUI(partyObject) {
  const partyInfoContainer = document.createElement("section");
  partyInfoContainer.classList.add("data-container");
  const nameIdContainer = document.createElement("h3");
  nameIdContainer.innerText = `${partyObject.name} #${partyObject.id}`;
  const partyTimeLocation = document.createElement("p");
  partyTimeLocation.classList.add("date-location");
  const date = partyObject.date;
  const formattedDate = new Date(date).toLocaleDateString();
  partyTimeLocation.innerHTML = `${formattedDate}<br>${partyObject.location}`;
  const partyDescription = document.createElement("p");
  partyDescription.innerText = `${partyObject.description}`;
  partyInfoContainer.append(
    nameIdContainer,
    partyTimeLocation,
    partyDescription
  );
  return partyInfoContainer;
}

function header() {
  const h1 = document.createElement("h1");
  h1.innerText = "Party Planner";
  const h2Container = document.createElement("div");
  h2Container.classList.add("h2-container");
  const h2Parties = document.createElement("h2");
  h2Parties.classList.add("p-header");
  h2Parties.innerText = "Upcoming parties";
  const h2Data = document.createElement("h2");
  h2Data.classList.add("d-header");
  h2Data.innerText = "Party details";
  h2Container.append(h2Parties, h2Data);
  document.body.prepend(h1, h2Container);
}

async function render() {
  try {
    header();
    const formattedParties = await partiesUI();
    $app.innerHTML = "<section id=names></section><article id=data></article>";
    $app.querySelector("section#names").replaceWith(formattedParties);
    $app.querySelector("article#data").replaceWith(partyDataContainer);
  } catch (err) {
    console.log(err);
  }
}
// === body ===
render();

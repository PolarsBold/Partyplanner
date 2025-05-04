// === consts ===
const partiesContainer = document.querySelector("#app");
const partyDataContainer = document.createElement("section");
document.body.append(partyDataContainer);

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
  } catch (err) {
    console.log(err);
  }
}

function partyInfoUI(partyObject) {
  const partyInfoContainer = document.createElement("section");
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
  const h2Parties = document.createElement("h2");
  h2Parties.innerText = "Upcoming parties";
  const h2Data = document.createElement("h2");
  h2Data.innerText = "Party details";
  document.body.prepend(h1, h2Parties, h2Data);
}

// === body ===
document.body.append(partyDataContainer);
header();
partiesUI();

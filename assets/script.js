const pokémonImageEl = document.getElementById("pokémon-image");
const previousEl = document.getElementById("previous");
const nextEl = document.getElementById("next");

let nextUrl = "";
let previousUrl = null;
let resultParamStart = 0;

pokédex = () => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${resultParamStart}&limit=9`;

  pokémonFetch(url);
};

pokémonFetch = (data) => {
  fetch(data)
    .then(response => response.ok ? response.json() : Promise.reject(response))
    .then(data => {
      // Hide prev button if previousUrl is null.
      previousEl.style.display = (data.previous == null) ? "none" : "";
      resultParamStart += 9;

      return data;
    })
    .then(data => getPokéDetails(data.results))
    .then(data => data.map(pokéDetail => createCard(pokéDetail)));
};

// Iterates through each url from first API fetch.
getPokéDetails = (pokémons) => Promise.all(pokémons.map(pokémon => fetch(pokémon.url)
    .then(response => response.ok ? response.json() : Promise.reject(response))
  ))
  .then(data => data);

createCard = (data) => {
  gridEl = document.createElement("div");
  cardEl = document.createElement("div");
  imgEl = document.createElement("img");
  cardBodyEl = document.createElement("div");
  pEl = document.createElement("p");

  let pokémonImg = data.sprites.other["official-artwork"].front_default;

  let cardAttributes = [
    {
      class: "card",
      style: "width: 18rem",
    },
    {
      class: "card-img-top",
      src: pokémonImg,
      alt: "",
    },
  ];

  gridEl.setAttribute("class", "col-xs-4 m-1");
  setAttributes(cardEl, cardAttributes[0]);
  setAttributes(imgEl, cardAttributes[1]);
  cardBodyEl.setAttribute("class", "card-body");
  pEl.setAttribute("class", "card-text");
  pEl.innerHTML = data.name.charAt(0).toUpperCase() + data.name.slice(1);

  cardBodyEl.append(pEl);
  cardEl.append(imgEl);
  cardEl.append(cardBodyEl);
  gridEl.append(cardEl);
  pokémonImageEl.append(gridEl);
};

setAttributes = (element, attributes) => {
  Object.keys(attributes).forEach((attr) => {
    element.setAttribute(attr, attributes[attr]);
  });
};

nextEl.addEventListener("click", () => {
  pokémonImageEl.innerHTML = "";
  pokémonFetch(`${nextUrl}?offset=${resultParamStart}&limit=9`);
});

previousEl.addEventListener("click", () => {
  pokémonImageEl.innerHTML = "";
  pokémonFetch(`${previousUrl}`);
});

numClick = (e) => {
  e.preventDefault();
  pokémonImageEl.innerHTML = "";
  pokémonFetch(
    `https://pokeapi.co/api/v2/pokemon?offset=${
      9 * (e.target.textContent - 1)
    }&limit=9`
  );
};

pokédex();

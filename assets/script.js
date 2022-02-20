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
  console.log(previousUrl);
  fetch(data)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(response);
      }
    })
    .then((data) => {
      iteratePokémon(data);
    });
};

//iterates through each url from first api fetch
async function iteratePokémon(data) {
  nextUrl = data.next;
  previousUrl = data.previous;
  resultParamStart += 9;

  let pokéList = [];

  //hide prev button if previousUrl is null
  if (previousUrl == null) {
    previousEl.style.display = "none";
  } else {
    previousEl.style.display = "";
  }

  for (let i = 0; i < data.results.length; i++) {
    await fetch(data.results[i].url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return Promise.reject(response);
        }
      })
      .then((data) => {
        pokéList.push(data);

        createCard(pokéList);
      });
  }
}

createCard = (data) => {
  gridEl = document.createElement("div");
  cardEl = document.createElement("div");
  imgEl = document.createElement("img");
  cardBodyEl = document.createElement("div");
  pEl = document.createElement("p");

  for (let i = 0; i < data.length; i++) {
    let pokémonImg = data[i].sprites.other["official-artwork"].front_default;

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
    pEl.innerHTML =
      data[i].name.charAt(0).toUpperCase() + data[i].name.slice(1);

    cardBodyEl.append(pEl);
    cardEl.append(imgEl);
    cardEl.append(cardBodyEl);
    gridEl.append(cardEl);
    pokémonImageEl.append(gridEl);
  }
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

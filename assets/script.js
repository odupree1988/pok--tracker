const pokémonImageEl = document.getElementById("pokémon-image");
const previousEl = document.getElementById("previous");
const nextEl = document.getElementById("next");

let nextUrl = "";
let resultParamStart = 0;

pokédex = () => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${resultParamStart}&limit=9`;

  pokémonFetch(url);
};

pokémonFetch = (data) => {
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

async function iteratePokémon(data) {
  nextUrl = data.next;
  resultParamStart += 9;

  let pokéList = [];

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
        console.log(data);
        pokéList.push(data);

        const divEl = document.createElement("div");
        const imageEl = document.createElement("img");

        for (let i = 0; i < pokéList.length; i++) {
          let pokémonImg = pokéList[i].sprites.front_default;

          imageEl.setAttribute("id", "pokémon-image");
          imageEl.setAttribute("src", pokémonImg);

          divEl.append(imageEl);
          pokémonImageEl.append(divEl);
        }
      });
  }
}

nextEl.addEventListener("click", () => {
  pokémonImageEl.innerHTML = "";
  pokémonFetch(`${nextUrl}?offset=${resultParamStart}&limit=9`);
});

pokédex();

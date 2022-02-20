const pokémonImageEl = document.getElementById("pokémon-image");
const previousEl = document.getElementById("previous");
const nextEl = document.getElementById("next");

let nextUrl = "";

pokédex = () => {
  const url = "https://pokeapi.co/api/v2/pokemon";

  pokémonFetch(url);
};

iteratePokémon = (data) => {
  nextUrl = data.next;

  let pokéList = [];

  for (let i = 0; i < data.results.length; i++) {
    fetch(data.results[i].url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return Promise.reject(response);
        }
      })
      .then((data) => {
        const divEl = document.createElement("div");
        const imageEl = document.createElement("img");

        pokéList.push(data);

        for (let i = 0; i < pokéList.length; i++) {
          let pokémonImg = pokéList[i].sprites.front_default;

          imageEl.setAttribute("id", "pokémon-image");
          imageEl.setAttribute("src", pokémonImg);

          divEl.append(imageEl);
          pokémonImageEl.append(divEl);
        }
      });
  }
};

nextEl.addEventListener("click", () => {
  pokémonImageEl.innerHTML = "";
  pokémonFetch(nextUrl);
});

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

pokédex();

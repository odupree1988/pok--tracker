const bodyEl = document.querySelector("body");
const previousEl = document.getElementById("previous");
const nextEl = document.getElementById("next");

let nextUrl = "";

pokédex = () => {
  const url = "https://pokeapi.co/api/v2/pokemon";

  fetch(url)
    .then((response) => {
      // The API call was successful
      if (response.ok) {
        return response.json();
        // Return error if was not successful
      } else {
        return Promise.reject(response);
      }
    })
    .then((data) => {
      iteratePokémon(data);
    });
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

          imageEl.setAttribute("src", pokémonImg);

          divEl.append(imageEl);
          bodyEl.append(divEl);
        }
      });
  }
};

nextEl.addEventListener("click", () => {
  res(nextUrl)
});

res = (data) => {
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

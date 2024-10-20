let pokemonData = [];

// Mengambil data dari server mock
async function fetchPokemon() {
  try {
    const response = await fetch("http://localhost:3000/pokemon");
    if (!response.ok) {
      throw new Error("Panggilan HTTP gagal");
    }
    const data = await response.json();
    pokemonData = data;
    renderApp();
  } catch (error) {
    console.error("Gagal mengambil data Pokémon:", error);
    renderApp();
  }
}

// Function untuk mengubah tipe Pokemon menjadi warna tertentu
function getColorForType(type) {
  const typeColors = {
    grass: "green",
    poison: "purple",
    fire: "red",
    water: "blue",
    electric: "yellow",
    psychic: "pink",
    ice: "cyan",
    dragon: "violet",
    dark: "gray",
    fairy: "pink",
  };
  return typeColors[type] || "gray";
}

function PokemonCard(props) {
  return React.createElement(
    "div",
    {
      className:
        "bg-gradient-to-r from-blue-900 via-purple-800 to-indigo-700 border-4 border-indigo-500 rounded-2xl shadow-lg p-5 m-3 text-center max-w-sm transition-all transform hover:scale-105 hover:shadow-2xl hover:border-pink-500",
    },
    React.createElement(
      "div",
      { className: "overflow-hidden mb-3" },
      React.createElement("img", {
        className:
          "w-full max-h-40 object-contain transition-transform duration-300 hover:rotate-6",
        src: props.image,
        alt: props.name,
      })
    ),
    React.createElement(
      "h2",
      { className: "text-4xl font-bold text-yellow-300 mb-2 drop-shadow-lg" },
      props.name
    ),
    React.createElement(
      "div",
      { className: "flex flex-col justify-center items-center mt-3" },
      React.createElement("p", { className: "text-xl text-gray-300" }, "Tipe:"),
      React.createElement(
        "div",
        { className: "flex justify-center space-x-2 mt-1" },
        props.types.map((type) =>
          React.createElement(
            "span",
            {
              key: type,
              className: `inline-block px-4 py-2 text-sm font-bold text-white bg-${getColorForType(
                type
              )}-600 rounded-lg hover:bg-${getColorForType(
                type
              )}-800 transition duration-300 transform hover:scale-110`,
            },
            type
          )
        )
      )
    )
  );
}

function PokemonList() {
  if (pokemonData.length === 0) {
    return React.createElement(
      "p",
      { className: "text-center text-2xl mt-12 text-gray-400 animate-pulse" }, // Efek animasi loading
      "Loading data Pokémon..."
    );
  }

  return React.createElement(
    "div",
    {
      className:
        "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6",
    },
    pokemonData.map((pokemon) =>
      React.createElement(PokemonCard, {
        key: pokemon.id,
        name: pokemon.name,
        types: pokemon.types,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`,
      })
    )
  );
}

function App() {
  return React.createElement(
    "div",
    { className: "bg-gradient-to-r from-gray-900 to-black min-h-screen p-8" }, // Gradien latar belakang lebih lembut
    React.createElement(
      "header",
      { className: "mb-12 text-center" },
      React.createElement(
        "h1",
        {
          className:
            "text-7xl font-bold text-yellow-300 drop-shadow-xl animate-pulse",
        }, // Efek animasi
        "Pokédex"
      ),
      React.createElement(
        "div",
        { className: "relative mt-6 mb-6" },
        React.createElement("div", {
          className: "absolute inset-0 border-t-4 border-yellow-600",
        }), // Garis pemisah
        React.createElement("div", { className: "border-t-4 border-gray-600" })
      )
    ),
    React.createElement(PokemonList, null)
  );
}

// Function untuk merender aplikasi
function renderApp() {
  ReactDOM.render(React.createElement(App), document.getElementById("root"));
}

// Render awal
renderApp();

// Mengambil dan menampilkan data Pokémon
fetchPokemon();

import { useState, useEffect } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [highCount, setHighCount] = useState(0);
  const [pokemonSprites, setPokemonSprites] = useState([]); // Array to store 6 sprites

  // Fetch 6 random Pokémon sprites from PokeAPI
  useEffect(() => {
    const fetchPokemonSprites = async () => {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=1000"
        ); // Fetch a list of Pokémon
        const data = await response.json();
        const sprites = [];
        for (let i = 0; i < 6; i++) {
          const PokemonUrl = data.results[i].url; // Get the URL of the random Pokémon
          const PokemonResponse = await fetch(PokemonUrl);
          const PokemonData = await PokemonResponse.json();
          sprites.push(PokemonData.sprites.front_default); // Add the sprite to the array
        }

        setPokemonSprites(sprites); // Set the array of sprites
      } catch (error) {
        console.error("Error fetching Pokémon sprites:", error);
      }
    };

    fetchPokemonSprites();
  }, []);

  const incrementCount = () => {
    setCount((prevCount) => {
      const newCount = prevCount + 1;
      if (newCount > highCount) {
        setHighCount(newCount);
      }
      return newCount;
    });
  };

  const resetCount = () => {
    setCount(0);
  };

  return (
    <>
      <h1>Count Function</h1>
      <div className="card">
        <button onClick={incrementCount}>count is {count}</button>
        <br />
        <button onClick={resetCount}>Reset</button>
        <h2>High Score! {highCount}</h2>
        <div>
          <h2>Pokémon Sprites</h2>
          <div className="sprites">
            {pokemonSprites.map((sprite, index) => (
              <img key={index} src={sprite} alt={`Pokemon ${index + 1}`} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

import { useState, useEffect } from "react";

function App() {
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [pokemonSprites, setPokemonSprites] = useState([]); // Array to store 6 sprites
  const [clickedCards, setClickedCards] = useState([]); // Track clicked cards

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
          const PokemonUrl = data.results[i].url; // Get the URL of bulbasaur to charizard
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

  const handleCardClick = (sprite) => {
    if (clickedCards.includes(sprite)) {
      // Game over: Reset the game
      alert("Game Over! You clicked the same card twice.");
      setHighScore((prevHighScore) => Math.max(prevHighScore, currentScore)); // Update high score
      setCurrentScore(0); // Reset current score
      setClickedCards([]); // Reset clicked cards
    } else {
      // Increment score and add card to clickedCards
      setClickedCards((prevClickedCards) => [...prevClickedCards, sprite]);
      setCurrentScore((prevScore) => prevScore + 1);
    }
  };

  return (
    <>
      <h1>Memory Card Game</h1>
      <div className="card">
        <h2>Current Score: {currentScore}</h2>
        <h2>High Score: {highScore}</h2>
        <div>
          <h2>Pokémon Cards</h2>
          <div className="sprites">
            {pokemonSprites.map((sprite, index) => (
              <img
                key={index}
                src={sprite}
                alt={`Pokemon ${index + 1}`}
                onClick={() => handleCardClick(sprite)} // Add click handler
                style={{
                  cursor: "pointer",
                  margin: "10px",
                  width: "100px",
                  height: "100px",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

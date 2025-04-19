import { useState, useEffect } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [highCount, setHighCount] = useState(0);
  const [pikachuImage, setPikachuImage] = useState("");

  // Fetch Pikachu's image from PokeAPI
  useEffect(() => {
    const fetchPikachuImage = async () => {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon/pikachu"
        );
        const data = await response.json();
        setPikachuImage(data.sprites.front_default); // Get the front image of Pikachu
      } catch (error) {
        console.error("Error fetching Pikachu image:", error);
      }
    };

    fetchPikachuImage();
  }, []);

  // this can be used when switching to cards for memeory cards
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
        {pikachuImage && (
          <div>
            <h2>Pikachu</h2>
            <img src={pikachuImage} alt="Pikachu" />
          </div>
        )}
      </div>
    </>
  );
}

export default App;

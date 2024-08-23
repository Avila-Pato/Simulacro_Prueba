import { useEffect, useState } from "react";

function App() {
  const [catFacts, setCatFacts] = useState([]);
  const [catGIF, setCatGIF] = useState('');
  const GIPHY_API_KEY = "Nl5V758XJcEV5Xhh7tFsI5Ws8cLKWiPU";

  useEffect(() => {
    const fetchGIF = async (query) => {
      try {
        const response = await fetch(`https://api.giphy.com/v1/gifs/search?q=${query}&api_key=${GIPHY_API_KEY}`);
        const data = await response.json();
        setCatGIF(data.data[0].images.original.url);
      } catch (error) {
        console.log(`Error: ${error}`);
      }
    };
    fetchGIF('cat');  // el fectch sera relacionado a la busqueda query  en este caso es 'cat'
  }, []);

  useEffect(() => {
    const fetchCatFacts = async () => {
      try {
        const response = await fetch('https://catfact.ninja/fact');
        const data = await response.json();
        setCatFacts(data.fact.split(" ").slice(0, 3).join(' '));
      } catch (error) {
        console.log(`Error: ${error}`);
      }
    };
    fetchCatFacts();
  }, []);

  return (
    <div className="max-w-md mx-auto p-4 pt-6 md:p-6 lg:p-12 bg-white rounded shadow-md">
      <h1 className="text-3xl font-bold mb-4 text-center  ">Cat</h1>
      <ul className="list-none mb-0 flex items-center space-x-4 font-medium ">
        <img src={catGIF} alt="Cat GIF" className="max-w-xs rounded" />
        <div className="text-gray-600">{catFacts}</div>
      </ul>
    </div>
  );
  
}

export default App;
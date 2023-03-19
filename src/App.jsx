import { useState } from "react";
import "./App.css";

const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

function App() {
  const [history, setHistory] = useState([]);
  const [catInfo, setCatInfo] = useState(null);
  const [banList, setBanList] = useState({
    origin: [],
    energy: [],
    adapt: [],
    intell: [],
  });

  const fetchAPI = async () => {
    const json = await (
      await fetch(
        `https://api.thecatapi.com/v1/images/search?has_breeds=1&api_key=${ACCESS_KEY}`
      )
    ).json();
    const url = json[0].url;
    const breed = json[0].breeds[0];
    const cat = {
      image: url,
      name: breed.name,
      desc: breed.description,
      origin: breed.origin,
      energy: breed.energy_level,
      adapt: breed.adaptability,
      intell: breed.intelligence,
    };

    setCatInfo(cat);
    setHistory((prev) => [...prev, cat]);
  };

  const handleBan = (e) => {
    if (prev[e.target.name].includes(e.target.value)) return
    else setBanList((prev) => {
      let copy = prev
      console.log(copy);
      copy[e.target.name].push(e.target.value)
      return copy
    });
    console.log(banList);
  };

  return (
    <div className="App">
      <div className="history_panel">
        <br />
        <h3>History</h3>
        {history &&
          history.map((cat) => (
            <div className="">
              <p>{cat.name}</p>
              <img src={cat.image} style={{ width: "100px" }} />
            </div>
          ))}
      </div>

      <div className="main_panel">
        <h1>CATS ARE CUTE</h1>
        {catInfo ? (
          <div className="catInfo">
            <h2>{catInfo.name}</h2>
            <p style={{ fontSize: "12px", margin: "0 50px" }}>{catInfo.desc}</p>
            <button name="origin" value={catInfo.origin} onClick={handleBan}>
              Origin: {catInfo.origin}
            </button>
            <button name="energy" value={catInfo.energy} onClick={handleBan}>
              Energy: {catInfo.energy}
            </button>
            <button name="adapt" value={catInfo.adapt} onClick={handleBan}>
              Adaptability: {catInfo.adapt}
            </button>
            <button name="intell" value={catInfo.intell} onClick={handleBan}>
              Intelligence: {catInfo.intell}
            </button>
            <img src={catInfo.image} />
          </div>
        ) : (
          <div>Click the below button to find out.</div>
        )}
        <button className="discover" onClick={fetchAPI}>
          Discover
        </button>
      </div>

      <div className="banlist_panel">
        <br />
        <h3>Ban List</h3>
        <p>Select an attribute</p>
        {banList &&
          Object.entries(banList).map((key, val) => (
            <button>
              {key}: {val}
            </button>
          ))}
      </div>
    </div>
  );
}

export default App;

import { useState } from "react";
import "./App.css";

const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

function App() {
  const [history, setHistory] = useState([]);
  const [catInfo, setCatInfo] = useState(null);
  const [banList, setBanList] = useState({
    origin: [],
    lifespan: [],
    weight: [],
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
      lifespan: breed.life_span,
      weight: breed.weight.imperial,
    };

    setCatInfo(cat);
    setHistory((prev) => [...prev, cat]);
    // console.log(cat);
  };

  const addToBanList = (e) => {
    const key = e.target.name;
    const val = e.target.value;

    if (banList[key].includes(val)) return;
    else {
      setBanList((prev) => ({
        ...prev,
        [key]: [...prev[key], val],
      }));
    }
    console.log("added to banlist", banList);
  };

  const removeFromBanList = (e) => {
    const key = e.target.name;
    const val = e.target.value; // value to remove
    const index = banList[key].indexOf(val); // find the index of val
    const list = banList[key];
    list.splice(index, 1); // remove val from the array
    setBanList((prev) => ({ // update list
      ...prev,
      [key]: list,
    }));
  };

  return (
    <div className="App">
      <div className="history_panel">
        <br />
        <h3>History</h3>
        {history &&
          history.map((cat, key) => (
            <div className="" key={key}>
              <p>{cat.name}</p>
              <img src={cat.image} style={{ width: "100px" }} />
            </div>
          ))}
      </div>

      <div className="main_panel">
        <h1>Everybody has a cat without only me</h1>
        {catInfo ? (
          <div className="catInfo">
            <h2>{catInfo.name}</h2>
            <p style={{ fontSize: "12px", margin: "0 50px" }}>{catInfo.desc}</p>
            <button name="origin" value={catInfo.origin} onClick={addToBanList}>
              {catInfo.origin}
            </button>
            <button name="weight" value={catInfo.weight} onClick={addToBanList}>
              {catInfo.weight} lbs
            </button>
            <button
              name="lifespan"
              value={catInfo.lifespan}
              onClick={addToBanList}
            >
              {catInfo.lifespan} years
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
          Object.entries(banList).map((key_list) => {
            let key = key_list[0];
            if (key === "weight") {
              return key_list[1].map((val) => (
                <button name={key} value={val} onClick={removeFromBanList}>
                  {val} lbs
                </button>
              ));
            } else if (key === "lifespan") {
              return key_list[1].map((val) => (
                <button name={key} value={val} onClick={removeFromBanList}>
                  {val} years
                </button>
              ));
            } else if (key === "origin") {
              return key_list[1].map((val) => (
                <button name={key} value={val} onClick={removeFromBanList}>
                  {val}
                </button>
              ));
            }
          })}
      </div>
    </div>
  );
}

export default App;

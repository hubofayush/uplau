import "./App.css";
import { useEffect, useState } from "react";
import upl from "./csvjson.json";

function App() {
  const [points, setPoints] = useState(100);

  const increasePoints = () => {
    if (points < 1000) {
      setPoints(points + 100);
    } else if (points < 3000) {
      setPoints(points + 200);
    } else if (points < 10000) {
      setPoints(points + 500);
    } else if (points === 10000) {
      setPoints(10000);
    }
  };

  let initsold;

  if (localStorage.getItem("sold") === null) {
    initsold = [];
  } else {
    initsold = JSON.parse(localStorage.getItem("sold"));
  }

  const [item, setItem] = useState(0);

  let i = 0;
  const next = () => {
    if (item < upl.length - 1) {
      setItem(item + 1);
      console.log(item);
    } else {
      setItem(0);
    }

    setPoints(100);
  };

  const solded = () => {
    let player = {
      name: upl[item].Name,
      sills: upl[item].SKILLS,
      team: upl[item].Team,
      points: points,
    };

    setSearch([...search, player]);
    console.log(search);
    setPoints(100);
    next();
  };
  const [search, setSearch] = useState(initsold);
  useEffect(() => {
    localStorage.setItem("sold", JSON.stringify(search));
  }, [search]);

  return (
    <>
      <div>
        <iframe
          src={upl[item].Photo}
          width="640"
          height="480"
          style={{ padding: "0" }}
        ></iframe>
        <h1>{upl[item].Name}</h1>
        <h2>{upl[item].SKILLS}</h2>
        <h2>{upl[item].Team}</h2>
        <h1>{points}</h1>
        <button className="btn btn-warning mx-2 rounded " onClick={next}>
          Next Player
        </button>
        <button className="btn btn-success rounded" onClick={solded}>
          Sold
        </button>
        <button className="btn btn-primary mx-2" onClick={increasePoints}>
          Increase
        </button>
      </div>
    </>
  );
}

export default App;

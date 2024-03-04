import { useEffect, useState } from "react";
import upl from "./csvjson.json";
import jsonToExcel from "./Components/convertor";
import Navbar from "./Components/Navbar";
// import ModifyExcel from "./Components/ModifyExcel"

function App() {
  // teams array

  // viraj 11
  const [viraj11Points, setviraj11Points] = useState(10000);
  let v11;
  if (localStorage.getItem("viraj11") === null) {
    v11 = [];
  } else {
    v11 = JSON.parse(localStorage.getItem("viraj11"));
  }
  const [viraj11, setviraj11] = useState(v11);

  // end of viraj 11

  // bhau11

  const [bhau11Points, setbhau11Points] = useState(10000);
  let bh11;
  if (localStorage.getItem("bhau11") === null) {
    bh11 = [];
  } else {
    bh11 = JSON.parse(localStorage.getItem("bhau11"));
  }
  const [bhau11, setbhau11] = useState(bh11);

  // end of bhau11

  // kaka11
  const [kaka11Points, setkaka11Points] = useState(10000);
  let k11;
  if (localStorage.getItem("kaka11") === null) {
    k11 = [];
  } else {
    k11 = JSON.parse(localStorage.getItem("kaka11"));
  }
  const [kaka11, setkaka11] = useState(k11);

  // end of kaka11

  //  end of teams points array

  // State to manage the selected option
  const [selectedTeam, setSelectedTeam] = useState(null);

  // Function to handle changes in the selected option
  const handleOptionChange = (event) => {
    setSelectedTeam(event.target.value);
  };

  // points function //
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
  // end of point function

  // lcoalstoraage
  let initsold;

  if (localStorage.getItem("sold") === null) {
    initsold = [];
  } else {
    initsold = JSON.parse(localStorage.getItem("sold"));
  }
  // end of local storage

  // main array to iterate over player csv file

  let i;
  if (localStorage.getItem("item") === null) {
    i = 0;
  } else {
    i = JSON.parse(localStorage.getItem("item"));
  }
  const [item, setItem] = useState(i);

  const next = () => {
    if (item < upl.length - 1) {
      setItem(item + 1);
      console.log(item);
    } else {
      setItem(0);
    }

    setPoints(100);
  };

  // sold function
  const solded = () => {
    if (selectedTeam === null) {
      alert("please select team");
    } else {
      // funciton for individual team
      let playerTeam = {
        name: upl[item].Name,
        points: points,
        Points_Remain: 0,
      };
      if (selectedTeam === "viraj") {
        playerTeam.Points_Remain = viraj11Points - points;
        setviraj11Points(playerTeam.Points_Remain);
        setviraj11([...viraj11, playerTeam]);
        // localStorage.setItem("viraj11", JSON.stringify(viraj11));
      }

      if (selectedTeam === "bhau") {
        playerTeam.Points_Remain = bhau11Points - points;
        setbhau11Points(playerTeam.Points_Remain);
        setbhau11([...bhau11, playerTeam]);
        // localStorage.setItem("bhau11", JSON.stringify(bhau11));
      }

      if (selectedTeam === "kaka") {
        playerTeam.Points_Remain = kaka11Points - points;
        setkaka11Points(playerTeam.Points_Remain);
        setkaka11([...kaka11, playerTeam]);
        // localStorage.setItem("kaka11", JSON.stringify(kaka11));
      }

      // end of funciton set individual team
      let player = {
        name: upl[item].Name,
        sills: upl[item].SKILLS,
        // team: upl[item].Team,
        team: selectedTeam,
        points: points,
      };

      setSearch([...search, player]);
      setPoints(100);
      console.log(kaka11);
      console.log(bhau11);
      console.log(viraj11);
      console.log(search);
      setSelectedTeam(null);
      next();
    }
  };

  // main array of player data
  const [search, setSearch] = useState(initsold);

  // useeffect
  useEffect(() => {
    localStorage.setItem("sold", JSON.stringify(search));
    localStorage.setItem("viraj11", JSON.stringify(viraj11));
    localStorage.setItem("bhau11", JSON.stringify(bhau11));
    localStorage.setItem("kaka11", JSON.stringify(kaka11));
    localStorage.setItem("item", JSON.stringify(item));
  }, [search, kaka11, bhau11, viraj11]);

  return (
    <>
      <div>
        <Navbar
          jsonToExcel={jsonToExcel}
          search={search}
          kaka11={kaka11}
          bhau11={bhau11}
          viraj11={viraj11}
        />

        <iframe
          className="mx-4 mt-4"
          src={upl[item].Photo}
          width="600"
          height="400"
          style={{ padding: "0" }}
        ></iframe>

        <div className="d-flex flex-column mx-4  justify-content-center">
          <h1>{upl[item].Name}</h1>
          <h2>{upl[item].SKILLS}</h2>
          <h2>{upl[item].Team}</h2>
        </div>
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
        <button
          className="btn btn-primary"
          onClick={() => {
            jsonToExcel(search, "upldata");
            jsonToExcel(kaka11, "Kaka11");
            jsonToExcel(bhau11, "Bhau11");
            jsonToExcel(viraj11, "viraj11");
          }}
        >
          download
        </button>
        <div className="d-flex  flex-row justify-content-center">
          <label className="fs-5 m-2">
            <input
              type="radio"
              value="bhau"
              checked={selectedTeam === "bhau"}
              onChange={handleOptionChange}
            />{" "}
            Bhau 11 ({bhau11Points})
          </label>
          <label className="fs-5 m-2">
            <input
              type="radio"
              value="kaka"
              checked={selectedTeam === "kaka"}
              onChange={handleOptionChange}
            />{" "}
            kaka 11 ({kaka11Points})
          </label>
          <label className="fs-5 m-2">
            <input
              type="radio"
              value="viraj"
              checked={selectedTeam === "viraj"}
              onChange={handleOptionChange}
            />{" "}
            Viraj 11 ({viraj11Points})
          </label>
        </div>
      </div>
    </>
  );
}

export default App;

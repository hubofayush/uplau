import { useEffect, useState } from "react";
import "./App.css";
import upl from "./csvjson.json";
import jsonToExcel from "./Components/convertor";
import Navbar from "./Components/Navbar";

function App() {
  // ** teams points array
  let tp;
  if (localStorage.getItem("Team_Points") === null) {
    tp = [
      {
        vp: 30000,
        bhp: 30000,
        kp: 30000,
      },
    ];
  } else {
    tp = JSON.parse(localStorage.getItem("Team_Points"));
  }

  const [TeamPoints, setTeamPoints] = useState(tp);

  // * end of Team points array

  // **  viraj 11
  let v11;
  // let pt;
  if (localStorage.getItem("viraj11") === null) {
    v11 = [];
    // pt = 10000;
  } else {
    v11 = JSON.parse(localStorage.getItem("viraj11"));
    // pt = v11[v11.length - 1].Points_Remain;
  }
  const [viraj11, setviraj11] = useState(v11);
  const [viraj11Points, setviraj11Points] = useState(TeamPoints[0].vp);

  // **  end of viraj 11

  //** */ bhau11

  let bh11;
  if (localStorage.getItem("bhau11") === null) {
    bh11 = [];
  } else {
    bh11 = JSON.parse(localStorage.getItem("bhau11"));
  }
  const [bhau11, setbhau11] = useState(bh11);
  const [bhau11Points, setbhau11Points] = useState(TeamPoints[0].bhp);

  // ** end of bhau11

  //**  */ kaka11
  let k11;
  if (localStorage.getItem("kaka11") === null) {
    k11 = [];
  } else {
    k11 = JSON.parse(localStorage.getItem("kaka11"));
  }
  const [kaka11, setkaka11] = useState(k11);
  const [kaka11Points, setkaka11Points] = useState(TeamPoints[0].kp);

  //**  */ end of kaka11

  // **  end of teams points array

  //*/ State to manage the selected option
  const [selectedTeam, setSelectedTeam] = useState(null);

  //*  Function to handle changes in the selected option
  const handleOptionChange = (event) => {
    setSelectedTeam(event.target.value);
  };

  //* points function //
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
  //* end of point function

  //* lcoalstoraage
  let initsold;

  if (localStorage.getItem("sold") === null) {
    initsold = [];
  } else {
    initsold = JSON.parse(localStorage.getItem("sold"));
  }
  //* end of local storage

  //* main array to iterate over player csv file

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

  //* sold function
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
        TeamPoints[0].vp = playerTeam.Points_Remain;
      }

      if (selectedTeam === "bhau") {
        playerTeam.Points_Remain = bhau11Points - points;
        setbhau11Points(playerTeam.Points_Remain);
        setbhau11([...bhau11, playerTeam]);
        TeamPoints[0].bhp = playerTeam.Points_Remain;

        // localStorage.setItem("bhau11", JSON.stringify(bhau11));
      }

      if (selectedTeam === "kaka") {
        playerTeam.Points_Remain = kaka11Points - points;
        setkaka11Points(playerTeam.Points_Remain);
        setkaka11([...kaka11, playerTeam]);
        TeamPoints[0].kp = playerTeam.Points_Remain;

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
      setSelectedTeam(null);
      next();
    }
  };

  // * unsold function

  let unsoldP;
  if (localStorage.getItem("unSold_Players") === null) {
    unsoldP = [];
  } else {
    unsoldP = JSON.parse(localStorage.getItem("Unsold_Players"));
  }

  const [unSoldPlayers, setunSoldPlayers] = useState(unsoldP);

  const unSold = () => {
    let unsoldPlayer = {
      Name: upl[item].Name,
      SKILLS: upl[item].SKILLS,
      Team: upl[item].Team,
      Photo: upl[item].Photo,
    };

    setunSoldPlayers([...unSoldPlayers, unsoldPlayer]);
    next();
  };
  // * end of unsold function
  //* main array of player data
  const [search, setSearch] = useState(initsold);

  //* useeffect
  useEffect(() => {
    localStorage.setItem("sold", JSON.stringify(search));
    localStorage.setItem("viraj11", JSON.stringify(viraj11));
    localStorage.setItem("bhau11", JSON.stringify(bhau11));
    localStorage.setItem("kaka11", JSON.stringify(kaka11));
    localStorage.setItem("item", JSON.stringify(item));
    localStorage.setItem("Team_Points", JSON.stringify(TeamPoints));
    localStorage.setItem("unSold_Players", JSON.stringify(unSoldPlayers));
  }, [search, kaka11, bhau11, viraj11, unSoldPlayers]);

  return (
    <>
      <Navbar
        jsonToExcel={jsonToExcel}
        search={search}
        kaka11={kaka11}
        bhau11={bhau11}
        viraj11={viraj11}
        unSoldPlayers={unSoldPlayers}
      />
      <div className="d-flex flex-row " style={{ width: "fit-content" }}>
        {/* // // left part // // */}
        <div className="left-part">
          <iframe
            className="mx-2 mt-2"
            src={upl[item].Photo}
            width="500"
            height="350"
            style={{ padding: "0" }}
          ></iframe>

          <div className="d-flex flex-column mx-4  justify-content-center">
            <h2 style={{ width: "auto" }}>{upl[item].Name}</h2>
            <h3>{upl[item].SKILLS}</h3>
            <h3>{upl[item].Team}</h3>
          </div>
        </div>
        {/* end of left part  */}
        {/* right part  */}
        <div className="right-side d-flex flex-column justify-content-between me-auto">
          <div className="d-flex flex-row justify-content-start">
            <div
              className="d-flex justify-content-center my-2"
              style={{
                flexDirection: "column",
                alignItems: "center",
                width: "25rem",
              }}
            >
              <h1 className="text-center " style={{ fontSize: "8rem" }}>
                {points}
              </h1>
              <button
                className="btn btn-primary mx-2 w-50  rounded-pill  "
                onClick={increasePoints}
              >
                Increase
              </button>
            </div>

            <div
              className="d-flex  flex-row justify-content-inline flex-wrap m-5"
              style={{ width: "25rem" }}
            >
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
              <label className="fs-5 m-2">
                <input
                  type="radio"
                  value="viraj"
                  checked={selectedTeam === "viraj"}
                  onChange={handleOptionChange}
                />{" "}
                Viraj 11 ({viraj11Points})
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
              <label className="fs-5 m-2">
                <input
                  type="radio"
                  value="viraj"
                  checked={selectedTeam === "viraj"}
                  onChange={handleOptionChange}
                />{" "}
                Viraj 11 ({viraj11Points})
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
              <label className="fs-5 m-2">
                <input
                  type="radio"
                  value="viraj"
                  checked={selectedTeam === "viraj"}
                  onChange={handleOptionChange}
                />{" "}
                Viraj 11 ({viraj11Points})
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
              <label className="fs-5 m-2">
                <input
                  type="radio"
                  value="viraj"
                  checked={selectedTeam === "viraj"}
                  onChange={handleOptionChange}
                />{" "}
                Viraj 11 ({viraj11Points})
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
          <div className="d-flex flex-column " style={{ alignItems: "center" }}>
            <button
              className="btn btn-success rounded w-50 my-3 "
              // style={{ marginBottom: "3rem" }}
              onClick={solded}
            >
              Sold
            </button>
            <button className="btn btn-danger mx-2 rounded" onClick={unSold}>
              Unsold
            </button>
          </div>
        </div>
        {/* // end of right part // // */}
      </div>
    </>
  );
}

export default App;

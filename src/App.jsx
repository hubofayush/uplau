import { useEffect, useState } from "react";
import "./App.css";
import upl from "./csvjson.json";
import jsonToExcel from "./Components/convertor";
import Navbar from "./Components/Navbar";
import DisplayTeam from "./Components/DisplayTeam";
import Papa from "papaparse";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddNewTeam from "./Components/AddNewTeam";

function App() {
  // ? all teams sold Array

  let sp;
  if (localStorage.getItem("soldPlayers") === null) {
    sp = [
      {
        name: "viraj11",
        playersBought: [],
      },
      {
        name: "bhau11",
        playersBought: [],
      },
      { name: "kaka11", playersBought: [] },
    ];
  } else {
    sp = JSON.parse(localStorage.getItem("soldPlayers"));
  }
  const [soldPlayers, setsoldPlayers] = useState(sp);

  // ? end of all teams sold Array

  // * demo team array
  let dt;
  if (localStorage.getItem("teamsArray") === null) {
    dt = [
      { name: "Vraj 11", value: "viraj11", points: 30000 },
      { name: "bhau 11", value: "bhau11", points: 30000 },
      { name: "Kaka 11", value: "kaka11", points: 30000 },
    ];
  } else {
    dt = JSON.parse(localStorage.getItem("teamsArray"));
  }

  const [teamArray, setteamArray] = useState(dt);
  // * end of team array

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
      // funciton for individual
      let playerTeam = {
        name: upl[item].Name,
        points: points,
        Points_Remain: 0,
      };

      // ! dynamic creactin teams array object
      for (let i = 0; i <= teamArray.length - 1; i++) {
        if (teamArray[i].value === selectedTeam) {
          playerTeam.Points_Remain = teamArray[i].points - points;

          if (soldPlayers[i].name === selectedTeam) {
            soldPlayers[i].playersBought.push(playerTeam);
            console.log(soldPlayers);
            if (playerTeam.Points_Remain > 0) {
              teamArray[i].points = playerTeam.Points_Remain;
              console.log(teamArray);
            } else {
              teamArray[i].points = 0;
            }
          }
        }
      }
      // ! end of dynamic creactin teams array object

      // end of funciton set individual team
      let player = {
        name: upl[item].Name,
        sills: upl[item].SKILLS,
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
    unsoldP = JSON.parse(localStorage.getItem("unSold_Players"));
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
    localStorage.setItem("item", JSON.stringify(item));
    localStorage.setItem("unSold_Players", JSON.stringify(unSoldPlayers));
    localStorage.setItem("teamsArray", JSON.stringify(teamArray));
    localStorage.setItem("soldPlayers", JSON.stringify(soldPlayers));
  }, [search, soldPlayers, unSoldPlayers]);

  return (
    <>
      <Router>
        <Navbar
          jsonToExcel={jsonToExcel}
          search={search}
          soldPlayers={soldPlayers}
          unSoldPlayers={unSoldPlayers}
          key={search.name}
        />

        <Routes>
          <Route
            exact
            path="/"
            element={
              <>
                <div
                  className="main_page  d-flex flex-row "
                  style={{ width: "fit-content" }}
                >
                  {/* // // left part // // */}
                  <div className="left-part">
                    <iframe
                      className="mx-4 mt-4 rounded-1"
                      src={upl[item].Photo}
                      width="500"
                      height="350"
                      style={{
                        padding: "0",
                        boxShadow: "8px 10px 10px rgba(0,0,0,.3)",
                      }}
                    />

                    <div className="player_info d-flex flex-column mx-4 p-3  justify-content-center  tw-bold text-center">
                      <h3 style={{ width: "auto" }}>{upl[item].Name}</h3>
                      <h4>{upl[item].SKILLS}</h4>
                      <h5>{upl[item].Team}</h5>
                    </div>
                  </div>
                  {/* end of left part  */}
                  {/* right part  */}
                  <div
                    className="right-side d-flex flex-column justify-content-start"
                    style={{ width: "50rem" }}
                  >
                    <div className="d-flex flex-row justify-content-start mt-5">
                      <div
                        className="d-flex justify-content-center my-2"
                        style={{
                          flexDirection: "column",
                          alignItems: "center",
                          width: "25rem",
                        }}
                      >
                        <h1
                          className="points_h1 text-center "
                          style={{ fontSize: "8rem" }}
                          key={points}
                        >
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
                        className=" teams d-flex  flex-row justify-content-inline flex-wrap m-4 "
                        style={{ width: "25rem" }}
                      >
                        {teamArray.map((team) => {
                          return (
                            <>
                              <DisplayTeam
                                team={team}
                                key={team}
                                selectedTeam={selectedTeam}
                                points={points}
                                handleOptionChange={handleOptionChange}
                              />
                            </>
                          );
                        })}
                      </div>
                    </div>
                    <div
                      className="d-flex flex-column "
                      style={{ alignItems: "center" }}
                    >
                      <button
                        className="btn btn-success rounded w-75 my-3 "
                        // style={{ marginBottom: "3rem" }}
                        onClick={solded}
                      >
                        Sold
                      </button>
                      <button
                        className="btn btn-danger w-25 mx-2 rounded"
                        onClick={unSold}
                      >
                        Unsold
                      </button>
                    </div>
                  </div>
                  {/* // end of right part // // */}
                </div>
              </>
            }
          />
          <Route exact path="/addNewTeam" element={<AddNewTeam />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;

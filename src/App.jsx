import { useEffect, useState } from "react";
import "./App.css";
// import upl from "./csvjson.json";
import jsonToExcel from "./Components/convertor";
import Navbar from "./Components/Navbar";
import DisplayTeam from "./Components/DisplayTeam";
// import Papa from "papaparse";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AddNewTeam from "./Components/AddNewTeam";
import FetchCSVData from "./Components/TeakeFIle";
import UtkHeader from "./Components/UtkHeader";

function App() {
  // section for insert the link of google sheets
  let data;
  if (localStorage.getItem("JSON_data") === null) {
    data = [];
  } else {
    data = JSON.parse(localStorage.getItem("JSON_data"));
  }

  const [JSON_data, setJSON_data] = useState(data);

  // end of  section for insert the link of google sheets

  // * image folder and image file
  // let imagepath;
  // if (localStorage.getItem("ImagePath") === null) {
  //   imagepath = [];
  // } else {
  //   imagepath = JSON.parse(localStorage.getItem("ImagePath"));
  // }
  // const [path, setpath] = useState(imagepath);
  // console.log(path);
  // * end of image folder and image file

  // ? all teams sold Array

  let sp;
  if (localStorage.getItem("soldPlayers") === null) {
    sp = [
      // {
      //   name: "viraj11",
      //   playersBought: [],
      // },
      // {
      //   name: "bhau11",
      //   playersBought: [],
      // },
      // { name: "kaka11", playersBought: [] },
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
      // { name: "Vraj 11", value: "viraj11", points: 30000 },
      // { name: "bhau 11", value: "bhau11", points: 30000 },
      // { name: "Kaka 11", value: "kaka11", points: 30000 },
    ];
  } else {
    dt = JSON.parse(localStorage.getItem("teamsArray"));
  }

  const [teamArray, setteamArray] = useState(dt);
  // * end of team array

  // ! add new team
  const addNewTeam = (team) => {
    // console.log("addNewTeam", team)
    let newTeam1 = {
      name: team.name,
      playersBought: [],
    };

    setsoldPlayers([...soldPlayers, newTeam1]);

    let newTeam2 = {
      name: team.name,
      value: team.name,
      points: team.points,
    };

    setteamArray([...teamArray, newTeam2]);
    alert("Team Added Successfully");
  };

  // ! end of add new team fucntion

  //*/ State to manage the selected option
  const [selectedTeam, setSelectedTeam] = useState(null);

  //*  Function to handle changes in the selected option
  const handleOptionChange = (event) => {
    setSelectedTeam(event.target.value);
    if (points > 100) {
      increasePoints();
    } else {
    }
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
    if (item < JSON_data.length - 1) {
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
        name: JSON_data[item].Name,
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
        name: JSON_data[item].Name,
        sills: JSON_data[item].SKILLS,
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
      Name: JSON_data[item].Name,
      SKILLS: JSON_data[item].SKILLS,
      Team: JSON_data[item].Team,
      Photo: JSON_data[item].Photo,
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

  // * photo link
  // let newImgLink = "";
  let linkHead;
  // let finalImgLink = "";
  if (JSON_data.length > 0) {
    let imgLink = JSON_data[item].Photo;
    // imgLink = imgLink.slice(33);
    linkHead = `https://drive.google.com/thumbnail?id=${imgLink.slice(33)}`;
    // newImgLink = linkHead.concat(imgLink);
    // // finalImgLink = `${newImgLink}/preview`;
    // console.log(newImgLink);

    // let name = JSON_data[item].Name.toString();
    // name = name.split(" ");

    // finalImgLink = path
    //   .filter((e) => {
    //     return e.includes(`../${name[0]} ${name[2]}`);
    //   })
    //   .toString();
    // console.log(finalImgLink);
  }

  return (
    <>
      <Router>
        <Navbar
          jsonToExcel={jsonToExcel}
          search={search}
          soldPlayers={soldPlayers}
          unSoldPlayers={unSoldPlayers}
          key={search.Name}
        />

        <Routes>
          <Route
            exact
            path="/"
            element={
              <>
                {JSON_data.length === 0 ? (
                  <>
                    <FetchCSVData
                      JSON_data={JSON_data}
                      setJSON_data={setJSON_data}
                      // setPath={setpath}
                    />
                  </>
                ) : (
                  <>
                    <UtkHeader />
                    <div className="main_page  d-flex row">
                      {/* // // left part // // */}
                      <div className="left-part col">
                        <img
                          className="mx-4 mt-4 rounded-3  "
                          src={linkHead}
                          width="300"
                          height="250"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          style={{
                            padding: "0",
                            boxShadow: "8px 10px 10px rgba(0,0,0,.3)",
                          }}
                        />

                        <div className="player_info d-flex flex-column mx-4 p-3  justify-content-center  tw-bold text-center">
                          <h3 style={{ width: "auto" }}>
                            {JSON_data[item].Name}
                          </h3>
                          <h4>{JSON_data[item].SKILLS}</h4>
                          <h5>{JSON_data[item].Team}</h5>
                        </div>
                      </div>
                      {/* end of left part  */}
                      {/* right part  */}
                      <div
                        className="right-side col d-flex flex-column justify-content-start"
                        style={{ width: "50rem" }}
                      >
                        <div className="d-flex flex-row justify-content-start align-items-center mt-5">
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
                          <div>
                            <h1>{selectedTeam}</h1>
                          </div>
                        </div>
                      </div>
                      <div className="col">
                        <div className="d-flex flex-column"></div>
                        <div
                          className=" teams d-flex  flex-row justify-content-inline flex-wrap m-4 "
                          style={{ width: "25rem" }}
                        >
                          {teamArray.length === 0 ? (
                            <span>
                              <Link
                                to="/AddNewTeam"
                                style={{
                                  textDecoration: "none",
                                  color: "white",
                                }}
                              >
                                <button className="btn btn-warning rounded">
                                  Add new Teams
                                </button>
                              </Link>
                            </span>
                          ) : (
                            teamArray.map((team) => {
                              return (
                                <>
                                  <DisplayTeam
                                    team={team}
                                    key={team}
                                    selectedTeam={selectedTeam}
                                    points={points}
                                    handleOptionChange={handleOptionChange}
                                    increasePoints={increasePoints}
                                  />
                                </>
                              );
                            })
                          )}
                        </div>
                        <div
                          className="d-flex flex-column "
                          style={{ alignItems: "center" }}
                        >
                          {" "}
                          {teamArray.length === 0 ? (
                            <>
                              <Link
                                to="/AddNewTeam"
                                style={{
                                  textDecoration: "none",
                                  color: "orange",
                                  fontSize: "20px",
                                  fontFamily: "roboto",
                                }}
                              >
                                Please Add Teams
                              </Link>
                            </>
                          ) : (
                            <>
                              <button
                                className="btn btn-success rounded  w-50 my-3"
                                // style={{ marginBottom: "3rem" }}
                                onClick={solded}
                              >
                                Sold
                              </button>
                              <button
                                className="btn btn-danger  rounded"
                                onClick={unSold}
                              >
                                Unsold
                              </button>
                            </>
                          )}
                        </div>
                      </div>

                      {/* // end of right part // // */}
                    </div>
                  </>
                )}
              </>
            }
          />
          <Route
            exact
            path="/addNewTeam"
            element={<AddNewTeam addNewTeam={addNewTeam} />}
          ></Route>
        </Routes>
      </Router>
      {/* <FetchCSVData link = {link}/> */}
    </>
  );
}

export default App;

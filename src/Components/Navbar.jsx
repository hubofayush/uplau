import React from "react";
import { Link, Route, useNavigate } from "react-router-dom";
import TaeamView from "./TaeamView";

function Navbar(props) {
  let navigate = useNavigate();

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-black">
        <div className="container-fluid">
          <Link
            className="navbar-brand fw-bold"
            to="/"
            style={{ color: "orange" }}
          >
            UPL Season 01
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav ">
              <Link
                className="nav-link fw-bold mr-5"
                to="/AddNewTeam"
                role="button"
                style={{ color: "orange" }}
              >
                Add New Team
              </Link>
              <li className="nav-item dropdown ">
                <Link
                  className="nav-link dropdown-toggle fw-bold"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ color: "orange" }}
                >
                  download
                </Link>
                <ul className="dropdown-menu" key={props.soldPlayers}>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => {
                        props.jsonToExcel(props.search, "sold players");
                      }}
                    >
                      All Sold Players
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => {
                        props.jsonToExcel(
                          props.unSoldPlayers,
                          "Unsold players"
                        );
                      }}
                    >
                      All Unsold Players
                    </button>
                  </li>

                  {props.soldPlayers?.map((team) => {
                    return (
                      <>
                        <li>
                          <button
                            className="dropdown-item"
                            onClick={() => {
                              props.jsonToExcel(
                                team.playersBought,
                                `${team.name}`
                              );
                            }}
                          >
                            {team.name}
                          </button>
                        </li>
                      </>
                    );
                  })}
                </ul>
              </li>
              <li className="nav-item dropdown ">
                <Link
                  className="nav-link dropdown-toggle fw-bold"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ color: "orange" }}
                >
                  Teams
                </Link>
                <ul className="dropdown-menu">
                  {/* <li className="dropdown-item"></li> */}
                  {props.soldPlayers?.map((team) => {
                    return (
                      <>
                        <li>
                          <button
                            className="dropdown-item"
                            onClick={() => {
                              props.setshowteamPlayers(team);
                              navigate("/TeamView");
                            }}
                          >
                            {team.name}
                          </button>
                        </li>
                      </>
                    );
                  })}
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;

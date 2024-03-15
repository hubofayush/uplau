import React from "react";

function Navbar(props) {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-black">
        <div className="container-fluid">
          <a className="navbar-brand fw-bold" style={{ color: "orange" }}>
            UPL Season 01
          </a>
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
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle fw-bold"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ color: "orange" }}
                >
                  download
                </a>
                <ul className="dropdown-menu">
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
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;

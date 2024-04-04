import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function AddNewTeam(props) {
  const [name, setname] = useState("");
  const [points, setpoints] = useState(0);
  const [iconName, seticonName] = useState("");
  const [iconSkill, seticonSkill] = useState("");
  // to navigate
  const navigate = useNavigate();

  const newTeam = () => {
    if (name === "" || points < 1 || iconName === "" || iconSkill === "") {
      alert("Please enter button valid name and Points");
    } else {
      let nt = {
        name: name,
        points: points,
        playersBought: [
          {
            name: iconName,
            points: "-",
            skill: iconSkill,
            Points_Remain: "-",
          },
        ],
      };

      props.addNewTeam(nt);
      // navigate("/");

      setname("");
      setpoints("");
      seticonName("");
      seticonSkill("");
    }
  };
  return (
    <>
      <div className="container mt-5 w-50">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Team Name
          </label>
          <input
            type="text"
            required
            className="form-control"
            id="email"
            value={name}
            onChange={(e) => {
              setname(e.target.value);
            }}
            autoFocus
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Initial Points
          </label>
          <input
            type="number"
            required
            className="form-control"
            id="points"
            value={points}
            onChange={(e) => {
              setpoints(e.target.value);
            }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Icon Player Name
          </label>
          <input
            type="text"
            required
            className="form-control"
            id="iconname"
            value={iconName}
            onChange={(e) => {
              seticonName(e.target.value);
            }}
          />
        </div>
        <div className="dropdown mb-3 w-100">
          <div
            className="btn btn-secondary dropdown-toggle"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Icon Skill
          </div>

          <ul className="dropdown-menu">
            <li>
              <button
                className="dropdown-item"
                value="RIGHT HAND BATSMAN"
                onClick={(e) => {
                  seticonSkill(e.target.value);
                  console.log(iconSkill);
                }}
              >
                RIGHT HAND BATSMAN
              </button>
              <button
                className="dropdown-item"
                value="RIGHT HAND BATSMAN"
                onClick={(e) => {
                  seticonSkill(e.target.value);
                }}
              >
                LEFT HAND BATSMAN
              </button>
              <button
                className="dropdown-item"
                value="RIGHT HAND BATSMAN"
                onClick={(e) => {
                  seticonSkill(e.target.value);
                }}
              >
                LEFT HAND BOWLER
              </button>
              <button
                className="dropdown-item"
                value="RIGHT HAND BATSMAN"
                onClick={(e) => {
                  seticonSkill(e.target.value);
                }}
              >
                RIGHT HAND BOWLER
              </button>
              <button
                className="dropdown-item"
                value="RIGHT HAND BATSMAN"
                onClick={(e) => {
                  seticonSkill(e.target.value);
                }}
              >
                ALL ROUNDER
              </button>
              <button
                className="dropdown-item"
                value="RIGHT HAND BATSMAN"
                onClick={(e) => {
                  seticonSkill(e.target.value);
                }}
              >
                WICKET KEEPER BOWLER
              </button>
              <button
                className="dropdown-item"
                value="RIGHT HAND BATSMAN"
                onClick={(e) => {
                  seticonSkill(e.target.value);
                }}
              >
                WICKET KEEPER BATSMAN
              </button>
            </li>
          </ul>
        </div>

        <div className="d-flex justify-content-center">
          <button
            type="submit"
            className="btn btn-primary w-50"
            onClick={newTeam}
          >
            Add
          </button>
        </div>
      </div>
    </>
  );
}

export default AddNewTeam;

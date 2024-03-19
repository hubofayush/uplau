import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function AddNewTeam(props) {
  const [name, setname] = useState("");
  const [points, setpoints] = useState(0);

  // to navigate
  const navigate = useNavigate();

  const newTeam = () => {
    if (name === "" || points < 1) {
      alert("Please enter a valid name and Points");
    } else {
      let nt = {
        name: name,
        points: points,
        playersBought: [],
      };

      props.addNewTeam(nt);
      // navigate("/");

      setname("");
      setpoints("");
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

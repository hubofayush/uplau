import React from "react";

function AddNewTeam() {
  return (
    <>
      <div className="container mt-5 w-50">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Team Name
          </label>
          <input type="text" className="form-control" id="email" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Initial Points
          </label>
          <input type="number" className="form-control" id="points" />
        </div>

        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-primary w-50">
            Submit
          </button>
        </div>
      </div>
    </>
  );
}

export default AddNewTeam;

import React from "react";
import { MdDelete } from "react-icons/md";
import { Link, Route, useNavigate } from "react-router-dom";

function DeleteDataset(props) {
  let data;
  if (localStorage.getItem("JSON_data") === null) {
    data = [];
  } else {
    data = JSON.parse(localStorage.getItem("JSON_data"));
  }

  const deletedata = () => {
    if (confirm("Delete Dataset")) {
      localStorage.removeItem("JSON_data");
      localStorage.removeItem('teamsArray')
      localStorage.removeItem('unSold_Players')
      localStorage.removeItem('sold')
      localStorage.removeItem('soldPlayers')
      localStorage.removeItem('item')
      props.setdata([]);
      //   if (data.length === 0) {
      navigate("/");

      //   console.log(data);
    }
  };

  let navigate = useNavigate();
  return (
    <>
      <div className="container mt-5">
        <h2 className="text-center m-3">Delete Datasets</h2>
        {data.length === 0 ? (
          <>
            <h1 className="text-center">No dataset Found</h1>
          </>
        ) : (
          <>
            <div
              className="container d-flex flex-row justify-content-between align-items-center "
              style={{
                backgroundColor: "#eee",
                padding: "2rem",
                width: "40rem",
                margin: "2rem auto",
                borderRadius: ".875rem",
                // boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)"
                boxShadow:
                  "2px 2px 8px rgba(0, 0, 0, 0.3), -2px -2px 8px rgba(255, 255, 255, 0.3)",
              }}
              onMouseOver={(e) => {
                e.target.style.boxShadow =
                  "4px 4px 16px rgba(0, 0, 0, 0.5), -4px -4px 16px rgba(255, 255, 255, 0.5)";
              }}
              onMouseOut={(e) => {
                e.target.style.boxShadow =
                  "2px 2px 8px rgba(0, 0, 0, 0.3), -2px -2px 8px rgba(255, 255, 255, 0.3)";
              }}
            >
              <span className="fs-5">Dataset</span>
              <button
                className="btn"
                onClick={() => {
                  deletedata();
                }}
              >
                <MdDelete size={30} />
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default DeleteDataset;

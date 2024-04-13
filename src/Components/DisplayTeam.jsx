import React from "react";

function DisplayTeam(props) {
  return (
    <>
      {props.team.points >= props.points ? (
        <label className=" m-2 fs-5">
          <input
            type="radio"
            value={props.team.value}
            checked={props.selectedTeam === props.team.value}
            onChange={(e) => {
              props.handleOptionChange(e);
            }}
          />{" "}
          {props.team.name} {props.team.points}
        </label>
      ) : (
        <></>
      )}
    </>
  );
}

export default DisplayTeam;

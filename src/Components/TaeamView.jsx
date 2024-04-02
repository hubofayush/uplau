import React from "react";
import { json } from "react-router-dom";

function TaeamView(props) {
  //   let teamArray;
  //   if (localStorage.getItem("soldPlayers") === null) {
  //     teamArray = [];
  //   } else {
  //     teamArray = JSON.parse(localStorage.getItem("soldPlayers"));
  //   }
  //   //   console.log(teamArray);

  //   let team_name = teamArray.filter((e) => {
  //     return e.name === props.team?.name;
  //   });

  //   console.log(props.team);
  //   console.log(team_name);
  let teamArray = [];
  if (props.team) {
    teamArray = props.team?.playersBought;
  }
  console.log(teamArray);
  let i = 0;
  return (
    <>
      <div className="container">
        <h1 className="text-center">{props.team?.name}</h1>
        <table className="table w-100">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Points</th>
              <th scope="col">Skill</th>
              <th scope="col">Points Remain</th>
            </tr>
          </thead>
          <tbody>
            {!teamArray ? (
              <></>
            ) : (
              teamArray.map((e) => {
                i++;
                return (
                  <tr key={e.name}>
                    <td>{i}</td>
                    <td>{e.name}</td>
                    <td>{e.points}</td>
                    <td>{e.skill}</td>
                    <td>{e.Points_Remain}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default TaeamView;

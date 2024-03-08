// import React from "react
import { useState } from "react";
// import jsonToExcel from "./convertor";

function TeamPoints() {
  // ** Viraj 11 Points  ----------------------------------------------
  let vpPoints;
  if (localStorage.getItem("Viraj_Points") === null) {
    vpPoints = 10000;
  } else {
    vpPoints = JSON.parse(localStorage.getItem("Viraj_Points"));
  }
  const [vp, setvp] = useState(vpPoints);

  // ** end of viraj teams  points ------------------------------------

  // ** Bhau 11 Points  --------------------------------------------
  let bhPoints;
  if (localStorage.getItem("Bhau_Points") === null) {
    bhPoints = 10000;
  } else {
    bhPoints = JSON.parse(localStorage.getItem("Bhau_Points"));
  }
  const [bhp, setbhp] = useState(bhPoints);
  // ** end of Bhau11 points  ----------------------------------------

  // ** Kaka 11 points  -----------------------------------------------

  let kpPoints;
  if (localStorage.getItem("Kaka_Points") === null) {
    kpPoints = 10000;
  } else {
    kpPoints = JSON.parse(localStorage.getItem("Kaka_Points"));
  }
  const [kp, setkp] = useState(kpPoints);

  useEffect(() => {
    localStorage.setItem("Viraj_Points", JSON.stringify(vp));
    localStorage.setItem("Bhau_Points", JSON.stringify(bhp));
    localStorage.setItem("Kaka_Points", JSON.stringify(kp));
  }, [vp, bhp, kp]);

  return (PP = {
    vp: vp,
    bhp: bhp,
    kp: kp,
  });
}

export default TeamPoints;

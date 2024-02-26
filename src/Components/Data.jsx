import React from "react";

const Data = () => {
  fetch("/home/ayush/Documents/MERN/auction/upl/uplau/public/upl.csv")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
    });
};

export default Data;

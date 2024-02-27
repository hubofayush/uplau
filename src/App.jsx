import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import "./App.css";
import { useEffect, useState } from "react";
import upl from "./csvjson.json";
import jsonToExcel from "./Components/convertor";

// json to xlsx file convertor
// const jsonToExcel = (data, fileName) => {
//   const worksheet = XLSX.utils.json_to_sheet(data);
//   const workbook = XLSX.utils.book_new();
//   XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

//   const excelBuffer = XLSX.write(workbook, {
//     bookType: "xlsx",
//     type: "array",
//   });
//   const blob = new Blob([excelBuffer], {
//     type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
//   });
//   saveAs(blob, `${fileName}.xlsx`);
// };

// end of json to xlsx file convertor

function App() {
  // points function //
  const [points, setPoints] = useState(100);

  const increasePoints = () => {
    if (points < 1000) {
      setPoints(points + 100);
    } else if (points < 3000) {
      setPoints(points + 200);
    } else if (points < 10000) {
      setPoints(points + 500);
    } else if (points === 10000) {
      setPoints(10000);
    }
  };
  // end of point function

  // lcoalstoraage
  let initsold;

  if (localStorage.getItem("sold") === null) {
    initsold = [];
  } else {
    initsold = JSON.parse(localStorage.getItem("sold"));
  }
  // end of local storage

  // main array to iterate over player csv file
  const [item, setItem] = useState(0);

  let i = 0;
  const next = () => {
    if (item < upl.length - 1) {
      setItem(item + 1);
      console.log(item);
    } else {
      setItem(0);
    }

    setPoints(100);
  };

  // sold function
  const solded = () => {
    let player = {
      name: upl[item].Name,
      sills: upl[item].SKILLS,
      team: upl[item].Team,
      points: points,
    };

    setSearch([...search, player]);
    console.log(search);
    setPoints(100);
    next();
  };

  // main array of player data
  const [search, setSearch] = useState(initsold);

  // useeffect
  useEffect(() => {
    localStorage.setItem("sold", JSON.stringify(search));
  }, [search]);

  return (
    <>
      <div>
        <iframe
          src={upl[item].Photo}
          width="640"
          height="480"
          style={{ padding: "0" }}
        ></iframe>
        <h1>{upl[item].Name}</h1>
        <h2>{upl[item].SKILLS}</h2>
        <h2>{upl[item].Team}</h2>
        <h1>{points}</h1>
        <button className="btn btn-warning mx-2 rounded " onClick={next}>
          Next Player
        </button>
        <button className="btn btn-success rounded" onClick={solded}>
          Sold
        </button>
        <button className="btn btn-primary mx-2" onClick={increasePoints}>
          Increase
        </button>
        <button
          onClick={() => {
            jsonToExcel(search, "upldata");
          }}
        >
          download
        </button>
      </div>
    </>
  );
}

export default App;

// import { useEffect, useState } from 'react'
import axios from "axios"; // Import Axios

// export default function FetchCSVData(link) {
//     const [csvData, setCsvData] = useState([]);

//     useEffect(() => {
//         fetchCSVData();    // Fetch the CSV data when the component mounts
//     }, []); // The empty array ensures that this effect runs only once, like componentDidMount

//     const fetchCSVData = () => {
//     const csvUrl = link; // Replace with your Google Sheets CSV file URL

//         axios.get(csvUrl)    // Use Axios to fetch the CSV data
//             .then((response) => {
//                 const parsedCsvData = parseCSV(response.data);        // Parse the CSV data into an array of objects
//                 setCsvData(parsedCsvData);        // Set the fetched data in the component's state
//                 console.log(parsedCsvData);        // Now you can work with 'csvData' in your component's state.
//             })
//             .catch((error) => {
//                 console.error('Error fetching CSV data:', error);
//             });
//     }

//     function parseCSV(csvText) {
//         const rows = csvText.split(/\r?\n/);        // Use a regular expression to split the CSV text into rows while handling '\r'
//         const headers = rows[0].split(',');        // Extract headers (assumes the first row is the header row)
//         const data = [];        // Initialize an array to store the parsed data
//         for (let i = 1; i < rows.length; i++) {
//             const rowData = rows[i].split(',');          // Use the regular expression to split the row while handling '\r'
//             const rowObject = {};
//             for (let j = 0; j < headers.length; j++) {
//                 rowObject[headers[j]] = rowData[j];
//             }
//             data.push(rowObject);
//         }
//         return data;
//     }
//     return csvData;
// }
import React, { useEffect, useState } from "react";
import { json } from "react-router-dom";

export default function TakeFIle() {
  const [link, setLink] = useState("");

  const [csvData, setCsvData] = useState([]);

  // The empty array ensures that this effect runs only once, like componentDidMount

  const fetchCSVData = (link) => {
    const csvUrl = link; // Replace with your Google Sheets CSV file URL

    axios
      .get(csvUrl) // Use Axios to fetch the CSV data
      .then((response) => {
        const parsedCsvData = parseCSV(response.data); // Parse the CSV data into an array of objects
        setCsvData(parsedCsvData); // Set the fetched data in the component's state
        console.log(parsedCsvData); // Now you can work with 'csvData' in your component's state.
      })
      .catch((error) => {
        console.error("Error fetching CSV data:", error);
      });
  };

  function parseCSV(csvText) {
    const rows = csvText.split(/\r?\n/); // Use a regular expression to split the CSV text into rows while handling '\r'
    const headers = rows[0].split(","); // Extract headers (assumes the first row is the header row)
    const data = []; // Initialize an array to store the parsed data
    for (let i = 1; i < rows.length; i++) {
      const rowData = rows[i].split(","); // Use the regular expression to split the row while handling '\r'
      const rowObject = {};
      for (let j = 0; j < headers.length; j++) {
        rowObject[headers[j]] = rowData[j];
      }
      data.push(rowObject);
    }
    console.log(csvData);
    return data;
  }

  useEffect(() => {
    localStorage.setItem("JSON_data", JSON.stringify(csvData));
  }, [csvData]);

  return (
    <div
      className="container mt-5 "
      style={{ width: "100vh", height: "100vh" }}
    >
      <h2>Choose File for Players Data</h2>
      <div className="input-group mt-2  mb-3 w-100 d-flex justify-contetn-center">
        <input type="file" className="form-control" id="inputGroupFile02" />
        <label className="input-group-text" htmlFor="inputGroupFile02">
          Upload
        </label>
      </div>

      <h3 className="text-center">or</h3>

      <h2> enter a google sheet link in csv form</h2>
      <div className="input-group mt-2  mb-3 w-100 d-flex justify-contetn-center">
        <input
          type="link"
          className="form-control"
          id="inputGrouplink"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <label
          className="input-group-text"
          htmlFor="inputGrouplink"
          onClick={() => {
            fetchCSVData(link);
          }}
        >
          Upload
        </label>
      </div>
    </div>
  );
}

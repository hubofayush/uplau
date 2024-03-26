// import axios from "axios"; // Import Axios

import React, { useEffect, useState } from "react";
import Papa from "papaparse";
export default function TakeFIle(props) {
  // const [link, setLink] = useState("");

  // const [csvData, setCsvData] = useState([]);

  // The empty array ensures that this effect runs only once, like componentDidMount

  // const fetchCSVData = (link) => {
  //   const csvUrl = link; // Replace with your Google Sheets CSV file URL

  //   axios
  //     .get(csvUrl) // Use Axios to fetch the CSV data
  //     .then((response) => {
  //       const parsedCsvData = parseCSV(response.data); // Parse the CSV data into an array of objects
  //       setCsvData(parsedCsvData); // Set the fetched data in the component's state
  //       console.log(parsedCsvData); // Now you can work with 'csvData' in your component's state.
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching CSV data:", error);
  //     });
  // };

  // function parseCSV(csvText) {
  //   const rows = csvText.split(/\r?\n/); // Use a regular expression to split the CSV text into rows while handling '\r'
  //   const headers = rows[0].split(","); // Extract headers (assumes the first row is the header row)
  //   const data = []; // Initialize an array to store the parsed data
  //   for (let i = 1; i < rows.length; i++) {
  //     const rowData = rows[i].split(","); // Use the regular expression to split the row while handling '\r'
  //     const rowObject = {};
  //     for (let j = 0; j < headers.length; j++) {
  //       rowObject[headers[j]] = rowData[j];
  //     }
  //     data.push(rowObject);
  //   }
  //   return data;
  // }
  // console.log(props.JOSN_data);

  // useEffect(() => {
  //   localStorage.setItem("JSON_data", JSON.stringify(csvData));
  //   props.setJSON_data(csvData);
  // }, [csvData]);
  // const [file, setFile] = useState();

  // const fileReader = new FileReader();

  // const handleOnChange = (e) => {
  //   setFile(e.target.files[0]);
  // };

  // const handleOnSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(file);

  //   fileReader.onload = function (event) {
  //     const output = event.target.result;
  //     console.log(output);
  //   };
  //   // console.log("first");
  // };

  const [userJSON, setUserJSON] = useState([]);
  const [uploadedCSV, setUploadedCSV] = useState();
  const [uploadFolder, setUploadFolder] = useState();
  const [imagePath, setimagePath] = useState([]);

  const handleFolderSubmit = (e) => {
    console.log(uploadFolder);

    for (let i = 0; i < uploadFolder.length; i++) {
      imagePath.push(uploadFolder[i].webkitRelativePath);
      // console.log(uploadFolder[i].webkitRelativePath);
    }
    console.log(uploadFolder);
    console.log(imagePath);

    // let path = imagePath
    //   .filter((e) => {
    //     return e.includes("Gitesh");
    //   })
    //   .toString();
    // console.log(typeof path);
  };
  const filereader = new FileReader();
  const handleFolderUpload = (event) => {
    setUploadFolder(event.target.files);
    // console.log(event.target.files);
    filereader.readAsDataURL(event.target.files);
    filereader.onload = function () {
      var fileContent = filereader.result;
      console.log(fileContent);
    };
    // for (let i = 0; i < uploadFolder.length; i++) {
    //   console.log(uploadFolder[i].webkitRelativePath);
    //   // console.log(i);
  };

  const handleCSVSubmit = (e) => {
    // e.prevetnDefault();

    Papa.parse(uploadedCSV, {
      header: true,
      complete: (results) => {
        console.log({ results });
        // let data = results.data;
        setUserJSON(results.data);
      },
    });
  };
  // console.log(userJSON);
  const handleCSVUpload = (e) => {
    // console.log(e.target.files[0]);
    setUploadedCSV(e.target.files[0]);
  };

  useEffect(() => {
    localStorage.setItem("JSON_data", JSON.stringify(userJSON));
    localStorage.setItem("ImagePath", JSON.stringify(imagePath));
    props.setJSON_data(userJSON);
    props.setPath(imagePath);
  }, [userJSON, imagePath]);

  return (
    <div
      className="container mt-5 "
      style={{ width: "100vh", height: "100vh" }}
    >
      <h2>Choose File for Players Data</h2>
      <div
        className="input-group mt-2  mb-3 w-100 d-flex justify-contetn-center"
        // onSubmit={(e) => {
        //   handleCSVSubmit(e);
        // }}
      >
        <input
          type="file"
          accept=".csv"
          className="form-control"
          id="inputGroupFile02"
          onChange={handleCSVUpload}
        />
        <button
          className="input-group-text"
          htmlFor="inputGroupFile02"
          type="submit"
          onClick={(e) => {
            handleCSVSubmit(e);
          }}
        >
          Upload
        </button>
      </div>

      {/* <h3 className="text-center">or</h3>

      <h2> enter a google sheet link in csv form</h2>
      <div className="input-group mt-2  mb-3 w-100 d-flex justify-contetn-center">
        <input
          type="link"
          className="form-control"
          id="inputGrouplink"
          value={link}
          // onChange={(e) => setLink(e.target.value)}
        />
        <label
          className="input-group-text"
          htmlFor="inputGrouplink"
          // onClick={() => {}}
        >
          Upload
        </label>
      </div> */}
      <div>
        <input
          type="file"
          className=""
          webkitdirectory="true"
          multiple="multiple"
          onChange={handleFolderUpload}
          mozfullpath="true"
        />

        <button
          className="btn btn-success"
          onClick={(e) => {
            handleFolderSubmit(e);
          }}
        >
          Upload
        </button>
        {/* <label for="folder">Select folder</label>
        <input
          type="file"
          id="folder"
          multiple
          onChange={(e) => {
            handleFolderUpload(e);
          }}
        /> */}
      </div>
    </div>
  );
}

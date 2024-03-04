// import React, { useEffect } from "react";
// import * as XLSX from "xlsx";

// const ModifyExcel = () => {
//   const workbook = XLSX.readFile("src/assets/upldata.xlsx", {
//     cellFormula: true,
//   });
//   const sheetName = workbook.SheetNames[0];
//   const sheet = workbook.Sheets[sheetName];
//   const jsonData = XLSX.utils.sheet_to_json(sheet);

//   jsonData.forEach((row) => {
//     row.someColumnName = "some value";
//   });

//   const modifiedSheet = XLSX.utils.json_to_sheet(jsonData);

//   workbook.Sheets[sheetName] = modifiedSheet;
//   XLSX.writeFile(workbook, "src/assets/upldata.xlsx");

//   return <div>Modifying Excel file...</div>;
// };

// export default ModifyExcel;
import * as ExcelJs from "exceljs";

const ModifyExcel = async () => {
  const workbook = new ExcelJs.Workbook();
  await workbook.xlsx.readFile("src/assets/upldata.xlsx");

  const sheet = workbook.getWorksheet(1);
  // console.log(sheet.name

  let data = sheet.getRow;
  console.log(data);
};

export default ModifyExcel;

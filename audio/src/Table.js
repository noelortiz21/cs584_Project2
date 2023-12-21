import React from "react";
import Row from "./Row.js";

function Table() {
  const [data, setData] = React.useState([]);
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [status, setStatus] = React.useState("idle");
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  React.useEffect(() => {
    if (!selectedFile) return;

    const runEffect = async () => {
      let formData = new FormData();
      formData.append("my_audio_file", selectedFile);
      try {
        const response = await fetch("http://localhost:8086/api/file_tempo", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
            //if the response is ok i want to save it to the database mongo how do i do this
          const json = await response.json();
          const nextData = [...data, json];
          setData(nextData);
          console.log(json);
          await fetch("http://localhost:8086/api/file_tempo/save_data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(json),
  });
        //   const data = {
        //     filename: json.filename,
        //     overall_tempo: json.overall_tempo,
        //     peak_1: json.peak_1,
        //     peak_2: json.peak_2,
        //   };

        //   const writeToDB = await fetch(
        //     "http://localhost:8086/api/file_tempo/api/fetch_data",
        //     {
        //       method: "POST",

        //       body: JSON.stringify(data),
        //     }
        //   );
        } else {
          throw new Error("Network response error");
        }
      } catch (error) {
        console.log("error fetching data", error);
      }
    };
    runEffect();
  }, [selectedFile]);

  return (
    <>
      <input type="file" id="fileInput" onChange={handleFileChange} />
      <table>
        <thead>
          <tr>
            <th>filename</th>
            <th>Overall Tempo</th>
            <th>Peak 1</th>
            <th>Peak 2</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 &&
            data.map((rowData) => (
              <Row key={rowData.filename} rowData={rowData}></Row>
            ))}
        </tbody>
      </table>
    </>
  );
}
export default Table;

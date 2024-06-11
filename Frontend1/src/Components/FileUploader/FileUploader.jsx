import React from "react";
import "./FileUploader.css";
import { useState } from "react";

function FileUploader({ label }) {
  const { file, setFile } = useState(null);

  function handleUpload() {
    if (!file) {
      console.log("No file selected");
      return;
    }

    const fd = new FormData();
    fd.append("file", file);
  }

  // Maneja el clic en el botón para volver a cargar
  const handleVolverACargar = () => {
    // Resetea el estado del archivo elegido y el estado de envío
    setFile(null);
  };


  // const ENDPOINT_AUTH_FACT = '' 
  // const apiBlov = () => {

  //   const res = await fetch(ENDPOINT_AUTH_LOGIN, {
  //     method: 'POST',
  //     body: JSON.stringify(datauser),
  //     headers: {
  //         'Content-Type': 'application/json',
  //     }
  // });


  
  return (
    <div>
      <h4 className="h2_FU">{label}</h4>
      {/* <p className='p_FU'>Selecciona archivo pdf</p> */}
      {/* <input type="file" onChange={onChange} className='upload-file-button'/> */}

      <div className="upload-button-container">
        <label htmlFor="file-upload" className="upload-file-button">
          Seleccionar Archivo
        </label>
        <input
          type="file"
          id="file-upload"
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
          className="upload-file-input"
          accept="application/pdf"
        />

        {file ? (
          <>
            <p>Archivo seleccionado: {file.name}</p>
            <button type="button" onClick={handleVolverACargar}>
              Volver a cargar
            </button>
            <p></p>
          </>
        ) : (
          <p>Ningún archivo seleccionado</p>
        )}
      </div>
    </div>
  );
}

export default FileUploader;

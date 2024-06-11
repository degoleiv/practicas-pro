import { useState, useEffect } from "react";
import "./Classification.css";
import jsonData from "../../Logic/example.json";

import { VideoPlayer } from "../../Components/VideoPlayer/VideoPlayer";

export function Classification() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const legalizacion = JSON.parse(JSON.stringify(jsonData));
    const keys = Object.keys(legalizacion);
    setData(keys);

    
  }, []);

  const [selectedOption, setSelectedOption] = useState("");
  
  const handleInputChange = (event) => {
    const {  value } = event.target;
   
    setSelectedOption(value);
  };



  const handleEnviarClasificacion = () => {
    sessionStorage.setItem("clasificacion", selectedOption);
    console.log("Clasificación:", selectedOption);
  };

  return (
    <div>
      <h1 className="h1_clas">Clasificación</h1>

      <div className="contenedor_clas">
        <div className="columna_clas columna1_clas">
          <h2 className="h2_clasificacion">Clasificación de la práctica</h2>
         
          <select
            name="practica"
            id="practica"
            required
            title="Por favor, seleccione su estado civil"
            onChange={handleInputChange}
          >
            <option value="">Seleccionar</option>
            {data.map((value, idx) => (
              <option key={idx} value={value}>{value}</option>
            ))}
          </select>
      
          <div className="cont_boton">
            <button
              className="button_enviar_clasificacion"
              type="submit"
              onClick={handleEnviarClasificacion}
            >
              Enviar
            </button>
          </div>
   
        
       
         
        </div>




        <div className="columna_clas columna2_cals">
          <h2 className="h2_clas">Video tutorial</h2>
          <VideoPlayer src="ruta/al/video.mp4" />
          <h2 className="h2_t">Documentos y manuales</h2>
          <a
            href="ruta/al/archivo.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instructivo auto matriculacion.pdf
          </a>
          <a
            href="ruta/al/archivo.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Lineamientos_PP_acuerdo009.pdf
          </a>
        </div>
      </div>
    </div>
  );
}

export default Classification;

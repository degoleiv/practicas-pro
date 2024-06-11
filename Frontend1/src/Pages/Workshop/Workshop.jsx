
import './Workshop.css';
import FileUploader from '../../Components/FileUploader/FileUploader';

import {VideoPlayer} from '../../Components/VideoPlayer/VideoPlayer';
// import ApprovalStatus from '../../Components/ApprovalStatus/ApprovalStatus'; // Importa el componente ApprovalStatus

function Workshop() {


  return (
    <div>
      <h1 className="h1_t">Etapa taller y evaluacion</h1>

      <div className="contenedor">
        <div className="columna columna1">
          <h2>Ingreso a Moddle</h2>
          
          
          <button className='button-moodle'>
            <img src='/favicon.png' alt='favicon' className='icon-moodle'></img>
            <span className='text-moodle'>Acceso Institucional</span>
        </button>
                  
          

          <h2>Carga evidencia taller</h2>
          <FileUploader label="Subir archivo"  />
          
       

          {/* {archivoElegido && !enviado && (
            <button type="button" onClick={handleEnviarArchivo}>Enviar</button>
          )} */}

          {/* {enviado && (
            <ApprovalStatus />
          )} */}
        </div>

        <div className="columna columna2">
          <h1>Video tutorial</h1>
          <VideoPlayer src="ruta/al/video.mp4" />

          <h1>Documentos y manuales</h1>
          <a href="ruta/al/archivo.pdf" target="_blank" rel="noopener noreferrer">Instructivo auto matriculacion.pdf</a>
          <a href="ruta/al/archivo.pdf" target="_blank" rel="noopener noreferrer">Lineamientos_PP_acuerdo009.pdf</a>
      
        </div>
      </div>
    </div>
  );
}

export default Workshop;


  import { useState } from 'react';
  import { useEffect } from 'react';
  import { FaFilePdf } from "react-icons/fa6";
  import './Legalization';
  import jsonData from '../../Logic/example.json'; // Importar el JSON con la información
  // import FileUploader from '../../Components/FileUploader/FileUploader';

  import {VideoPlayer} from '../../Components/VideoPlayer/VideoPlayer';

import FileUploader from '../../Components/FileUploader/FileUploader';
  // import ApprovalStatus from '../../Components/ApprovalStatus/ApprovalStatus';
  
  // ... (importaciones y otros estados y funciones)

export default function Legalization() {
 
  const [data, setData] = useState([]);
  useEffect(() => {
    const legalizacion = JSON.parse(JSON.stringify(jsonData));
    const seleccion = sessionStorage.getItem('clasificacion');
    
    for (let clave in legalizacion) {
        if (seleccion === clave) {
            setData(legalizacion[clave]);
            break;
        }
    }
     console.log(data);
  }, []);
  
  return (
    <article>
      <h1 className="h1_leg">Legalización Prácticas</h1>
      <div className="contenedor">
        <section className="columna columna1">
          <h2 className="h2_leg">Video explicativo de legalización</h2>
          {data?.video && <VideoPlayer src={data.video} />}
          <FaFilePdf />{data?.manual && 
          
          <a href={data.manual} target="_blank" rel="noopener noreferrer">{data.nombre}</a>
          }
        </section>
        <section className="columna columna2">
          <h2 className="h1_diff">Subir documentos</h2>  
          {data.req_documents &&
          data.req_documents.map((value,idx)=>(
            <div key={idx}>
               <FileUploader label={value} /> 
            </div>

          ))}
        </section>
      </div>
    </article>
  );
}

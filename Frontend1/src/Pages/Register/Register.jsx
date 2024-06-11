import { useState, useEffect } from "react";
import "./Register.css";
import {  api } from "../../Logic/config";
import { useApiGate } from "../../Hocks/useApiGate";
import { useValidation } from "../../Hocks/useValidation";

export function Register() {
  const [formData, setFormData] = useState({
    estudiante_nombre: "",
    estudiante_tipo_identificacion: "",
    estudiante_numero_documento: "",
    estudiante_correo: "",
    facultad: "",
    estudiante_programa: "",
    estudiante_id: "",
    estudiante_numero: "",
    requisitos_practica_rs: "",
    creditos: "",
    total_creditos: "",
    requisitos_porcentaje_creditos: "",
    observaciones_PRS: "",
    observaciones_NRC: "",
    estudiante_estado_civil: "",
    estudiante_hijos: "",
    periodo: "",
    practica: "",
  });

  const [dicStudent, setDicStudent] = useState(null);
  const { responseData, fetchData } = useApiGate();
  const {errors, validationForm}=useValidation();
  useEffect(() => {
    const fetchStudentData = async () => {
      const genesisEndpoint = api.Estudiante.endpoints.genesis;
      const id = "711059";

      const endpoint = `${genesisEndpoint.path}?id=${id}`;
      const apiCall = {
        method: genesisEndpoint.method,
        service: api.Estudiante.service,
        funcion: endpoint,
      };
      console.log(apiCall);
      await fetchData(apiCall);
    };

    fetchStudentData();
  }, []);

  useEffect(() => {
    if (responseData && responseData.data) {
      setDicStudent({
        Nombre: responseData.data.estudiante_nombre,
        "Tipo identificacion": responseData.data.estudiante_tipo_identificacion,
        "Numero identificacion": responseData.data.estudiante_numero_documento,
        Correo: responseData.data.estudiante_correo,
        Programa: responseData.data.estudiante_programa,
        "Id Estudiante": responseData.data.estudiante_id,
      });
      console.log(responseData.data);
      setFormData(responseData.data);
    }
  }, [responseData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validationForm(formData)) {
      return;
    }
   
    

    const body = {
      periodo: formData.periodo,
      practica: formData.practica,
      facultad: formData.facultad,
      observaciones: [
        {
          usuario: formData.estudiante_nombre,
          texto: formData.observaciones_PRS,
        },
        {
          usuario: formData.estudiante_nombre,
          texto: formData.observaciones_NRC,
        },
      ],
      estudiante: {
        id: formData.estudiante_id,
        nombre: formData.estudiante_nombre,
        tipo_identificacion: formData.estudiante_tipo_identificacion,
        numero_documento: formData.estudiante_numero_documento,
        correo: formData.estudiante_correo,
        numero: formData.estudiante_numero,
        programa: formData.estudiante_programa,
        estado_civil: formData.estudiante_estado_civil,
        hijos: formData.estudiante_hijos,
      },
      requisitos: {
        practica_rs: formData.requisitos_practica_rs,
        porcentaje_creditos: formData.requisitos_porcentaje_creditos,
      },
    
      proceso:{ 
        estado_actual:"preinscripcion" 
    }
    };

    const createEndpoint = api.Estudiante.endpoints.create;
    const apiCall = {
      method: createEndpoint.method,
      service: api.Estudiante.service,
      funcion: createEndpoint.path,
      dataBody: body,
    };

    fetchData(apiCall);
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
 
  return (
    <>
      <h1 className="form-title">Formulario de pre-inscripción a práctica 1</h1>
      <form className="registration-form" onSubmit={handleSubmit}>
        <fieldset className="user-info">
          <legend>Información del usuario</legend>
          {dicStudent &&
            Object.entries(dicStudent).map(([key, value]) => (
              <div className="form-group" key={key}>
                <label htmlFor={key} className="form-label">
                  {key}
                </label>
                <input
                  type="text"
                  id={key}
                  name={key}
                  readOnly
                  value={value}
                  className="form-input"
                />
              </div>
            ))}
        </fieldset>
        <fieldset className="form-section">
          <legend>Formulario</legend>

          <label htmlFor="prs" className="form-label">
            Cumple con practica en responsabilidad social?
          </label>
          {formData && formData.requisitos_practica_rs === "True" ? (
            <input
              type="text"
              id="prs"
              name="PRS"
              readOnly
              value="cumple con practicas"
              className="form-input good"
            />
          ) : (
            <>
              <input
                type="text"
                id="prs"
                name="PRS"
                readOnly
                value="no cumple"
                className="form-input bad"
              />
              <label
                htmlFor="observaciones"
                className="form-label"
                draggable={false}
              >
                Observaciones:
              </label>
              <textarea
                id="observaciones"
                name="observaciones_PRS"
                className="form-input textarea"
                readOnly={formData._id ? true : false}
                rows="6"
                required
                onChange={handleInputChange}
              ></textarea>
            </>
          )}

          <label htmlFor="prs" className="form-label">
            Cumple con los creditos nrc necesarios?
          </label>
          {formData && formData.requisitos_porcentaje_creditos === "True" ? (
            <input
              type="text"
              id="prs"
              name="NRC"
              readOnly
              value="cumple con creditos"
              className="form-input good"
            />
          ) : (
            <>
              <input
                type="text"
                id="prs"
                name="NRC"
                readOnly
                value="no cumple con creditos"
                className="form-input bad"
              />
              <label
                htmlFor="observaciones"
                className="form-label"
                draggable={false}
              >
                Observaciones:
              </label>
              <textarea
                id="observaciones"
                name="observaciones_NRC"
                readOnly={formData._id ? true : false}
                className="form-input textarea"
                rows="6"
                required
                onChange={handleInputChange}
              ></textarea>
            </>
          )}

          <label htmlFor="telefono" className="form-label">
            Telefono
          </label>
          <input
            type="tel"
            id="telefono"
            readOnly={formData._id ? true : false}
            name="estudiante_numero"
            value={formData.estudiante_numero}
            onChange={handleInputChange}
            className="form-input"
          />

          <label className="form-label">¿Cuál es su estado civil?</label>
          {formData && formData.estudiante_estado_civil !== "" ? (
            <input
              type="text"
              id="estudiante_estado_civil"
              name="estudiante_estado_civil"
              readOnly
              value={formData.estudiante_estado_civil}
              
            />
          ) : (
            <select
              className="form-input"
              name="estudiante_estado_civil"
              id="estudiante_estado_civil"
              
              title="Por favor, seleccione su estado civil"
              onChange={handleInputChange}
            >
              <option value="">Seleccionar</option>
              <option value="soltero">Soltero/a</option>
              <option value="casado">Casado/a</option>
              <option value="divorciado">Divorciado/a</option>
              <option value="viudo">Viudo/a</option>
            </select>
          )}

          <label className="form-label">¿Tiene hijos?</label>
         { formData && formData.estudiante_hijos !== "" ? (
           <input
           type="text"
           id="estudiante_hijos"
           name="estudiante_hijos"
           readOnly
           value={formData.estudiante_hijos}
           
         />
         ):(<select
            className="form-input"
            name="estudiante_hijos"
            id="estudiante_hijos"
            
            title="Por favor, seleccione si tiene hijos"
            onChange={handleInputChange}
          >
            <option value="">Seleccionar</option>
            <option value="no">No</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4_o_mas">4 o más</option>
          </select>)}
        </fieldset>
        {errors && <div className="error">{ errors}</div>}
        { !formData._id &&  
        <button type="submit" className="submit-button">
          Enviar
        </button>}
      </form>
    </>
  );
}

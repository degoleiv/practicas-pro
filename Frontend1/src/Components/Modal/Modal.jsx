import { useState } from "react";
import {useValidation} from '../../Hocks/useValidation'
import "./Modal.css";
export const Modal = ({ onSubmitForm, defaultValue, closeModal }) => {
  const [formState, setFormState] = useState(defaultValue);
  

  const {errors, validationForm}=useValidation();

  

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(validationForm(formState));
    if (!validationForm(formState)) {
      return;
    }
    onSubmitForm(formState);
    closeModal();
  };

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div
      className="modal-container"
      onClick={(e) => {
        if (e.target.className === "modal-container") {
          closeModal();
        }
      }}
    >
      <div className="modal">
        <form onSubmit={handleSubmit}>
          {formState &&
            Object.keys(formState).map((value, idx) => {
              return value !== "Estado" && value !== "_id" ? (
                <div className="form-group" key={idx}>
                  <label htmlFor={value}>{value}</label>
                  <input type="text" name={value} onChange={handleChange} value={formState[value]}/>
                </div>
              ) : null;
            })}

          <div className="form-group">
            <label htmlFor="Estado">Estado</label>
            <select
              name="Estado"
              id="Estado"
              className="Estado"
              title="por favor seleccione un estado"
              onChange={handleChange}
            >
              <option value="">Seleccion</option>
              <option value="Pendiente">Pendiente</option>
              <option value="Aprovado">Aprovado</option>
              <option value="Rechazado">Rechazado</option>
            </select>
          </div>
          {errors && <div className="error">{ errors}</div>}
          <button type="submit" className="btn">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

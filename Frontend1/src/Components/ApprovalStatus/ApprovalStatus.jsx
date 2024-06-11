import React from 'react';
import './ApprovalStatus.css';

function ApprovalStatus() {
  return (
    <div>
      <div className="titulo">
        <h2>Aprobación de Centro Progresa</h2>
      </div>
      <div className="container">
        <div className="column">
          <h3>Estado de Aprobación</h3>
          <br />
          <select className='Estadoo' name="Estado_aprobacion" id="Estado">
            <option value="Pendiente">Pendiente</option>
            <option value="Rechazado">Rechazado</option>
            <option value="Aprobado">Aprobado</option>
          </select>
          <br />
        </div>
        <div className="column">
          <h3>Observaciones</h3>
          {/* Contenido de las observaciones */}
        </div>
      </div>
    </div>
  );
}

export default ApprovalStatus;

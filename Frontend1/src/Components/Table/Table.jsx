import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";
import "./Table.css";
import { useEffect, useState } from "react";

export function Table({ rows, onDeleteRow, onEditRow }) {
  const [cols, setCols] = useState([]);
  
  useEffect(() => {
    if (rows && rows.length > 0 && rows[0]) {
      setCols(Object.keys(rows[0]));
    }
  }, [rows]);
  
  return (
    <div className="table-wrapper">
      {rows.length > 0 && 
      <table className="table">
        <thead>
          <tr>
            {
            cols.map((value, idx) => {
              return  value !== '_id' ? <th
              className={value === "Observaciones" ? "expand" : ""}
              key={idx}
            >
              {value}
            </th> : null;
            }
          )}
            <th>Acciones</th>
          </tr>

          {/* <th >Observaciones</th> */}
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={idx}>
              {cols.map((col, _) => {
                return col !== 'Estado' && col !== '_id' ? <td key={col}>{row[col]}</td> : null;
              })}
              <td>
                <span className={`label-table label-${row.Estado}`}>
                  {row.Estado}
                </span>
              </td>
              <td>
                <form> <span className="actions">
                  <BsFillTrashFill type='submit' className="delete-btn" onClick={()=>{onDeleteRow(row._id)}} />
                  <BsFillPencilFill onClick={()=> onEditRow(row._id, idx)}/>
                </span></form>
               
              </td>
            </tr>
          ))}
        </tbody>
      </table>}
    </div>
  );
}
/* {Object.entries(row).map(([key, value], index) => {
                if (key !== "status") {
                  return <td key={index}>{value}</td>;
                } else {
                  return null; // No renderizar la celda si la clave es "estado"
                }
              })} */

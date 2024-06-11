import { Table } from "../../Components/Table/Table";
import { Modal } from "../../Components/Modal/Modal";
import { TemplateLayout } from "../../Components/TemplateLayout/TemplateLayout";
import { SearchBar } from "../../Components/SearchBar/SearchBar";
import { useState } from "react";

export function Companies() {
  const [modalOpen, setModalOpen] = useState(false);
  const cols = [
    "No",
    "Fecha_Inscripcion",
    "Empresa_vinculante",
    "Nit",
    "Direccion",
    "Teléfono",
    "Estado",
    "Acciones",
  ];
  const rows = [
    {
      No: "1",
      Fecha_Inscripcion: "12/06/1998",
      Empresa_vinculante: "Claro SAS",
      Nit: "800.153.993-7",
      Direccion: "DIAG63A#5",
      Teléfono: "1637384",
      status: "Aprovado",
    },
    {
      No: "1",
      Fecha_Inscripcion: "12/06/1998",
      Empresa_vinculante: "Claro SAS",
      Nit: "800.153.993-7",
      Direccion: "DIAG63A#5",
      Teléfono: "1637384",
      status: "Aprovado",
    },
    {
      No: "1",
      Fecha_Inscripcion: "12/06/1998",
      Empresa_vinculante: "Claro SAS",
      Nit: "800.153.993-7",
      Direccion: "DIAG63A#5",
      Teléfono: "1637384",
      status: "Aprovado",
    },
  ];
  return (
    <TemplateLayout>
      <div className="table-header">
        <h1 className="table-header-title">Empresas Registradas</h1>
        <button
          className="btn"
          onClick={() => {
            setModalOpen(true);
          }}
        >
          Registrar Empresa
        </button>
        <SearchBar Name="Buscar"></SearchBar>
      </div>

      <Table rows={rows} cols={cols} />

      {modalOpen && (
        <Modal
          closeModal={() => {
            setModalOpen(false);
          }}
        />
      )}
    </TemplateLayout>
  );
}

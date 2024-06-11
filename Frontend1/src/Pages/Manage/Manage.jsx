import { Table } from "../../Components/Table/Table";
import { Modal } from "../../Components/Modal/Modal";
import { TemplateLayout } from "../../Components/TemplateLayout/TemplateLayout";
import { SearchBar } from "../../Components/SearchBar/SearchBar";
import { useEffect, useState } from "react";
import { useApiGate } from "../../Hocks/useApiGate";
import { api, columns } from "../../Logic/config";

export function Manage() {
  const [modalOpen, setModalOpen] = useState(false);
  const { responseData, fetchData, error, loading } = useApiGate();
  const [dataTable, setDataTable] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [rowToEdit, setRowToEdit] = useState(null);
  const [endpoints, setEndpoints] = useState(null);
  const [id, setId] = useState('');
  
  useEffect(() => {
    const id = localStorage.getItem('dropdownItemId');
    setId(id);
    if (id && api[id]) {
      setEndpoints({
        searchEndpoint: api[id].endpoints.search,
        deleteEndpoint: api[id].endpoints.delete,
        editEndpoint: api[id].endpoints.update,
        service: api[id].service
      });
    }
  }, []);

  useEffect(() => {
    if (endpoints) {
      const searchEndpoint = endpoints.searchEndpoint;
      const searchFunction = searchQuery ? `${searchEndpoint.path}${searchQuery}` : searchEndpoint.path;
      const searchApiCall = {
        method: searchEndpoint.method,
        service: endpoints.service,
        funcion: searchFunction,
        dataBody: {},
      };
      fetchData(searchApiCall);
    }
  }, [searchQuery, endpoints]);

  useEffect(() => {
    if (responseData && responseData.status === 200 && responseData.data !== true) {
      const transformedData = transformData(responseData.data);
      console.log(transformedData);
      setDataTable(transformedData);
      
    }
  }, [responseData]);

  function transformData(apiData) {
    let list = [];
    
    apiData.forEach((item, index) => {
      let formatObject = {};
  
      

      columns[id].forEach((key_str) => {
        
        const value = getValue(item, key_str);
        const keyHyphens = removeHyphens(key_str);
        const keyDot = removeDotAndGetLastPart(keyHyphens);
        const keyPascal = toPascalCase(keyDot);
        console.log(key_str);
        if (key_str === 'observaciones') {
          formatObject['Observaciones'] = item.observaciones !== null ? item.observaciones[[item.observaciones.length - 1]].texto : "";
        }else{
          formatObject[keyPascal] = value;
        }
          
        
        
      });

      
      formatObject['No'] = index + 1;
      list.push(formatObject);
    });
  
    return list;
  }
  

  function getValue(data, str) {
    
    const list_keys = str.split('.');
    let value_temp = data
    list_keys.map((item)=>{
      value_temp = value_temp[item]
      
    });
    return value_temp;
}
  function toPascalCase(str) {
    return str.replace(/\w+/g, word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
  }


  function removeHyphens(str) {
    return str.replace(/_/g, ' ');
  }

  function removeDotAndGetLastPart(str) {
    return str.split('.').pop();
  }

  const handleDeleteRow = (targetIndex) => {
    if (endpoints) {
      const deleteFunction = `${endpoints.deleteEndpoint.path}?id=${targetIndex}`;
      const deleteApiCall = {
        method: endpoints.deleteEndpoint.method,
        service: endpoints.service,
        funcion: deleteFunction,
        dataBody: {},
      };
      fetchData(deleteApiCall);
    }
  };

  const handleEditRow = (targetIndex, idx) => {
    setRowToEdit({ data: responseData.data[idx], id: targetIndex });
    setModalOpen(true);
  };

  const handleSubmit = (newRow) => {
    if (endpoints) {
      const url = rowToEdit === null ? endpoints.editEndpoint.path : `${endpoints.editEndpoint.path}?id=${rowToEdit.id}`;
      const editApiCall = {
        method: endpoints.editEndpoint.method,
        service: endpoints.service,
        funcion: url,
        dataBody: newRow,
      };
      fetchData(editApiCall);
    }
  };

  return (
    <TemplateLayout>
      <div className="table-header">
        <h1 className="table-header-title">{id}</h1>
        <SearchBar placeholder="Buscar" onSearch={setSearchQuery} />
        <button onClick={() => { setRowToEdit(null); setModalOpen(true); }}>Add</button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Table rows={dataTable} onDeleteRow={handleDeleteRow} onEditRow={handleEditRow} />
      )}
      {error && <p>{error.message}</p>}
      {modalOpen && (
        <Modal
          onSubmitForm={handleSubmit}
          defaultValue={rowToEdit ? rowToEdit.data : {}}
          closeModal={() => { setModalOpen(false); }}
        />
      )}
    </TemplateLayout>
  );
}

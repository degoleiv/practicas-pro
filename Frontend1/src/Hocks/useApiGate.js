import { useEffect, useState } from "react";
import { ApiGateWay } from "../Logic/ApiGateway";
import { toast } from "react-toastify";

export const useApiGate = () => {
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);
  
  const fetchData = async ({ method, service, funcion, dataBody }) => {
    try {
      const response = await ApiGateWay({ method, service, funcion, dataBody });
      
      setResponseData(response);
      if (response.status === 429) {
        console.log(response.data);
        toast.error(response.data.detail);
        return;
      }
      else if (response.status === 200) {
        toast.success("Informacion Cargada con exito.");
        return;
      }
      
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(`Error: ${error}`);
    }

  }, [error, responseData]);

  return { responseData, error, fetchData };
};

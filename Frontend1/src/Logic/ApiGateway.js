
import {URL} from "./config"
export const ApiGateWay = async ({ method, service, funcion, dataBody }) => {
  try {
    const end = `${URL}/${service}`;
    const ENDPOINT = funcion ? `${end}?funcion=${funcion}` : end;

    const requestOptions = {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (method !== "GET") {
      requestOptions.body = JSON.stringify(dataBody);
    }

    const res = await fetch(ENDPOINT, requestOptions);
    const data = await res.json();

    return {
      status: res.status,
      data: data,
    };
  } catch (error) {
    // Verificar si el error es debido a la falta de conexión
    if (error.message === "Failed to fetch") {
      return {
        status: null,
        data: "No se ha podido contactar con el servidor. Verifique su conexión a internet.",
      };
    }
    return {
      status: null,
      data: error.message,
    };
  }
};

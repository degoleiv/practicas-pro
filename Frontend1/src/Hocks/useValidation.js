import { useState } from "react";
import { toast } from "react-toastify";
export const useValidation = () => {
  const [errors, setErrors] = useState("");
  const validationForm = (formState) => {
    var bool_return = true;
    let fieldsError = [];
    for (let element in formState) {
      if (formState[element] === "" && element !== "_id" && element !== "observaciones_NRC" && element !== "observaciones_PRS") {
        fieldsError.push(element);
        bool_return = false;
      }
    }
    if (bool_return) {
      setErrors("");
      return true;
    }
    const message = `Por favor incluir los campos: ${fieldsError.join(", ")}`;
    setErrors(message);
    toast.error(message);
    return bool_return;
  };

  return { errors, validationForm };
};

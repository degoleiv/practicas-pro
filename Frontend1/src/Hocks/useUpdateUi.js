import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';



import jsonData from '../Logic/components.json';
export function  useUpdateUi (component)  {
    
    const [data, setData] = useState([]);
    
    useEffect(() => {
      const ui = JSON.parse(JSON.stringify(jsonData));

      // const rol = Cookies.get('rol');
      const rol = "Admin";
      for (let clave in ui) {
        
        if (rol === clave) {
            
          setData(ui[clave][component]);
          break;
        }
      }
    }, []);

    return {data };

}

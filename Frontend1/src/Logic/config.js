export const URL = "http://192.168.0.12:4699/redirect";

export const config = {
  appId: "ffe0757b-7394-4529-b718-5fbba1533127",
  redirectUri: "http://localhost:5173",
  scopes: ["user.read"],
  authority:
    "https://login.microsoftonline.com/practicaspro2024hotmail.onmicrosoft.com",
  apiUrl: "http://192.168.0.12:4699/practicas/jwt_auth",
};
// http://25.34.99.254:4699/practicas/verify/token
export const api = {
  Estudiante: {
    service: "preinscriptions",
    endpoints: {
      getAll: {
        path: "", // Ruta del endpoint para obtener todas las preinscripciones
        method: "GET",
      },
      search: {
        path: "/search", // Ruta del endpoint para buscar preinscripciones por palabra clave
        method: "GET",
      },
      create: {
        path: "", // Ruta del endpoint para crear una nueva preinscripción
        method: "POST",
      },
      getById: {
        path: "/read", // Ruta del endpoint para leer una preinscripción específica por ID
        method: "GET",
      },
      genesis: {
        path: "/genesis", // Ruta del endpoint para obtener todas las preinscripciones
        method: "GET",
      },
      update: {
        path: "", // Ruta del endpoint para actualizar una preinscripción específica por ID
        method: "PUT",
      },
      delete: {
        path: "", // Ruta del endpoint para eliminar una preinscripción específica por ID
        method: "DELETE",
      },
    },
  },
  files: {
    service: "files",
    endpoints: {
      getAll: {
        path: "", // Ruta del endpoint para obtener todas las preinscripciones
        method: "GET",
      },
      search: {
        path: "/search", // Ruta del endpoint para buscar preinscripciones por palabra clave
        method: "GET",
      },
      create: {
        path: "", // Ruta del endpoint para crear una nueva preinscripción
        method: "POST",
      },
      getById: {
        path: "/read", // Ruta del endpoint para leer una preinscripción específica por ID
        method: "GET",
      },

      update: {
        path: "", // Ruta del endpoint para actualizar una preinscripción específica por ID
        method: "PUT",
      },
      delete: {
        path: "", // Ruta del endpoint para eliminar una preinscripción específica por ID
        method: "DELETE",
      },
    },
  },
  Empresa: {
    service: "empresas",
    endpoints: {
      getAll: {
        path: "", // Ruta del endpoint para obtener todas las preinscripciones
        method: "GET",
      },
      search: {
        path: "/search", // Ruta del endpoint para buscar preinscripciones por palabra clave
        method: "GET",
      },
      create: {
        path: "", // Ruta del endpoint para crear una nueva preinscripción
        method: "POST",
      },
      getById: {
        path: "/read", // Ruta del endpoint para leer una preinscripción específica por ID
        method: "GET",
      },

      update: {
        path: "", // Ruta del endpoint para actualizar una preinscripción específica por ID
        method: "PUT",
      },
      delete: {
        path: "", // Ruta del endpoint para eliminar una preinscripción específica por ID
        method: "DELETE",
      },
    },
  },
  notificaciones: {
    service: "notificaciones",
    endpoints: {
      getAll: {
        path: "", // Ruta del endpoint para obtener todas las preinscripciones
        method: "GET",
      },
      search: {
        path: "/search", // Ruta del endpoint para buscar preinscripciones por palabra clave
        method: "GET",
      },
      create: {
        path: "", // Ruta del endpoint para crear una nueva preinscripción
        method: "POST",
      },
      getById: {
        path: "/read", // Ruta del endpoint para leer una preinscripción específica por ID
        method: "GET",
      },

      update: {
        path: "", // Ruta del endpoint para actualizar una preinscripción específica por ID
        method: "PUT",
      },
      delete: {
        path: "", // Ruta del endpoint para eliminar una preinscripción específica por ID
        method: "DELETE",
      },
    },
  },
  Profesor: {
    service: "profesores",
    endpoints: {
      getAll: {
        path: "", // Ruta del endpoint para obtener todas las preinscripciones
        method: "GET",
      },
      search: {
        path: "/search", // Ruta del endpoint para buscar preinscripciones por palabra clave
        method: "GET",
      },
      create: {
        path: "", // Ruta del endpoint para crear una nueva preinscripción
        method: "POST",
      },
      getById: {
        path: "/read", // Ruta del endpoint para leer una preinscripción específica por ID
        method: "GET",
      },

      update: {
        path: "", // Ruta del endpoint para actualizar una preinscripción específica por ID
        method: "PUT",
      },
      delete: {
        path: "", // Ruta del endpoint para eliminar una preinscripción específica por ID
        method: "DELETE",
      },
    },
  },
};

export const columns = {
  Estudiante: [
    "fecha_creacion",
    "estudiante.id",
    "estudiante.nombre",
    "estudiante.programa",
    "periodo",
    "practica",
    "observaciones",
    "estado",
  ],

 
   

  Profesor: [
    "fecha_creacion",
    "tutor_practicas.id",
    "tutor_practicas.nombre",
    "tutor_practicas.especialidad",
    "estado",
    "tutor_practicas.facultad",
    "descripcion",
    "tutor_practicas.numero",
  ],
  Empresa: {
    _id: "",
    No: "",
    Fecha: "",
    Id: "",
    "Nombre estudiante": "",
    Programa: "",
    Periodo: "",
    Practica: "",
    Observaciones: "",
    Estado: "",
  },
};

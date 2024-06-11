import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { NewsFeedPage } from "./Pages/NewsFeedPage/NewsFeedPage";
import { ProtectedRoute } from "./Logic/ProtectedRoute";
import { PracticePage } from "./Pages/PracticePage/PracticePage";
// import { Companies } from "./Pages/Companies/Companies";
import { Manage } from "./Pages/Manage/Manage";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';
// import { Table } from './Components/Table/Table';
// import { Modal } from './Components/Modal/Modal';





export function App() {
  return (
    <div>
       
      <ToastContainer />
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute role="student">
                <NewsFeedPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/practicas"
            element={
              <ProtectedRoute role="student">
                <PracticePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/calificacion"
            element={
              <ProtectedRoute role="teacher">
                <PracticePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/manage"
            element={
              <ProtectedRoute role="student">
                <Manage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}


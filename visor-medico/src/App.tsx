import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import ViewerPage from "./pages/ViewerPage";
import VisualizadorPrueba from "./components/VisualizadorPrueba";
import LoginPage from './pages/LoginPage';
import MedicoPage from "./pages/MedicoPage";

import { AuthProvider } from "./context/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/viewer" element={<ViewerPage />} />
        <Route path="/prueba" element={<VisualizadorPrueba />} />
        <Route path="/medico" element={<MedicoPage />} />
      </Routes>
    </AuthProvider>
  );
}

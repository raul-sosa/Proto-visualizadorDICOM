import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import ViewerPage from "./pages/ViewerPage";
import VisualizadorPrueba from "./components/VisualizadorPrueba";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/viewer" element={<ViewerPage />} />
      <Route path="/prueba" element={<VisualizadorPrueba />} />
    </Routes>
  );
}

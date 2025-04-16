import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

export default function MainMenu() {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">🏥 Sistema de Imágenes Médicas</h2>
      <p className="mb-6">Bienvenido al sistema. Seleccione una opción:</p>
      <Button
        label="Visualizador DICOM"
        icon="pi pi-image"
        onClick={() => navigate("/viewer")}
      />
    </div>
  );
}

import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="p-6 flex flex-col items-center justify-center min-h-screen bg-blue-50">
      <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-lg">
        <h1 className="text-3xl font-semibold mb-6 text-center text-blue-700">
           Sistema de Imágenes Médicas
        </h1>
        <p className="text-gray-700 mb-6 text-center">
          Bienvenido. Seleccione una de las siguientes opciones:
        </p>
        <div className="flex flex-col gap-4 items-center">
          <Button
            label="Visualizador DICOM"
            icon="pi pi-image"
            className="p-button-lg p-button-outlined"
            onClick={() => navigate("/viewer")}
          />
          <Button
            label="Visor de Prueba"
            icon="pi pi-eye"
            className="p-button-lg p-button-outlined p-button-success"
            onClick={() => navigate("/prueba")}
          />
        </div>
      </div>
    </div>
  );
}

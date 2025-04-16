import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="layout-wrapper">
      {/* Header */}
      <header className="header">
        <div className="layout-content">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <img 
                src="/medical-cross.svg" 
                alt="Logo" 
                style={{ height: '40px' }}
              />
              <div>
                <h1 className="text-xl m-0">Centro Médico Virtual</h1>
                <p className="text-secondary m-0">Sistema de Imágenes Diagnósticas</p>
              </div>
            </div>
            <Button 
              label="Contacto" 
              icon="pi pi-envelope" 
              className="p-button-text p-button-rounded"
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="layout-content">
        {/* Welcome Section */}
        <section className="content-section text-center">
          <h2 className="text-3xl">
            Bienvenido al Sistema de Visualización Médica
          </h2>
          <p className="text-secondary text-lg">
            Acceda a nuestras herramientas especializadas para la visualización y análisis de imágenes DICOM.
          </p>
        </section>

        {/* Cards Section */}
        <div className="card-container">
          <Card>
            <div className="text-center mb-4">
              <i className="pi pi-image" style={{ 
                fontSize: '2rem', 
                color: 'var(--primary-color)',
                backgroundColor: 'var(--primary-100)',
                padding: '1rem',
                borderRadius: '50%'
              }}></i>
              <h3>Visualizador DICOM Avanzado</h3>
              <p className="text-secondary">
                Herramienta profesional para la visualización y análisis detallado de imágenes médicas.
              </p>
              <Button
                label="Acceder al Visualizador"
                icon="pi pi-external-link"
                onClick={() => navigate("/viewer")}
              />
            </div>
          </Card>

          <Card>
            <div className="text-center mb-4">
              <i className="pi pi-eye" style={{ 
                fontSize: '2rem', 
                color: 'var(--primary-color)',
                backgroundColor: 'var(--primary-100)',
                padding: '1rem',
                borderRadius: '50%'
              }}></i>
              <h3>Vista Rápida</h3>
              <p className="text-secondary">
                Visualización simple y rápida de imágenes DICOM para consultas inmediatas.
              </p>
              <Button
                label="Vista Rápida"
                icon="pi pi-eye"
                className="p-button-success"
                onClick={() => navigate("/prueba")}
              />
            </div>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="layout-content">
          <div className="card-container">
            <div>
              <h4>Centro Médico Virtual</h4>
              <p className="text-secondary">
                Comprometidos con la excelencia en el diagnóstico médico digital.
              </p>
            </div>
            <div>
              <h4>Enlaces Rápidos</h4>
              <ul className="list-none p-0 text-secondary">
                <li className="mb-2">Inicio</li>
                <li className="mb-2">Visualizador DICOM</li>
                <li className="mb-2">Vista Rápida</li>
                <li className="mb-2">Soporte</li>
              </ul>
            </div>
            <div>
              <h4>Contacto</h4>
              <ul className="list-none p-0 text-secondary">
                <li className="mb-2">Email: contacto@centromedico.com</li>
                <li className="mb-2">Tel: (123) 456-7890</li>
                <li className="mb-2">Horario: 24/7</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

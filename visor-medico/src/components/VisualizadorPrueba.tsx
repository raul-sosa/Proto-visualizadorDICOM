import React from 'react';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { useNavigate } from 'react-router-dom';
import { Panel } from 'primereact/panel';

const VisualizadorPrueba: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="p-d-flex p-flex-column">
      {/* Header */}
      <div className="p-shadow-2" style={{ background: 'var(--surface-0)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1rem' }}>
          <div className="p-d-flex p-jc-between p-ai-center">
            <div className="p-d-flex p-ai-center">
              <img 
                src="/medical-cross.svg" 
                alt="Logo" 
                style={{ height: '32px', marginRight: '1rem', cursor: 'pointer' }}
                onClick={() => navigate('/')}
              />
              <div>
                <h1 className="p-text-xl" style={{ margin: 0 }}>Vista Rápida DICOM</h1>
                <p className="p-text-sm" style={{ margin: '0.5rem 0 0 0', color: 'var(--text-color-secondary)' }}>
                  Centro Médico Virtual
                </p>
              </div>
            </div>
            <Button
              icon="pi pi-home"
              className="p-button-text p-button-rounded"
              onClick={() => navigate('/')}
              tooltip="Volver al Inicio"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '1200px', margin: '2rem auto', padding: '0 1rem' }}>
        <Card>
          <div className="p-d-flex p-jc-between p-ai-center p-mb-4">
            <h2 className="p-text-2xl" style={{ margin: 0 }}>Visualización de Imagen</h2>
            <div className="p-d-flex p-ai-center" style={{ gap: '0.5rem' }}>
              <a 
                href="http://localhost:8042/instances/c85b3047-e308c3fe-0cf1dccb-a03febc0-52944139/preview" 
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  label="Ver en Nueva Ventana"
                  icon="pi pi-external-link"
                  className="p-button-outlined"
                />
              </a>
              <a 
                href="http://localhost:8042/instances/c85b3047-e308c3fe-0cf1dccb-a03febc0-52944139/file" 
                download="imagen.dcm"
              >
                <Button
                  label="Descargar DICOM"
                  icon="pi pi-download"
                  className="p-button-outlined p-button-success"
                />
              </a>
            </div>
          </div>

          <div style={{ 
            border: '1px solid var(--surface-200)', 
            borderRadius: 'var(--border-radius)', 
            padding: '1rem',
            backgroundColor: 'var(--surface-50)'
          }}>
            <img 
              src="http://localhost:8042/instances/c85b3047-e308c3fe-0cf1dccb-a03febc0-52944139/preview" 
              alt="Imagen DICOM"
              style={{ maxWidth: '100%', height: 'auto', margin: '0 auto', display: 'block' }}
            />
          </div>

          <Panel header="Información de la Imagen" className="p-mt-4">
            <div className="p-grid">
              <div className="p-col-12 p-md-6">
                <div className="p-d-flex p-flex-column" style={{ gap: '0.5rem' }}>
                  <div>
                    <span style={{ color: 'var(--text-color-secondary)' }}>Tipo: </span>
                    <span>Resonancia Magnética (MR)</span>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-color-secondary)' }}>Vista: </span>
                    <span>Sagital</span>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-color-secondary)' }}>Matriz: </span>
                    <span>256 x 256</span>
                  </div>
                </div>
              </div>
              <div className="p-col-12 p-md-6">
                <div className="p-d-flex p-flex-column" style={{ gap: '0.5rem' }}>
                  <div>
                    <span style={{ color: 'var(--text-color-secondary)' }}>Grosor de Corte: </span>
                    <span>1.3mm</span>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-color-secondary)' }}>Centro de Ventana: </span>
                    <span>65</span>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-color-secondary)' }}>Ancho de Ventana: </span>
                    <span>78</span>
                  </div>
                </div>
              </div>
            </div>
          </Panel>
        </Card>
      </div>
    </div>
  );
};

export default VisualizadorPrueba;

import React from 'react';
import { Button } from 'primereact/button';
import Header from './Header';
import Footer from './Footer';

const INSTANCE_ID = 'efebc324-9433a127-dadb8db9-d63025b2-81de68ff';

const VisualizadorPrueba: React.FC = () => {
  return (
    <div className="layout-wrapper">
      <Header />
      <div className="layout-content" style={{ margin: '2rem auto' }}>
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl m-0">Visualización de Imagen</h2>
            <div className="flex items-center gap-2">
              <a 
                href={`http://localhost:8042/instances/${INSTANCE_ID}/preview`} 
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
                href={`http://localhost:8042/instances/${INSTANCE_ID}/file`} 
                download="imagen.dcm"
              >
                <Button
                  label="Descargar DICOM"
                  icon="pi pi-download"
                  className="p-button-outlined"
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
              src={`http://localhost:8042/instances/${INSTANCE_ID}/preview`} 
              alt="Imagen DICOM"
              style={{ maxWidth: '100%', height: 'auto', margin: '0 auto', display: 'block' }}
              onError={e => { (e.target as HTMLImageElement).src = '/no-image.png'; }}
            />
          </div>

          <div className="p-grid" style={{ marginTop: 20 }}>
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
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default VisualizadorPrueba;

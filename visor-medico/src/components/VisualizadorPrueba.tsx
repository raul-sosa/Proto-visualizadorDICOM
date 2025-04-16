import React from 'react';

const VisualizadorPrueba: React.FC = () => {
  return (
    <div style={{ width: '100%', height: '100vh', padding: '20px' }}>
      <h2>Visor DICOM de Prueba</h2>
      <div style={{ marginBottom: '20px' }}>
        <a 
          href="http://localhost:8042/instances/c85b3047-e308c3fe-0cf1dccb-a03febc0-52944139/preview" 
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '5px',
            marginRight: '10px'
          }}
        >
          Ver Imagen en Nueva Ventana
        </a>
        <a 
          href="http://localhost:8042/instances/c85b3047-e308c3fe-0cf1dccb-a03febc0-52944139/file" 
          download="imagen.dcm"
          style={{
            display: 'inline-block',
            padding: '10px 20px',
            backgroundColor: '#28a745',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '5px'
          }}
        >
          Descargar Archivo DICOM
        </a>
      </div>
      <div style={{ border: '1px solid #ccc', padding: '20px' }}>
        <img 
          src="http://localhost:8042/instances/c85b3047-e308c3fe-0cf1dccb-a03febc0-52944139/preview" 
          alt="Imagen DICOM"
          style={{
            maxWidth: '100%',
            height: 'auto'
          }}
        />
      </div>
    </div>
  );
};

export default VisualizadorPrueba;

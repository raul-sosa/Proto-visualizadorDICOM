import React from 'react';
import Footer from './Footer';

import Header from './Header';




const DEFAULT_INSTANCE_ID = '1.3.6.1.4.1.5962.99.1.3814087073.479799962.1489872804257.3.0'; // UID por defecto

const VisualizadorPrueba: React.FC = () => {
  // No se necesita estado para estudios ni ejemplos
const selectedStudyUID = DEFAULT_INSTANCE_ID;

  const ohifUrl = (studyUID: string) => {
    return `http://localhost:3000/viewer?StudyInstanceUIDs=${studyUID}`;
  };

  

  return (
  <div className="layout-wrapper" style={{ height: '100vh', width: '100vw', overflow: 'hidden' }}>
    <Header />
    <div style={{ flex: 1, height: 'calc(100vh - 64px - 40px)', width: '100vw', overflow: 'hidden', display: 'flex' }}>
      <iframe
        src="http://localhost:3000/viewer?StudyInstanceUIDs=2.16.840.1.114362.1.11972228.22789312658.616067305.306.2"
        title="OHIF Viewer"
        width="100%"
        height="100%"
        style={{ border: 'none', flex: 1 }}
        allow="clipboard-write"
        allowFullScreen
      />
    </div>
    <Footer />
  </div>
);
};

export default VisualizadorPrueba;


import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => (
  <footer className="footer" style={{ background: 'var(--primary-400)', color: '#fff', padding: '2rem 0 1rem 0', borderRadius: '0 0 1rem 1rem', marginTop: '2rem' }}>
    <div className="layout-content" style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: 32 }}>
      <div>
        <img src="/DCV-logo.png" alt="Logo DCV" style={{ height: 56, marginBottom: 8, filter: 'none' }} />
        <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 8 }}>Digital Clinical Viewer</div>
        <div style={{ color: '#e0f2f1', fontSize: 14 }}> {new Date().getFullYear()} Salud Digna</div>
      </div>
      <div>
        <h4>Enlaces rápidos</h4>
        <ul style={{ listStyle: 'none', padding: 0, color: '#e0f2f1' }}>
          <li><Link to="/" style={{ color: '#e0f2f1', textDecoration: 'underline' }}>Inicio</Link></li>
          <li><Link to="/viewer" style={{ color: '#e0f2f1', textDecoration: 'underline' }}>Visualizador DICOM</Link></li>
          <li><Link to="/prueba" style={{ color: '#e0f2f1', textDecoration: 'underline' }}>Vista de Prueba</Link></li>
          <li><Link to="/login" style={{ color: '#e0f2f1', textDecoration: 'underline' }}>Iniciar sesión</Link></li>
        </ul>
      </div>
      <div>
        <h4>Contacto</h4>
        <ul style={{ listStyle: 'none', padding: 0, color: '#e0f2f1' }}>
          <li>Email: contacto@centromedico.com</li>
          <li>Tel: (123) 456-7890</li>
          <li>Horario: 24/7</li>
        </ul>
      </div>
    </div>
  </footer>
);

export default Footer;

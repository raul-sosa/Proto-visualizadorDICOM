import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { useAuth } from '../context/AuthContext';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    // Eliminar token y email del localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user_email');
    }
    logout();
    navigate('/'); // Redirige a la página principal
  };

  return (
    <header className="header" style={{ width: '100vw', left: 0, top: 0, position: 'relative', background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.03)', zIndex: 100 }}>
      <div className="layout-content" style={{ maxWidth: '1400px', margin: '0 auto', width: '100%', padding: '0 2vw' }}>
        <div className="flex justify-between items-center gap-2" style={{ minHeight: 96 }}>
          <div className="flex items-center gap-2">
            <img
              src="/DCV-logo.png"
              alt="Logo Digital Clinical Viewer"
              style={{ height: '96px', maxHeight: '15vw', background: 'transparent', borderRadius: '16px', padding: '0.25rem', objectFit: 'contain', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
              onClick={() => navigate('/')} />
            <div>
              <h1 className="text-xl m-0" style={{ fontSize: 32, fontWeight: 900, letterSpacing: -1 }}>Digital Clinical Viewer</h1>
              <p className="text-secondary m-0" style={{ fontSize: 18 }}>Visor de imágenes médicas</p>
            </div>
          </div>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 8 }}>
            {/* Botón para ir a la página anterior */}
            <Button
              icon="pi pi-arrow-left"
              className="p-button-text p-button-rounded p-button-secondary"
              style={{ marginRight: 8 }}
              title="Regresar"
              onClick={() => navigate('/')}
            />
            {/* Acceso a la página de médicos */}
            <Button
              label="Panel Médico"
              icon="pi pi-briefcase"
              className="p-button-outlined p-button-rounded"
              style={{ marginRight: 8 }}
              onClick={() => navigate('/medico')}
            />
            {user ? (
              <>
                <span style={{ fontWeight: 500, fontSize: 16, color: '#388e3c', marginRight: 10 }}>Hola {user.email}</span>
                <Button
                  label="Cerrar sesión"
                  icon="pi pi-sign-out"
                  className="p-button-danger p-button-rounded"
                  style={{ fontSize: 15 }}
                  onClick={() => {
                    handleLogout();
                  }}
                />
              </>
            ) : (
              <Button
                label="Iniciar sesión"
                icon="pi pi-user"
                className="p-button-outlined p-button-rounded"
                onClick={() => navigate('/login')}
              />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

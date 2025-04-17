import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';

const Header: React.FC = () => {
  const navigate = useNavigate();

  const [loggedUser, setLoggedUser] = useState<string|null>(null);

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
          <div style={{ position: 'relative' }}>
            <Button
              label={loggedUser ? `Hola, ${loggedUser}` : "Iniciar sesión"}
              icon="pi pi-user"
              className="p-button-outlined p-button-rounded"
              onClick={() => navigate('/login')}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

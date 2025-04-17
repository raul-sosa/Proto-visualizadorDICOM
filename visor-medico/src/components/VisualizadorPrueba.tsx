import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import Login from './Login';

const VisualizadorPrueba: React.FC = () => {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [registerUser, setRegisterUser] = useState('');
  const [registerPass, setRegisterPass] = useState('');
  const [registerPass2, setRegisterPass2] = useState('');
  const [error, setError] = useState<string>('');
  const [registerError, setRegisterError] = useState<string>('');

  const mainButtonStyle: React.CSSProperties = {
    fontSize: 15,
    padding: '0.5rem 0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  };

  const socialBtnStyle: React.CSSProperties = {
    width: 38,
    height: 38,
    borderRadius: '50%',
    background: '#fff',
    border: '1.5px solid #e0e0e0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
    cursor: 'pointer',
    margin: 0,
    padding: 0,
    transition: 'box-shadow 0.2s',
  };

  const googleLogo = 'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg';
  const facebookLogo = 'https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png';
  const microsoftLogo = 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg';

  const handleSubmit = () => {
    // Implementar lógica de envío de formulario de inicio de sesión
  };

  const handleRegister = () => {
    // Implementar lógica de envío de formulario de registro
  };

  const handleGoogleLogin = () => {
    // Implementar lógica de inicio de sesión con Google
  };

  const handleFacebookLogin = () => {
    // Implementar lógica de inicio de sesión con Facebook
  };

  const handleMicrosoftLogin = () => {
    // Implementar lógica de inicio de sesión con Microsoft
  };

  // Si no está logueado, mostrar el login como página normal 
  if (showLogin && !loggedIn) {
    return (
      <Login
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        registerUser={registerUser}
        setRegisterUser={setRegisterUser}
        registerPass={registerPass}
        setRegisterPass={setRegisterPass}
        registerPass2={registerPass2}
        setRegisterPass2={setRegisterPass2}
        error={error}
        setError={setError}
        registerError={registerError}
        setRegisterError={setRegisterError}
        handleSubmit={handleSubmit}
        handleRegister={handleRegister}
        handleGoogleLogin={handleGoogleLogin}
        handleFacebookLogin={handleFacebookLogin}
        handleMicrosoftLogin={handleMicrosoftLogin}
        mainButtonStyle={mainButtonStyle}
        socialBtnStyle={socialBtnStyle}
        googleLogo={googleLogo}
        facebookLogo={facebookLogo}
        microsoftLogo={microsoftLogo}
        onLogin={() => {
          setShowLogin(false);
          setLoggedIn(true);
          setTimeout(() => navigate('/prueba'), 100);
        }}
      />
    );
  }

  return (
    <div className="layout-wrapper">
      <div className="layout-content" style={{ margin: '2rem auto' }}>
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl m-0">Visualización de Imagen</h2>
            <div className="flex items-center gap-2">
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
              src="http://localhost:8042/instances/c85b3047-e308c3fe-0cf1dccb-a03febc0-52944139/preview" 
              alt="Imagen DICOM"
              style={{ maxWidth: '100%', height: 'auto', margin: '0 auto', display: 'block' }}
              onError={e => { (e.target as HTMLImageElement).src = '/no-image.png'; }}
            />
          </div>

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
        </div>
      </div>
    </div>
  );
};

export default VisualizadorPrueba;

import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';

const googleLogo = 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/640px-Google_%22G%22_logo.svg.png';
const facebookLogo = 'https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png';
const microsoftLogo = 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [registerUser, setRegisterUser] = useState<string>('');
  const [registerPass, setRegisterPass] = useState<string>('');
  const [registerPass2, setRegisterPass2] = useState<string>('');
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

  // Redirección inteligente después de login/registro
  const from = location.state?.from || '/';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    navigate(from, { replace: true });
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterError('');
    if (!registerUser || !registerPass || !registerPass2) {
      setRegisterError('Completa todos los campos');
    } else if (registerPass !== registerPass2) {
      setRegisterError('Las contraseñas no coinciden');
    } else {
      navigate(from, { replace: true });
    }
  };

  const handleGoogleLogin = () => {
    alert('Función de login con Google en desarrollo.');
  };
  const handleFacebookLogin = () => {
    alert('Función de login con Facebook en desarrollo.');
  };
  const handleMicrosoftLogin = () => {
    alert('Función de login con Microsoft en desarrollo.');
  };

  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      background: `url('/fondo-login.png') center center / cover no-repeat fixed`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'auto'
    }}>
      <div style={{
        width: '100%',
        maxWidth: 900,
        background: 'rgba(255,255,255,0.60)',
        borderRadius: 18,
        boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
        padding: 'clamp(32px, 6vw, 32px)',
        display: 'flex',
        flexDirection: 'row',
        gap: 32,
        alignItems: 'stretch',
        justifyContent: 'center',
        minHeight: 400,
        backdropFilter: 'blur(6px)'
      }}>
        {/* Columna Iniciar Sesión */}
        <div style={{ flex: 1, minWidth: 260, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h2 style={{ fontSize: 21, fontWeight: 900, letterSpacing: -1, textAlign: 'center', marginBottom: 18 }}>Iniciar Sesión</h2>
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <div className="mb-2">
              <label htmlFor="username" className="block mb-1">Usuario</label>
              <InputText id="username" value={username} onChange={e => setUsername(e.target.value)} autoFocus className="w-full" />
            </div>
            <div className="mb-2">
              <label htmlFor="password" className="block mb-1">Contraseña</label>
              <Password id="password" value={password} onChange={e => setPassword(e.target.value)} feedback={false} className="w-full" toggleMask />
            </div>
            <div style={{ width: '100%', marginBottom: 7 }}>
              <Button label="Entrar" icon="pi pi-sign-in" className="w-full" type="submit" style={mainButtonStyle} iconPos="left" />
            </div>
            <div style={{ textAlign: 'right', marginBottom: 10 }}>
              <a href="#" style={{ color: '#1976d2', fontSize: 14, textDecoration: 'underline', cursor: 'pointer' }} onClick={e => { e.preventDefault(); alert('Función para recuperar contraseña en desarrollo.'); }}>¿Olvidaste tu contraseña?</a>
            </div>
            {error && <div className="mt-2"><Message severity="error" text={error} /></div>}
          </form>
          <div style={{ width: '100%', margin: '7px 0 0 0', display: 'flex', flexDirection: 'row', gap: 12, justifyContent: 'center', alignItems: 'center' }}>
            <button type="button" title="Google" style={socialBtnStyle} onClick={handleGoogleLogin}>
              <img src={googleLogo} alt="Google" style={{ width: 22, height: 22, display: 'block' }} />
            </button>
            <button type="button" title="Facebook" style={socialBtnStyle} onClick={handleFacebookLogin}>
              <img src={facebookLogo} alt="Facebook" style={{ width: 22, height: 22, display: 'block' }} />
            </button>
            <button type="button" title="Microsoft" style={socialBtnStyle} onClick={handleMicrosoftLogin}>
              <img src={microsoftLogo} alt="Microsoft" style={{ width: 22, height: 22, display: 'block' }} />
            </button>
          </div>
        </div>
        {/* Columna Registro */}
        <div style={{ flex: 1, minWidth: 260, display: 'flex', flexDirection: 'column', justifyContent: 'center', borderLeft: '1px solid #e0e0e0', paddingLeft: 32 }}>
          <h2 style={{ fontSize: 21, fontWeight: 900, letterSpacing: -1, textAlign: 'center', marginBottom: 18 }}>Crear Cuenta</h2>
          <form onSubmit={handleRegister} style={{ width: '100%', maxWidth: 320, margin: '0 auto' }}>
            <div className="mb-2">
              <label htmlFor="registerUser" className="block mb-1">Usuario</label>
              <InputText id="registerUser" value={registerUser} onChange={e => setRegisterUser(e.target.value)} className="w-full" />
            </div>
            <div className="mb-2">
              <label htmlFor="registerPass" className="block mb-1">Contraseña</label>
              <Password id="registerPass" value={registerPass} onChange={e => setRegisterPass(e.target.value)} feedback={false} className="w-full" toggleMask />
            </div>
            <div className="mb-2">
              <label htmlFor="registerPass2" className="block mb-1">Repetir Contraseña</label>
              <Password id="registerPass2" value={registerPass2} onChange={e => setRegisterPass2(e.target.value)} feedback={false} className="w-full" toggleMask />
            </div>
            <div style={{ width: '100%', marginBottom: 7 }}>
              <Button label="Crear Cuenta" icon="pi pi-user-plus" className="w-full" type="submit" style={mainButtonStyle} iconPos="left" />
            </div>
            {registerError && <div className="mt-2"><Message severity="error" text={registerError} /></div>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

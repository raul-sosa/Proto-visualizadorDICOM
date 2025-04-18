import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';

const googleLogo = 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/640px-Google_%22G%22_logo.svg.png';
const facebookLogo = 'https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png';
const microsoftLogo = 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg';

interface LoginProps {
  username: string;
  setUsername: (username: string) => void;
  password: string;
  setPassword: (password: string) => void;
  registerUser: string;
  setRegisterUser: (registerUser: string) => void;
  registerPass: string;
  setRegisterPass: (registerPass: string) => void;
  registerPass2: string;
  setRegisterPass2: (registerPass2: string) => void;
  error: string;
  setError: (error: string) => void;
  registerError: string;
  setRegisterError: (registerError: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  handleRegister: (e: React.FormEvent) => void;
  handleGoogleLogin: () => void;
  handleFacebookLogin: () => void;
  handleMicrosoftLogin: () => void;
  mainButtonStyle: React.CSSProperties;
  socialBtnStyle: React.CSSProperties;
  googleLogo: string;
  facebookLogo: string;
  microsoftLogo: string;
}

const Login: React.FC<LoginProps> = ({
  username,
  setUsername,
  password,
  setPassword,
  registerUser,
  setRegisterUser,
  registerPass,
  setRegisterPass,
  registerPass2,
  setRegisterPass2,
  error,
  setError,
  registerError,
  setRegisterError,
  handleSubmit,
  handleRegister,
  handleGoogleLogin,
  handleFacebookLogin,
  handleMicrosoftLogin,
  mainButtonStyle,
  socialBtnStyle,
  googleLogo,
  facebookLogo,
  microsoftLogo,
}) => {
  return (
    <>
      <style>{`
        body {
          background: #fff !important;
        }
      `}</style>
      {/* Login central, igual que /prueba: fondo translúcido, componentes completos y legibles */}
      <div style={{
        width: '100%',
        maxWidth: 500,
        background: 'rgba(255,255,255,0.55)', // Fondo translúcido igual que en /prueba
        borderRadius: 18,
        boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
        padding: 'clamp(32px, 6vw, 32px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 320,
        backdropFilter: 'blur(6px)'
      }}>
        <h2 style={{ margin: 0, fontSize: 19, fontWeight: 900, letterSpacing: -1, textAlign: 'center', marginBottom: 18 }}>Iniciar Sesión</h2>
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
        <hr style={{ margin: '24px 0' }} />
        <h2 style={{ margin: '0 0 10px 0', fontSize: 19, fontWeight: 900, letterSpacing: -1, textAlign: 'center' }}>Crear Cuenta</h2>
        <form onSubmit={handleRegister} style={{ width: '100%', maxWidth: 280, margin: '0 auto' }}>
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
    </>
  );
};

const LoginPage: React.FC = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [loggedIn, setLoggedIn] = useState(false);
  // Redirige al destino original después de login
  const from = (location.state && (location.state as any).from) || '/';

  // Estados del formulario de login
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [registerUser, setRegisterUser] = useState<string>('');
  const [registerPass, setRegisterPass] = useState<string>('');
  const [registerPass2, setRegisterPass2] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [registerError, setRegisterError] = useState<string>('');

  // Bloquear scroll en login
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  if (loggedIn) {
    setTimeout(() => navigate('/'), 100);
    return null;
  }

  // Handlers
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!username || !password) {
      setError('Por favor ingresa usuario y contraseña');
      return;
    }
    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: username, 
          password :password })
      });
      if (!response.ok) {
        const err = await response.json();
        setError(err.message || 'Error al iniciar sesión');
        return;
      }
      const data = await response.json();
      // Si no hay nombre, considerar que el login falló
      if (!data.name) {
        setError('Usuario o contraseña incorrectos');
        return;
      }
      setUser({ id: data.id, name: data.name, email: data.email });
      setLoggedIn(true);
    } catch (err) {
      setError('Error de red o del servidor');
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterError('');
    if (!registerUser || !registerPass || !registerPass2) {
      setRegisterError('Completa todos los campos');
      return;
    }
    if (registerPass !== registerPass2) {
      setRegisterError('Las contraseñas no coinciden');
      return;
    }
    try {
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: registerUser, 
          password: registerPass })
      });
      if (!response.ok) {
        const err = await response.json();
        console.log('Error al registrar usuario:', err);
        setRegisterError(err.error || err.message || 'Error al registrar usuario');
        return;
      }
      const data = await response.json();
      // Si no hay email, considerar que el registro falló
      if (!data.email) {
        setRegisterError('No se pudo registrar el usuario');
        return;
      }
      setUser({ id: data.id, name: data.name || data.email, email: data.email });
      setLoggedIn(true);
      setRegisterUser('');
      setRegisterPass('');
      setRegisterPass2('');
    } catch (err) {
      setRegisterError('Error de red o del servidor');
    }
  };

  // Social login handlers (simulados)
  const handleGoogleLogin = () => {
    alert('Función de login con Google en desarrollo.');
  };
  const handleFacebookLogin = () => {
    alert('Función de login con Facebook en desarrollo.');
  };
  const handleMicrosoftLogin = () => {
    alert('Función de login con Microsoft en desarrollo.');
  };

  // Estilos
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
    />
  );
};

export default LoginPage;

import React from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';

interface LoginProps {
  username: string;
  setUsername: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  registerUser: string;
  setRegisterUser: (value: string) => void;
  registerPass: string;
  setRegisterPass: (value: string) => void;
  registerPass2: string;
  setRegisterPass2: (value: string) => void;
  error: string;
  setError: (value: string) => void;
  registerError: string;
  setRegisterError: (value: string) => void;
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
  showCancel?: boolean;
  onCancel?: () => void;
}

const logoUrl = '/DCV-logo.png';
const googleLogo = 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/640px-Google_%22G%22_logo.svg.png';
const facebookLogo = 'https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png';
const microsoftLogo = 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg';

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
  showCancel,
  onCancel,
}) => {
  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      background: 'url(/fondo-login.png) center center / cover no-repeat',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'fixed',
      left: 0,
      top: 0,
      zIndex: 1000,
    }}>
      <div
        style={{
          maxWidth: 900,
          minWidth: 320,
          width: '95%',
          background: 'rgba(255,255,255,0.98)',
          borderRadius: 24,
          boxShadow: '0 12px 40px rgba(0,0,0,0.20)',
          padding: 'clamp(18px, 3vw, 28px)',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'stretch',
          justifyContent: 'center',
          minHeight: 220,
          gap: 0,
          overflow: 'hidden',
          transition: 'all 0.2s',
        }}
      >
        {/* Lado Izquierdo: Iniciar Sesión */}
        <div style={{ flex: 1, padding: '0 2vw', display: 'flex', flexDirection: 'column', justifyContent: 'center', borderRight: '1px solid #eee', minWidth: 0 }}>
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 10 }}>
            <h2 style={{ margin: 0, fontSize: 19, fontWeight: 900, letterSpacing: -1 }}>Iniciar Sesión</h2>
          </div>
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
        </div>
        {/* Lado Derecho: Crear Cuenta */}
        <div style={{ flex: 1, padding: '0 2vw', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minWidth: 0 }}>
          <h2 style={{ margin: '0 0 10px 0', fontSize: 19, fontWeight: 900, letterSpacing: -1 }}>Crear Cuenta</h2>
          <form onSubmit={handleRegister} style={{ width: '100%', maxWidth: 200 }}>
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
      {showCancel && (
        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={onCancel} />
        </div>
      )}
    </div>
  );
};

export default Login;

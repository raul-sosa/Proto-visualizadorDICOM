import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate, useLocation } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { useAuth } from '../context/AuthContext';

const googleLogo = 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/640px-Google_%22G%22_logo.svg.png';
const facebookLogo = 'https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png';
const microsoftLogo = 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg';

const LoginPage: React.FC = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [registerUser, setRegisterUser] = useState<string>('');
  const [registerPass, setRegisterPass] = useState<string>('');
  const [registerPass2, setRegisterPass2] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [registerError, setRegisterError] = useState<string>('');
  const [session, setSession] = useState<{ email: string | null, token: string | null }>({
    email: localStorage.getItem('user_email'),
    token: localStorage.getItem('token'),
  });


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
    // Lógica de login con endpoint
    fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: username,
        password: password,
      }),
    })
      .then(async res => {
        const data = await res.json().catch(() => ({}));
        if (!res.ok || !data.success) {
          throw new Error(data.message || 'Error al iniciar sesión');
        }
        // Guardar token y email en localStorage
        if (data.data && data.data.token && data.data.user && data.data.user.email) {
          localStorage.setItem('token', data.data.token);
          localStorage.setItem('user_email', data.data.user.email);
          setSession({ token: data.data.token, email: data.data.user.email });
        }
        setError('');
        await Swal.fire({
          icon: 'success',
          title: 'Inicio de sesión exitoso',
          showConfirmButton: false,
          timer: 1300
        });
        navigate(from, { replace: true });
      })
      .catch(err => {
        setError(err.message || 'Error al iniciar sesión');
      });
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterError('');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!registerUser || !registerPass || !registerPass2) {
      setRegisterError('Completa todos los campos');
    } else if (!emailRegex.test(registerUser)) {
      Swal.fire({
        icon: 'error',
        title: 'Correo inválido',
        text: 'Por favor, ingresa un correo electrónico válido.',
        confirmButtonColor: '#d33'
      });
      return;
    } else if (registerPass !== registerPass2) {
      setRegisterError('Las contraseñas no coinciden');
    } else {
      // Lógica de registro con endpoint
      fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: registerUser,
          password: registerPass,
        }),
      })
        .then(async res => {
          if (!res.ok) {
            const data = await res.json().catch(() => ({}));
            if (res.status === 400) {
              await Swal.fire({
                icon: 'error',
                title: 'Usuario ya registrado',
                text: data.message || 'El correo electrónico ya está registrado.',
                confirmButtonColor: '#d33'
              });
            }
            throw new Error(data.message || 'Error al registrar usuario');
          }
          // Registro exitoso, puedes redirigir o mostrar mensaje
          setRegisterError('');
          await Swal.fire({
            icon: 'success',
            title: 'Registro exitoso',
            text: 'Tu cuenta ha sido creada correctamente.',
            confirmButtonColor: '#3085d6',
            timer: 1600,
            showConfirmButton: false
          });
          // Ya no redirige automáticamente al home tras registrar

        })
        .catch(err => {
          setRegisterError(err.message || 'Error al registrar usuario');
        });
    }
  };

  const handleGoogleLogin = () => {
    Swal.fire({
      icon: 'info',
      title: 'Próximamente',
      text: 'Función de login con Google en desarrollo.',
      confirmButtonColor: '#3085d6'
    });
  };
  const handleFacebookLogin = () => {
    Swal.fire({
      icon: 'info',
      title: 'Próximamente',
      text: 'Función de login con Facebook en desarrollo.',
      confirmButtonColor: '#3085d6'
    });
  };
  const handleMicrosoftLogin = () => {
    Swal.fire({
      icon: 'info',
      title: 'Próximamente',
      text: 'Función de login con Microsoft en desarrollo.',
      confirmButtonColor: '#3085d6'
    });
  };


  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      background: `url('/fondo-login.png') center center / cover no-repeat fixed`,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'auto',
      position: 'relative'
    }}>
      {/* Botón X para regresar, esquina superior derecha */}
      <div style={{ position: 'fixed', top: 38, right: 38, zIndex: 10 }}>
        <Button
          icon="pi pi-times"
          className="p-button-text p-button-rounded p-button-danger"
          style={{ fontSize: 24, width: 48, height: 48 }}
          onClick={() => navigate(-1)}
          title="Regresar"
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <div style={{
          width: '100%',
          maxWidth: 900,
          background: 'rgba(255,255,255,0.60)',
          borderRadius: 18,
          boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
          padding: 'clamp(48px, 8vw, 56px)',
          display: 'flex',
          flexDirection: 'column',
          gap: 0,
          alignItems: 'stretch',
          justifyContent: 'center',
          minHeight: 540,
          backdropFilter: 'blur(6px)'
        }}>
          {/* Sección superior: columnas login y registro */}
          <div style={{ display: 'flex', flexDirection: 'row', gap: 32, alignItems: 'stretch', justifyContent: 'center', width: '100%' }}>
            {/* Columna Iniciar Sesión */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24, flex: 1, minWidth: 0 }}>
              <h2 style={{ fontSize: 24, fontWeight: 900, letterSpacing: -1, textAlign: 'center', marginBottom: 18 }}>Iniciar Sesión</h2>
              <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                <div className="mb-2">
                  <label htmlFor="username" className="block mb-1">Correo electrónico</label>
                  <InputText id="username" value={username} onChange={e => setUsername(e.target.value)} autoComplete="username" className="w-full" placeholder="Correo electrónico" style={{ fontSize: 18, height: 44 }} />
                </div>
                <div className="mb-2">
                  <label htmlFor="password" className="block mb-1">Contraseña</label>
                  <Password id="password" value={password} onChange={e => setPassword(e.target.value)} feedback={false} toggleMask className="w-full" placeholder="Contraseña" inputStyle={{ fontSize: 18, height: 44 }} />
                </div>
                {error && <Message severity="error" text={error} style={{ marginBottom: 8 }} />}
                {session.token ? (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontWeight: 500, color: '#388e3c', fontSize: 16 }}>
                      Sesión iniciada, hola {session.email}
                    </span>
                    <Button
                      label="Cerrar sesión"
                      icon="pi pi-sign-out"
                      className="p-button-danger"
                      style={{ ...mainButtonStyle, width: '140px', minWidth: 0, padding: '0.6rem 0.7rem', fontSize: 17 }}
                      onClick={async () => {
                        localStorage.removeItem('token');
                        localStorage.removeItem('user_email');
                        setSession({ token: null, email: null });
                        setUsername('');
                        setPassword('');
                        setError('');
                        await Swal.fire({
                          icon: 'info',
                          title: 'Sesión cerrada',
                          text: 'Has cerrado sesión correctamente.',
                          timer: 1400,
                          showConfirmButton: false
                        });
                      }}
                    />
                  </div>
                ) : (
                  <Button type="submit" label="Entrar" icon="pi pi-sign-in" iconPos="left" style={{ ...mainButtonStyle, width: '140px', minWidth: 0, padding: '0.6rem 0.7rem', fontSize: 17, margin: '18px auto 0 auto', display: 'block', justifyContent: 'center' }} />
                )}
              </form>
              <div style={{ textAlign: 'right', marginBottom: 10 }}>
                <a href="#" style={{ color: '#1976d2', fontSize: 15, textDecoration: 'underline', cursor: 'pointer' }} onClick={e => { e.preventDefault(); alert('Función para recuperar contraseña en desarrollo.'); }}>¿Olvidaste tu contraseña?</a>
              </div>
            </div>
            {/* Línea divisoria vertical */}
            <div style={{ width: 1, background: '#e0e0e0', margin: '0 16px', minHeight: 320, alignSelf: 'center' }} />
            {/* Columna Crear Cuenta */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24, flex: 1, minWidth: 0 }}>
              <h2 style={{ fontSize: 24, fontWeight: 900, letterSpacing: -1, textAlign: 'center', marginBottom: 18 }}>Crear Cuenta</h2>
              <form onSubmit={handleRegister} style={{ width: '100%', maxWidth: 320, margin: '0 auto' }}>
                <div className="mb-2">
                  <label htmlFor="registerUser" className="block mb-1">Correo electrónico</label>
                  <InputText id="registerUser" value={registerUser} onChange={e => setRegisterUser(e.target.value)} autoComplete="username" className="w-full" placeholder="Correo electrónico" style={{ fontSize: 18, height: 44 }} />
                </div>
                <div className="mb-2">
                  <label htmlFor="registerPass" className="block mb-1">Contraseña</label>
                  <Password id="registerPass" value={registerPass} onChange={e => setRegisterPass(e.target.value)} feedback={false} toggleMask className="w-full" placeholder="Contraseña" inputStyle={{ fontSize: 18, height: 44 }} />
                </div>
                <div className="mb-2">
                  <label htmlFor="registerPass2" className="block mb-1">Repetir Contraseña</label>
                  <Password id="registerPass2" value={registerPass2} onChange={e => setRegisterPass2(e.target.value)} feedback={false} toggleMask className="w-full" placeholder="Repetir contraseña" inputStyle={{ fontSize: 18, height: 44 }} />
                </div>
                {registerError && <Message severity="error" text={registerError} style={{ marginBottom: 8 }} />}
                <Button type="submit" label="Crear" icon="pi pi-user-plus" iconPos="left" style={{ ...mainButtonStyle, width: '140px', minWidth: 0, padding: '0.6rem 0.7rem', fontSize: 17, margin: '14px auto 0 auto', display: 'block', justifyContent: 'center' }} />
              </form>
            </div>
          </div>
          {/* Sección inferior: social login */}
          <div style={{ width: '100%', marginTop: 32, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ textAlign: 'center', color: '#888', fontSize: 16, marginBottom: 14 }}>
              <span>o inicia sesión con:</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', gap: 32, justifyContent: 'center', alignItems: 'center', marginBottom: 0 }}>
              <button type="button" title="Google" style={{ ...socialBtnStyle, width: 64, height: 64 }} onClick={handleGoogleLogin}>
                <img src={googleLogo} alt="Google" style={{ width: 38, height: 38, display: 'block' }} />
              </button>
              <button type="button" title="Facebook" style={{ ...socialBtnStyle, width: 64, height: 64 }} onClick={handleFacebookLogin}>
                <img src={facebookLogo} alt="Facebook" style={{ width: 38, height: 38, display: 'block' }} />
              </button>
              <button type="button" title="Microsoft" style={{ ...socialBtnStyle, width: 64, height: 64 }} onClick={handleMicrosoftLogin}>
                <img src={microsoftLogo} alt="Microsoft" style={{ width: 38, height: 38, display: 'block' }} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

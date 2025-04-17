import React, { useState, useEffect, useRef } from "react";
import * as cornerstone from "@cornerstonejs/core";
import {
  ToolGroupManager,
  Enums as csToolsEnums,
  ZoomTool,
  WindowLevelTool,
  PanTool,
  init as csToolsInit,
  addTool,
} from "@cornerstonejs/tools";
import { init as initLoader } from "@cornerstonejs/dicom-image-loader";
import Header from './Header';
import Login from './Login';

export default function DicomViewer() {
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
    // Implementar lógica de inicio de sesión
  };

  const handleRegister = () => {
    // Implementar lógica de registro
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

  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initCornerstone = async () => {
      const element = elementRef.current;
      if (!element) return;

      try {
        // Inicializar Cornerstone
        await cornerstone.init();
        await csToolsInit();
        await initLoader();

        // Registrar las herramientas globalmente
        addTool(ZoomTool);
        addTool(WindowLevelTool);
        addTool(PanTool);

        // Crear el viewport
        const renderingEngineId = "myRenderingEngine";
        const viewportId = "CT_AXIAL_STACK";
        const renderingEngine = new cornerstone.RenderingEngine(renderingEngineId);

        const viewportInput = {
          viewportId,
          element,
          type: cornerstone.Enums.ViewportType.STACK,
          defaultOptions: {
            background: [0, 0, 0] as [number, number, number],
            orientation: cornerstone.Enums.OrientationAxis.AXIAL,
          },
        };

        renderingEngine.enableElement(viewportInput);
        const viewport = renderingEngine.getViewport(viewportId) as cornerstone.Types.IStackViewport;

        // Configurar herramientas
        const toolGroupId = "myToolGroup";
        const existingToolGroup = ToolGroupManager.getToolGroup(toolGroupId);
        if (existingToolGroup) {
          ToolGroupManager.destroyToolGroup(toolGroupId);
        }
        const toolGroup = ToolGroupManager.createToolGroup(toolGroupId);
        if (toolGroup) {
          toolGroup.addTool(ZoomTool.toolName);
          toolGroup.addTool(WindowLevelTool.toolName);
          toolGroup.addTool(PanTool.toolName);
          toolGroup.setToolActive(ZoomTool.toolName, {
            bindings: [{ mouseButton: csToolsEnums.MouseBindings.Secondary }],
          });
          toolGroup.setToolActive(WindowLevelTool.toolName, {
            bindings: [{ mouseButton: csToolsEnums.MouseBindings.Primary }],
          });
          toolGroup.setToolActive(PanTool.toolName, {
            bindings: [{ mouseButton: csToolsEnums.MouseBindings.Auxiliary }],
          });
          toolGroup.addViewport(viewportId, renderingEngineId);
        }

        // Usar el loader estándar de Cornerstone para DICOMweb/WADO-URI
        const imageId = "wadouri:http://localhost:8042/instances/c85b3047-e308c3fe-0cf1dccb-a03febc0-52944139/file";
        await viewport.setStack([imageId]);
        await viewport.render();
      } catch (error) {
        console.error("Error loading image:", error);
      }
    };
    initCornerstone();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!loggedIn) {
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
  }

  return (
    <div className="layout-wrapper">
      <Header />
      <div style={{ width: '100%', height: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#111', borderRadius: '1rem', marginTop: 32 }}>
        <div 
          ref={elementRef}
          style={{
            width: '100%',
            height: '480px',
            backgroundColor: '#000',
            position: 'relative'
          }}
        />
      </div>
    </div>
  );
}

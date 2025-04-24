# Proto-visualizadorDICOM

![GitHub License](https://img.shields.io/github/license/raul-sosa/Proto-visualizadorDICOM)
![GitHub Stars](https://img.shields.io/github/stars/raul-sosa/Proto-visualizadorDICOM)

Un visualizador de imágenes médicas DICOM completo con capacidades de visualización simple y avanzada mediante la integración con OHIF Viewer y servidor Orthanc.

<p align="center">
  <img src="https://ohif.org/img/logo.svg" alt="OHIF Viewer Logo" width="180"/>
</p>

## Características

- **Visualización Dual**: 
  - Visor simple con controles básicos para zoom, brillo y contraste
  - Visor avanzado basado en OHIF con herramientas médicas profesionales
- **Integración con Orthanc**: Almacenamiento y recuperación de imágenes DICOM
- **Interfaz React Moderna**: Diseño responsivo y amigable
- **Fácil Configuración**: Utilizando Docker para el servidor Orthanc

## Requisitos del Sistema

- **Node.js**: v16.0.0 o superior
- **NPM/Yarn**: Última versión estable
- **Docker y Docker Compose**: Para Orthanc Server
- **Navegador moderno**: Chrome, Firefox, Edge (últimas 2 versiones)
- **Espacio en disco**: Mínimo 2GB para instalación y dependencias

## Instalación

### 1. Clonar el Repositorio

```bash
git clone https://github.com/raul-sosa/Proto-visualizadorDICOM.git
cd Proto-visualizadorDICOM
```

### 2. Configurar el Servidor Orthanc

Desde el directorio principal:

```bash
cd visor-medico
docker-compose up -d
```

Verifique que el servidor Orthanc esté funcionando correctamente accediendo a [http://localhost:8042](http://localhost:8042) (usuario: `orthanc`, contraseña: `orthanc`).

### 3. Instalar Dependencias de la Aplicación Principal

```bash
cd visor-medico
npm install
```

### 4. Configurar OHIF Viewer

```bash
cd ../ohif-viewer-local
yarn install
```

## Ejecución del Proyecto

### 1. Iniciar el Servidor Orthanc (si no está en ejecución)

```bash
cd visor-medico
docker-compose up -d
```

### 2. Iniciar la Aplicación Principal

```bash
cd visor-medico
npm run dev
```

La aplicación principal estará disponible en: [http://localhost:5173](http://localhost:5173)

### 3. Iniciar OHIF Viewer

En una nueva terminal:

```bash
cd ohif-viewer-local
yarn dev:fast
```

El OHIF Viewer estará disponible en: [http://localhost:3000](http://localhost:3000)

## Arquitectura del Sistema

```
Proto-visualizadorDICOM/
├── visor-medico/               # Aplicación React principal
│   ├── src/components/        
│   │   └── VisualizadorPrueba.tsx   # Componente principal del visor
│   └── docker-compose.yml      # Configuración del servidor Orthanc
├── ohif-viewer-local/          # OHIF Viewer para visualización avanzada
└── ApiRestOpenhealth/          # API REST para comunicación con servicios
```

## Guía de Uso

1. Navegue a [http://localhost:5173](http://localhost:5173) para acceder a la aplicación principal
2. El sistema permite:
   - Visualizar imágenes DICOM en modo simple o avanzado
   - Alternar entre ambos modos mediante un botón de cambio
   - Manipular imágenes con herramientas de ajuste profesionales
   
## Configuración Técnica

### Conexiones y Puertos
- **Aplicación principal**: http://localhost:5173
- **OHIF Viewer**: http://localhost:3000
- **Servidor Orthanc**: http://localhost:8042

### Proxy
La aplicación utiliza una configuración de proxy en `vite.config.ts` que redirige las solicitudes:
- `/orthanc` → `http://localhost:8042`

### Imágenes de Prueba
Para probar el sistema, puede utilizar el siguiente ID de instancia DICOM:
```
efebc324-9433a127-dadb8db9-d63025b2-81de68ff
```

## Solución de Problemas

| Problema | Solución |
|----------|----------|
| El servidor Orthanc no inicia | Verifique que Docker esté ejecutándose y los puertos 8042 no estén en uso |
| OHIF Viewer no se conecta al servidor | Asegúrese de que Orthanc esté funcionando y accesible en http://localhost:8042 |
| Imágenes no se muestran | Confirme que las imágenes DICOM están cargadas correctamente en Orthanc |
| Error de compilación | Ejecute `npm install` en visor-medico y `yarn install` en ohif-viewer-local |

## Desarrollo

### Personalización del OHIF Viewer

Para modificar la apariencia del OHIF Viewer:

1. Crear una rama específica para cambios visuales:
   ```bash
   git checkout -b feature/customize-ohif
   ```

2. Los archivos principales para personalización son:
   - `ohif-viewer-local/platform/ui/src/assets/styles/styles.css`
   - `ohif-viewer-local/platform/app/public/config/default.js`
   - `ohif-viewer-local/platform/ui/src/components/ThemeWrapper/ThemeWrapper.tsx`

3. Para ver los cambios, reinicie el servidor OHIF:
   ```bash
   cd ohif-viewer-local
   yarn dev:fast
   ```

## Contacto y Soporte

Si encuentra problemas o tiene preguntas, por favor:
1. Abra un issue en el [repositorio GitHub](https://github.com/raul-sosa/Proto-visualizadorDICOM/issues)
2. Proporcione detalles sobre su entorno y los pasos para reproducir el problema

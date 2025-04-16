# Visor Médico DICOM

Este proyecto es un visualizador de imágenes DICOM que utiliza React, TypeScript y Cornerstone.

## Requisitos Previos

- Node.js (versión 16 o superior)
- Docker y Docker Compose
- Git

## Pasos de Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/raul-sosa/Proto-visualizadorDICOM.git
cd visor-medico
```

2. Instalar las dependencias:
```bash
npm install
```

3. Iniciar el servidor Orthanc (DICOM):
```bash
docker compose up -d
```

4. Iniciar la aplicación en modo desarrollo:
```bash
npm run dev
```

5. Abrir la aplicación en el navegador:
- La aplicación estará disponible en: http://localhost:5174
- El servidor Orthanc estará disponible en: http://localhost:8042

## Estructura del Proyecto

- `/src/components/` - Componentes React
  - `DicomViewer.tsx` - Visualizador DICOM principal usando Cornerstone
  - `VisualizadorPrueba.tsx` - Visualizador simple usando el visor web de Orthanc
- `/docker-compose.yml` - Configuración del servidor Orthanc
- `/orthanc.json` - Configuración adicional de Orthanc

## Características

- Visualización de imágenes DICOM usando Cornerstone
- Visor web alternativo usando Orthanc
- Soporte para CORS configurado
- Interfaz moderna con PrimeReact

## Solución de Problemas

Si encuentras problemas con CORS:
1. Verifica que el servidor Orthanc esté ejecutándose: `docker compose ps`
2. Reinicia el servidor Orthanc: `docker compose restart`
3. Asegúrate de que los puertos 8042 y 5174 no estén siendo usados por otras aplicaciones

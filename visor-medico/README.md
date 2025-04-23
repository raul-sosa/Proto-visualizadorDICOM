# Visualizador DICOM con Orthanc, OHIF y React

Este proyecto es un visualizador DICOM que integra React, Orthanc vía Docker, y OHIF Viewer para una experiencia completa de visualización de imágenes médicas. Permite visualizar imágenes DICOM tanto en modo simple como avanzado, ideal para pruebas y desarrollo local.

## Componentes del Proyecto

El proyecto consta de tres partes principales:
1. **Aplicación React (visor-medico)**: Interfaz de usuario principal con componentes para listar y mostrar estudios DICOM
2. **Servidor Orthanc**: Almacenamiento y gestión de imágenes DICOM (ejecutado en Docker)
3. **OHIF Viewer**: Visor avanzado de imágenes médicas (integrado como iframe)

## Requisitos

- [Node.js](https://nodejs.org/) (v16+ recomendado)
- [Docker Desktop](https://www.docker.com/products/docker-desktop)
- [Git](https://git-scm.com/) para clonar el repositorio

## Instalación y uso

### 1. Clonar el repositorio

```bash
git clone https://github.com/raul-sosa/Proto-visualizadorDICOM.git
cd Proto-visualizadorDICOM
```

### 2. Configurar y arrancar Orthanc

```bash
cd visor-medico
docker-compose down  # Detén y elimina contenedores viejos
docker-compose up -d # Inicia Orthanc
```

- Verifica en Docker Desktop que Orthanc está ejecutándose en el puerto 8042
- Accede a la interfaz web de Orthanc: [http://localhost:8042/](http://localhost:8042/)
- Usa la interfaz para subir archivos DICOM (.dcm)

### 3. Instalar dependencias e iniciar la aplicación React

```bash
# En la carpeta visor-medico
npm install
npm run dev
```

### 4. Configurar y arrancar OHIF Viewer

```bash
# En otra terminal, desde la carpeta raíz
cd ohif-viewer-local
yarn install
yarn dev
```

- El visor OHIF estará disponible en: [http://localhost:3000/](http://localhost:3000/)

### 5. Acceder a la aplicación completa

- Aplicación principal: [http://localhost:5173/](http://localhost:5173/)
- El visualizador te permite alternar entre:
  - **Visor Simple**: Visualización directa de las imágenes desde Orthanc
  - **Visor Avanzado**: Interfaz completa de OHIF Viewer integrada en la aplicación

## Estructura de la Aplicación

- `/visor-medico/` - Aplicación React principal (usa npm)
  - `/src/components/` - Componentes React
    - `DicomViewer.tsx` - Visualizador DICOM simple utilizando Cornerstone
    - `VisualizadorPrueba.tsx` - Componente principal que integra ambos visores
    - `StudyList.tsx` - Listado de estudios disponibles
  - `/docker-compose.yml` - Configuración del servidor Orthanc
  - `/orthanc.json` - Configuración adicional de Orthanc

- `/ohif-viewer-local/` - Instancia local de OHIF Viewer (usa yarn)

## Notas Importantes

1. **Configuración de CORS**: El servidor Orthanc está configurado para permitir peticiones desde cualquier origen (`*`) durante el desarrollo. Para producción, esto debe restringirse.

2. **Estudios de prueba**: La aplicación incluye varios estudios de ejemplo predefinidos. Para utilizar tus propias imágenes:
   - Sube los archivos DICOM a Orthanc usando la interfaz web
   - Copia el StudyInstanceUID del estudio
   - Actualiza la lista de estudios en `VisualizadorPrueba.tsx` o simplemente usa los estudios predefinidos

3. **Solución de problemas comunes**:
   - Si hay problemas de CORS: Asegúrate de que Orthanc esté correctamente configurado y reinicia los servicios
   - Si OHIF no muestra imágenes: Verifica que la URL y los parámetros en la función `ohifUrl()` sean correctos
   - Si la aplicación React no carga: Comprueba los puertos (5173 para React, 3000 para OHIF, 8042 para Orthanc)

4. **Gestores de paquetes**: El proyecto utiliza dos gestores de paquetes diferentes:
   - `visor-medico` utiliza npm
   - `ohif-viewer-local` utiliza yarn
   
   Asegúrate de usar el gestor de paquetes correcto en cada directorio.

5. **Funcionamiento offline**: Una vez cargadas las imágenes en Orthanc, puedes trabajar sin conexión a internet

---

Para preguntas o problemas, revisa los logs de Docker, la consola del navegador, o abre un issue en el repositorio.

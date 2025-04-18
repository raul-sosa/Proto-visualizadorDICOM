# Visualizador DICOM con Orthanc y React

Este proyecto es un visualizador DICOM simple usando React y Orthanc vía Docker. Permite visualizar imágenes médicas DICOM sin autenticación, ideal para pruebas y desarrollo local.

## Requisitos

- [Node.js](https://nodejs.org/) (v16+ recomendado)
- [Docker Desktop](https://www.docker.com/products/docker-desktop)

## Instalación y uso

1. **Clona el repositorio**
   ```bash
   git clone <url-del-repo>
   cd visor-medico
   ```

2. **Instala las dependencias de Node**
   ```bash
   npm install
   ```

3. **Configura Orthanc para permitir CORS**
   - Ya está preconfigurado en `docker-compose.yml` y `orthanc.json` para permitir el acceso desde el frontend en desarrollo.
   - Si necesitas cambiar el puerto del frontend, actualiza la variable de entorno `ORTHANC__HTTP_ACCESS_CONTROL_ALLOW_ORIGIN` en `docker-compose.yml`.

4. **Arranca Orthanc usando Docker**
   - **Importante:** Asegúrate de detener/eliminar cualquier otro contenedor Orthanc antes de iniciar.
   ```bash
   docker-compose down  # Detén y elimina contenedores viejos
   docker-compose up -d # Inicia Orthanc
   ```
   - Verifica en Docker Desktop que solo hay un Orthanc corriendo, en el puerto 8042.

5. **Carga imágenes DICOM en Orthanc**
   - Abre [http://localhost:8042/](http://localhost:8042/) en tu navegador.
   - Usa la interfaz web de Orthanc para subir archivos `.dcm`.
   - Copia el Instance ID (UUID) de la imagen que quieras visualizar (lo verás en la URL al hacer clic en una instancia).

6. **Configura el Instance ID en el visor**
   - Edita los archivos `src/components/VisualizadorPrueba.tsx` y `src/components/DicomViewer.tsx`.
   - Cambia el valor de `INSTANCE_ID` por el UUID de la instancia que subiste.

7. **Inicia la aplicación React en modo desarrollo**
   ```bash
   npm run dev
   ```

8. **Abre la aplicación en el navegador**
   - Frontend React: [http://localhost:5173/](http://localhost:5173/)
   - Orthanc Web: [http://localhost:8042/](http://localhost:8042/)

## Notas importantes

- Si ves errores de CORS en la consola, asegúrate de que Orthanc esté corriendo solo una vez y que los headers estén bien configurados.
- Si cambias el Instance ID, recuerda actualizarlo en ambos componentes.
- Para producción, **no uses `*` en los headers CORS**.

## Estructura del Proyecto

- `/src/components/` - Componentes React
  - `DicomViewer.tsx` - Visualizador DICOM principal usando Cornerstone
  - `VisualizadorPrueba.tsx` - Visualizador simple usando el visor web de Orthanc
- `/docker-compose.yml` - Configuración del servidor Orthanc
- `/orthanc.json` - Configuración adicional de Orthanc

---

¿Dudas? Abre un issue o revisa los logs de Orthanc y el navegador para diagnosticar problemas comunes.

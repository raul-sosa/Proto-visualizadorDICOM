# Proto-visualizadorDICOM

Visor de imágenes médicas DICOM con funcionalidades simples y avanzadas mediante la integración de OHIF Viewer.

## Descripción

Este proyecto implementa un visualizador de imágenes médicas DICOM que ofrece dos modos de visualización:

1. **Visor Simple**: Muestra directamente la imagen DICOM desde Orthanc con controles básicos (zoom, brillo, contraste)
2. **Visor Avanzado**: Utiliza OHIF Viewer integrado mediante iframe para funcionalidades médicas avanzadas

## Componentes Principales

- **visor-medico**: Aplicación React principal que proporciona la interfaz de usuario
- **OHIF Viewer**: Visor avanzado de imágenes médicas integrado (incluido en `ohif-viewer-local`)
- **Servidor Orthanc**: Servidor DICOM local para almacenamiento de imágenes (ejecutado a través de Docker)

## Requisitos Previos

- Node.js (v16 o superior)
- Yarn
- Docker y Docker Compose
- Git

## Instalación

1. Clonar el repositorio:
   ```
   git clone https://github.com/raul-sosa/Proto-visualizadorDICOM.git
   cd Proto-visualizadorDICOM
   ```

2. Instalar dependencias de la aplicación principal:
   ```
   cd visor-medico
   npm install
   ```

3. Instalar dependencias de OHIF Viewer (opcional si ya está preconfigurado):
   ```
   cd ../ohif-viewer-local
   yarn install
   ```

4. Iniciar el servidor Orthanc con Docker:
   ```
   cd ../visor-medico
   docker-compose up -d
   ```

## Ejecución

Para ejecutar el proyecto completo, necesitas iniciar tanto la aplicación principal como el OHIF Viewer:

1. Iniciar la aplicación principal (visor-medico):
   ```
   cd visor-medico
   npm run dev
   ```
   La aplicación estará disponible en: http://localhost:5173

2. Iniciar OHIF Viewer:
   ```
   cd ohif-viewer-local
   yarn dev:fast
   ```
   El OHIF Viewer estará disponible en: http://localhost:3000

## Estructura del Proyecto

```
Proto-visualizadorDICOM/
├── visor-medico/               # Aplicación React principal
│   ├── src/
│   │   ├── components/
│   │   │   └── VisualizadorPrueba.tsx   # Componente principal del visor
│   │   └── ...
│   ├── public/
│   └── docker-compose.yml      # Configuración de Docker para Orthanc
├── ohif-viewer-local/          # OHIF Viewer para visualización avanzada
├── ApiRestOpenhealth/          # API REST para comunicación con servicios externos
└── README.md                  # Este archivo
```

## Uso

1. Accede a la aplicación principal en http://localhost:5173
2. Utiliza el selector para alternar entre el visor simple y el visor avanzado
3. El visor avanzado (OHIF) proporciona herramientas médicas profesionales para análisis de imágenes

## Información Técnica

- El visor simple se comunica directamente con el servidor Orthanc en http://localhost:8042
- El visor avanzado (OHIF) se integra mediante un iframe y también se conecta al servidor Orthanc
- Se utiliza un proxy configurado en `vite.config.ts` para redirigir las solicitudes a `/orthanc` hacia el servidor Orthanc local

## Desarrollo

Para personalizar el OHIF Viewer, se puede crear una rama separada:
```
git checkout -b feat-cambios-visuales-ohif
```

Los archivos principales para la personalización visual del OHIF Viewer son:
- `ohif-viewer-local/platform/ui/src/assets/styles/styles.css`
- `ohif-viewer-local/platform/app/public/config/default.js`
- `ohif-viewer-local/platform/ui/src/components/ThemeWrapper/ThemeWrapper.tsx`

## Ejemplo de ID de Instancia DICOM

Para pruebas, puedes utilizar el siguiente ID de instancia DICOM:
```
efebc324-9433a127-dadb8db9-d63025b2-81de68ff
```

## Licencia

Este proyecto está licenciado bajo [incluir tipo de licencia]

## Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue para discutir los cambios propuestos antes de enviar un pull request.

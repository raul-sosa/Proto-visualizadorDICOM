import { useEffect, useRef } from "react";
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
import dicomParser from "dicom-parser";

export default function DicomViewer() {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initCornerstone = async () => {
      const element = elementRef.current;
      if (!element) return;

      try {
        // Inicializar Cornerstone
        await cornerstone.init();
        await csToolsInit();
        
        // Configurar el loader DICOM
        await initLoader({
          beforeSend: (xhr) => {
            xhr.setRequestHeader('Accept', 'application/dicom');
          }
        });

        // Registrar las herramientas globalmente
        addTool(ZoomTool);
        addTool(WindowLevelTool);
        addTool(PanTool);

        // Crear el viewport
        const renderingEngineId = "myRenderingEngine";
        const viewportId = "CT_AXIAL_STACK";
        const renderingEngine = new cornerstone.RenderingEngine(renderingEngineId);

        // Crear el viewport
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
        
        // Eliminar el grupo de herramientas si ya existe
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

        try {
          // Cargar la imagen DICOM directamente
          const response = await fetch('http://localhost:8042/instances/c85b3047-e308c3fe-0cf1dccb-a03febc0-52944139/file', {
            method: 'GET',
            headers: {
              'Accept': 'application/dicom',
              'Content-Type': 'application/dicom'
            },
            mode: 'cors',
            credentials: 'include'
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const arrayBuffer = await response.arrayBuffer();
          const byteArray = new Uint8Array(arrayBuffer);

          // Parsear el archivo DICOM
          const dataSet = dicomParser.parseDicom(byteArray);
          console.log("DICOM parseado:", dataSet);

          // Crear un imageId único
          const imageId = `dicom://${Date.now()}`;
          
          // Registrar la imagen en el cache de Cornerstone
          await cornerstone.imageLoader.registerImageLoader(imageId, () => {
            return {
              imageId,
              minPixelValue: 0,
              maxPixelValue: 255,
              slope: 1.0,
              intercept: 0,
              windowCenter: 127,
              windowWidth: 256,
              getPixelData: () => {
                const pixelDataElement = dataSet.elements.x7fe00010;
                return new Uint16Array(arrayBuffer, pixelDataElement.dataOffset, pixelDataElement.length / 2);
              },
              rows: parseInt(dataSet.string('x00280010')),
              columns: parseInt(dataSet.string('x00280011')),
              height: parseInt(dataSet.string('x00280010')),
              width: parseInt(dataSet.string('x00280011')),
              color: false,
              columnPixelSpacing: parseFloat(dataSet.string('x00280030')),
              rowPixelSpacing: parseFloat(dataSet.string('x00280030')),
              sizeInBytes: dataSet.byteArray.length
            };
          });

          // Cargar y mostrar la imagen
          await viewport.setStack([imageId]);
          await viewport.render();

          console.log("Imagen cargada y renderizada");

        } catch (error) {
          console.error("Error al cargar la imagen:", error);
        }

      } catch (error) {
        console.error("Error loading image:", error);
      }
    };

    initCornerstone();
  }, []);

  return (
    <div 
      ref={elementRef}
      style={{
        width: '100%',
        height: '500px',
        backgroundColor: '#000',
        position: 'relative'
      }}
    />
  );
}

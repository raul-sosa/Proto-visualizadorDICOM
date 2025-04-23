import React, { useEffect, useRef } from "react";
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
import Footer from './Footer';

interface DicomViewerProps {
  instanceId: string;
}

export default function DicomViewer({ instanceId }: DicomViewerProps) {
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

        // Cargar imagen seleccionada
        const imageIds = [
          `wadouri:http://localhost:8042/instances/${instanceId}/file`
        ];
        await viewport.setStack(imageIds, 0);
        renderingEngine.render();
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error al inicializar el visualizador DICOM:", error);
      }
    };
    initCornerstone();
  }, [instanceId]);

  return (
    <div className="layout-wrapper">
      <Header />
      <div style={{ padding: '32px 0 0 0', textAlign: 'center', maxWidth: 900, margin: '0 auto' }}>
        <h1 style={{ fontSize: 28, margin: '24px 0 10px 0', fontWeight: 900, letterSpacing: -1 }}>Visualizador DICOM</h1>
        <p style={{ fontSize: 18, margin: '0 0 24px 0', color: '#555' }}>
          Aquí puedes cargar y visualizar tus imágenes médicas.
        </p>
        <div ref={elementRef} style={{ width: 640, height: 480, margin: '0 auto', background: '#111', borderRadius: 8, border: '1px solid #222' }} />
      </div>
      <Footer />
    </div>
  );
}

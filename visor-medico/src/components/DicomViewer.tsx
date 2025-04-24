
import React, { useRef, useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { Slider } from 'primereact/slider';
import Header from './Header';
import Footer from './Footer';

const INSTANCE_IDS = [
  '13720173-43aede2f-13787402-9e669433-65f7640b',
  'c38396bc-efb8a730-563bc4b0-416a5d87-65c03a7d',
  'efebc324-9433a127-dadb8db9-d63025b2-81de68ff',
  'da4a4cc9-aaa17620-4f3224a1-c26610c7-8e09f740',
  '70f08b57-66947071-ea436bd3-aa4ff8e9-db5afa62',
  '1d27f80f-9a2a24df-cbb31f02-509342f7-512b2d5a',
  '71698035-d9a98911-27e30550-837869a4-1c033c43',
  '1bf9d9f7-948e4d33-7ee7d072-23439a73-a2258297',
  'd7df669f-d84efd1b-6873021f-a2091d97-1c405d10',
];

const LOCAL_COMMENTS_KEY = `comments_${INSTANCE_IDS[0]}`;

const VisualizadorSimple: React.FC = () => {
  // Nuevo estado para la imagen seleccionada
  const [selectedIdx, setSelectedIdx] = useState(0);
  const INSTANCE_ID = INSTANCE_IDS[selectedIdx];
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [comments, setComments] = useState<string[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  // Estados para pan
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });

  // Eventos de pan
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom <= 1) return;
    setDragging(true);
    setLastPos({ x: e.clientX, y: e.clientY });
    // Evita seleccionar texto
    document.body.style.userSelect = 'none';
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging || zoom <= 1) return;
    const dx = e.clientX - lastPos.x;
    const dy = e.clientY - lastPos.y;
    setLastPos({ x: e.clientX, y: e.clientY });
    setPan(prev => {
      // Limita el pan para no salir de la imagen
      const container = containerRef.current;
      const img = imgRef.current;
      if (!container || !img) return prev;
      const containerRect = container.getBoundingClientRect();
      const imgRect = img.getBoundingClientRect();
      // Tamaño visible
      const maxPanX = ((zoom - 1) * containerRect.width) / 2;
      const maxPanY = ((zoom - 1) * containerRect.height) / 2;
      let newX = prev.x + dx;
      let newY = prev.y + dy;
      newX = Math.max(-maxPanX, Math.min(maxPanX, newX));
      newY = Math.max(-maxPanY, Math.min(maxPanY, newY));
      return { x: newX, y: newY };
    });
  };

  const handleMouseUp = () => {
    setDragging(false);
    document.body.style.userSelect = '';
  };

  // Reset pan al cambiar zoom
  useEffect(() => {
    setPan({ x: 0, y: 0 });
  }, [zoom]);

  // Cargar comentarios de localStorage
  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_COMMENTS_KEY);
    if (stored) setComments(JSON.parse(stored));
  }, []);

  // Guardar comentarios en localStorage
  useEffect(() => {
    localStorage.setItem(LOCAL_COMMENTS_KEY, JSON.stringify(comments));
  }, [comments]);

  useEffect(() => {
    if (!('speechSynthesis' in window)) return;
    const handleEnd = () => setIsSpeaking(false);
    window.speechSynthesis.addEventListener('end', handleEnd);
    window.speechSynthesis.addEventListener('voiceschanged', () => {});
    return () => {
      window.speechSynthesis.removeEventListener('end', handleEnd);
    };
  }, []);

  const handleZoom = (factor: number) => {
    setZoom((prev) => Math.max(1, Math.min(prev * factor, 5)));
  };

  const handleTalkback = () => {
    const text =
      'Tipo: Resonancia Magnética. Paciente: Juan Pérez. Edad: 42 años. Fecha: 2023-10-01. Descripción: Estudio de cerebro.';
    if ('speechSynthesis' in window) {
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      }
      const utterance = new window.SpeechSynthesisUtterance(text);
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    } else {
      alert('Tu navegador no soporta síntesis de voz.');
    }
  };

  const handlePauseTalkback = () => {
    if ('speechSynthesis' in window) {
      if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
        window.speechSynthesis.pause();
        setIsSpeaking(false);
      } else if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
        setIsSpeaking(true);
      }
    }
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([...comments, newComment.trim()]);
      setNewComment('');
    }
  };

  return (
    <div className="layout-wrapper">
      <Header />
      <div className="layout-content" style={{ margin: '2rem auto' }}>
        <div className="card" style={{ padding: '2rem' }}>
          {/* Layout principal: miniaturas a la izquierda, imagen grande a la derecha */}
          <div style={{ display: 'flex', flexDirection: 'row', gap: '2rem', alignItems: 'flex-start' }}>
            {/* Barra de miniaturas vertical */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center' }}>
              {INSTANCE_IDS.map((id, idx) => (
                <div
                  key={id}
                  onClick={() => setSelectedIdx(idx)}
                  style={{
                    border: idx === selectedIdx ? '2px solid #1976d2' : '1px solid #ccc',
                    borderRadius: 8,
                    padding: 2,
                    cursor: 'pointer',
                    background: idx === selectedIdx ? '#e3f2fd' : '#fff',
                    boxShadow: idx === selectedIdx ? '0 0 8px #90caf9' : 'none',
                    width: 60,
                    height: 60,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'border 0.2s, box-shadow 0.2s',
                  }}
                  title={`Imagen ${idx + 1}`}
                >
                  <img
                    src={`http://localhost:8042/instances/${id}/preview`}
                    alt={`Miniatura DICOM ${idx + 1}`}
                    style={{
                      width: 52,
                      height: 52,
                      objectFit: 'cover',
                      borderRadius: 6,
                      opacity: idx === selectedIdx ? 1 : 0.7,
                    }}
                    draggable={false}
                  />
                </div>
              ))}
            </div>
            {/* Contenedor de la imagen grande y controles */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl m-0">Visualización de Imagen</h2>
                <div className="flex items-center gap-2">
                  <a 
                    href={`http://localhost:8042/instances/${INSTANCE_ID}/preview`} 
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      label="Ver en Nueva Ventana"
                      icon="pi pi-external-link"
                      className="p-button-outlined"
                    />
                  </a>
                  <a 
                    href={`http://localhost:8042/instances/${INSTANCE_ID}/file`} 
                download="imagen.dcm"
              >
                <Button
                  label="Descargar DICOM"
                  icon="pi pi-download"
                  className="p-button-outlined"
                />
              </a>
            </div>
          </div>
          <div className="flex flex-row" style={{ gap: '2rem', alignItems: 'flex-start' }}>
            {/* Imagen DICOM */}
            <div style={{ flex: '3 1 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div
                ref={containerRef}
                style={{
                  border: '1px solid var(--surface-200)',
                  borderRadius: 'var(--border-radius)',
                  padding: '1rem',
                  backgroundColor: 'var(--surface-50)',
                  width: '100% ',
                  maxWidth: 600,
                  minHeight: 400,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  cursor: zoom > 1 ? (dragging ? 'grabbing' : 'grab') : 'default',
                  userSelect: 'none',
                }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              >
                <img
                  ref={imgRef}
                  src={`http://localhost:8042/instances/${INSTANCE_ID}/preview`}
                  alt="Imagen DICOM"
                  style={{
                    width: '100%',
                    height: 'auto',
                    filter: `brightness(${brightness}%) contrast(${contrast}%)`,
                    transition: dragging ? 'none' : 'all 0.2s',
                    transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
                    transformOrigin: 'center',
                    display: 'block',
                    cursor: zoom > 1 ? (dragging ? 'grabbing' : 'grab') : 'default',
                  }}
                  draggable={false}
                  onError={e => { (e.target as HTMLImageElement).src = '/no-image.png'; }}
                />
              </div>
              {/* Controles de zoom y filtros */}
              <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 12, width: '100%', maxWidth: 600 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Button icon="pi pi-search-minus" onClick={() => handleZoom(0.8)} className="p-button-sm" disabled={zoom <= 1} />
                  <Button icon="pi pi-search-plus" onClick={() => handleZoom(1.2)} className="p-button-sm" disabled={zoom >= 5} />
                  <Button 
                    icon="pi pi-angle-left" 
                    onClick={() => setSelectedIdx(selectedIdx - 1)} 
                    className="p-button-rounded p-button-text" 
                    disabled={selectedIdx === 0} 
                    aria-label="Imagen anterior"
                  />
                  <Button 
                    icon="pi pi-angle-right" 
                    onClick={() => setSelectedIdx(selectedIdx + 1)} 
                    className="p-button-rounded p-button-text" 
                    disabled={selectedIdx === INSTANCE_IDS.length - 1} 
                    aria-label="Imagen siguiente"
                  />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span>Brillo</span>
                  <Slider value={brightness} onChange={(e) => setBrightness(e.value as number)} min={50} max={200} style={{ width: 120 }} />
                  <span>{brightness}%</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span>Contraste</span>
                  <Slider value={contrast} onChange={(e) => setContrast(e.value as number)} min={50} max={200} style={{ width: 120 }} />
                  <span>{contrast}%</span>
                </div>
              </div>
            </div>
            {/* Panel lateral de información y comentarios */}
            <div style={{ flex: '2 1 0', minWidth: 320 }}>
              <div style={{ marginBottom: 24 }}>
                <h3 className="m-0">Características del Estudio</h3>
                <div style={{ margin: '1rem 0', fontSize: 16 }}>
                  <div><span style={{ color: 'var(--text-color-secondary)' }}>Tipo: </span>Resonancia Magnética (MR)</div>
                  <div><span style={{ color: 'var(--text-color-secondary)' }}>Paciente: </span>Juan Pérez</div>
                  <div><span style={{ color: 'var(--text-color-secondary)' }}>Edad: </span>42 años</div>
                  <div><span style={{ color: 'var(--text-color-secondary)' }}>Fecha: </span>2023-10-01</div>
                  <div><span style={{ color: 'var(--text-color-secondary)' }}>Descripción: </span>Estudio de cerebro</div>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <Button icon="pi pi-volume-up" label={isSpeaking ? "Reproducir de nuevo" : "Leer datos"} onClick={handleTalkback} className="p-button-text" />
                  <Button icon={window.speechSynthesis && window.speechSynthesis.paused ? "pi pi-play" : "pi pi-pause"} label={window.speechSynthesis && window.speechSynthesis.paused ? "Reanudar" : "Pausar"} onClick={handlePauseTalkback} className="p-button-text" disabled={!isSpeaking && !(window.speechSynthesis && window.speechSynthesis.paused)} />
                </div>
              </div>
              <div>
                <h3 className="m-0">Comentarios del Médico</h3>
                <div style={{ margin: '1rem 0', maxHeight: 120, overflowY: 'auto', background: '#f4f4f4', padding: 8, borderRadius: 8, border: '1px solid #ddd' }}>
                  {comments.length === 0 && <span style={{ color: '#888' }}>No hay comentarios aún.</span>}
                  {comments.map((c, i) => (
                    <div key={i} style={{ marginBottom: 8, paddingBottom: 6, borderBottom: '1px solid #eee' }}>
                      <span style={{ color: '#222' }}>{c}</span>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <InputTextarea
                    value={newComment}
                    onChange={e => setNewComment(e.target.value)}
                    rows={2}
                    autoResize
                    placeholder="Escribe un comentario..."
                    style={{ flex: 1 }}
                  />
                  <Button icon="pi pi-send" onClick={handleAddComment} disabled={!newComment.trim()} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      </div>
      <Footer />
    </div>
  );
};

export default VisualizadorSimple;

import React, { useRef, useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { Slider } from 'primereact/slider';
import Header from './Header';
import Footer from './Footer';

const INSTANCE_ID = 'efebc324-9433a127-dadb8db9-d63025b2-81de68ff';

const LOCAL_COMMENTS_KEY = `comments_${INSTANCE_ID}`;

const VisualizadorPrueba: React.FC = () => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [zoom, setZoom] = useState(1);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [comments, setComments] = useState<string[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);

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
    setZoom((prev) => Math.max(0.1, Math.min(prev * factor, 5)));
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
              <div style={{
                border: '1px solid var(--surface-200)',
                borderRadius: 'var(--border-radius)',
                padding: '1rem',
                backgroundColor: 'var(--surface-50)',
                width: '100%',
                maxWidth: 600,
                minHeight: 400,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <img
                  ref={imgRef}
                  src={`http://localhost:8042/instances/${INSTANCE_ID}/preview`}
                  alt="Imagen DICOM"
                  style={{
                    width: `${zoom * 100}%`,
                    maxWidth: '100%',
                    height: 'auto',
                    filter: `brightness(${brightness}%) contrast(${contrast}%)`,
                    transition: 'all 0.2s',
                  }}
                  onError={e => { (e.target as HTMLImageElement).src = '/no-image.png'; }}
                />
              </div>
              {/* Controles de zoom y filtros */}
              <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 12, width: '100%', maxWidth: 600 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Button icon="pi pi-search-minus" onClick={() => handleZoom(0.8)} className="p-button-sm" />
                  <span style={{ minWidth: 60 }}>Zoom: {Math.round(zoom * 100)}%</span>
                  <Button icon="pi pi-search-plus" onClick={() => handleZoom(1.25)} className="p-button-sm" />
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
      <Footer />
    </div>
  );
};

export default VisualizadorPrueba;

import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { Slider } from 'primereact/slider';

const fakeColleagues = [
  { name: 'Dra. Ana López', specialty: 'Radióloga', id: 1 },
  { name: 'Dr. Luis García', specialty: 'Cardiólogo', id: 2 },
  { name: 'Dra. Marta Ruiz', specialty: 'Neuróloga', id: 3 },
];

const fakeInbox = [
  { from: 'Dra. Ana López', subject: 'Consulta sobre paciente Juan', date: '2025-04-18', id: 1 },
  { from: 'Dr. Luis García', subject: 'Estudio compartido', date: '2025-04-17', id: 2 },
  { from: 'Dra. Marta Ruiz', subject: 'Revisión de imágenes', date: '2025-04-16', id: 3 },
];

export default function MedicoPage() {
  // Estado para "subir estudio"
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [comment, setComment] = React.useState('');
  const [zoom, setZoom] = React.useState(1);
  const [brightness, setBrightness] = React.useState(100);
  const [contrast, setContrast] = React.useState(100);

  return (
    <div className="layout-wrapper">
      <Header />
      <main className="layout-content main-section" style={{ display: 'flex', flexDirection: 'row', gap: '2.5rem', alignItems: 'flex-start', maxWidth: 1600, margin: '0 auto' }}>
        {/* Columna principal */}
        <div style={{ flex: 2.5, minWidth: 0 }}>
          <section className="content-section text-center">
            <h2 className="text-3xl">Panel del Médico</h2>
            <p className="text-secondary text-lg">
              Aquí los médicos pueden subir estudios, enviar comentarios, ver mensajes y comunicarse con colegas.
            </p>
          </section>
          {/* Sección de Subir Estudio y Comentarios */}
          <div className="card" style={{ padding: '2rem', margin: '2rem auto', maxWidth: 900 }}>
            <div className="flex flex-row" style={{ gap: '2rem', alignItems: 'flex-start' }}>
              {/* Subir Estudio */}
              <div style={{ flex: '3 1 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{
                  border: '1px solid var(--surface-200)',
                  borderRadius: 'var(--border-radius)',
                  padding: '1rem',
                  backgroundColor: 'var(--surface-50)',
                  width: '100%',
                  maxWidth: 600,
                  minHeight: 200,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <input
                    type="file"
                    accept=".dcm,image/*"
                    style={{ display: 'block', margin: '0 auto' }}
                    onChange={e => setSelectedFile(e.target.files ? e.target.files[0] : null)}
                    disabled
                  />
                </div>
                {/* Controles de zoom y filtros */}
                <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 12, width: '100%', maxWidth: 600 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Button icon="pi pi-search-minus" className="p-button-sm" disabled />
                    <span style={{ minWidth: 60 }}>Zoom: {Math.round(zoom * 100)}%</span>
                    <Button icon="pi pi-search-plus" className="p-button-sm" disabled />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span>Brillo</span>
                    <Slider value={brightness} min={50} max={200} style={{ width: 120 }} disabled />
                    <span>{brightness}%</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span>Contraste</span>
                    <Slider value={contrast} min={50} max={200} style={{ width: 120 }} disabled />
                    <span>{contrast}%</span>
                  </div>
                </div>
              </div>
              {/* Comentarios */}
              <div style={{ flex: '2 1 0', minWidth: 320 }}>
                <div style={{ marginBottom: 24 }}>
                  <h3 className="m-0">Enviar Comentarios al Paciente</h3>
                  <div style={{ margin: '1rem 0', maxHeight: 120, overflowY: 'auto', background: '#f4f4f4', padding: 8, borderRadius: 8, border: '1px solid #ddd' }}>
                    <span style={{ color: '#888' }}>Aquí aparecerán los comentarios enviados.</span>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <InputTextarea
                      value={comment}
                      onChange={e => setComment(e.target.value)}
                      rows={2}
                      autoResize
                      placeholder="Escribe un comentario para el paciente..."
                      style={{ flex: 1 }}
                    />
                    <Button icon="pi pi-send" disabled />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Barra lateral amplia: Colegas y Buzón */}
        <aside style={{ flex: 1.5, minWidth: 380, maxWidth: 480, display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Colegas */}
          <div className="card" style={{ padding: '2rem', width: '100%' }}>
            <h3 className="text-xl mb-4">Colegas</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {fakeColleagues.map(col => (
                <div key={col.id} className="card" style={{ minWidth: 200, padding: 12, display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                  <div style={{ fontWeight: 700, fontSize: 18 }}>{col.name}</div>
                  <div style={{ color: '#888', marginBottom: 12 }}>{col.specialty}</div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <Button icon="pi pi-envelope" label="Mensaje" className="p-button-sm" disabled />
                    <Button icon="pi pi-upload" label="Enviar Archivos" className="p-button-sm" disabled />
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Buzón de mensajes */}
          <div className="card" style={{ padding: '2rem', width: '100%' }}>
            <h3 className="text-xl mb-4">Buzón de Mensajes</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f4f4f4' }}>
                  <th style={{ textAlign: 'left', padding: 8, borderBottom: '1px solid #ddd' }}>De</th>
                  <th style={{ textAlign: 'left', padding: 8, borderBottom: '1px solid #ddd' }}>Asunto</th>
                  <th style={{ textAlign: 'left', padding: 8, borderBottom: '1px solid #ddd' }}>Fecha</th>
                  <th style={{ textAlign: 'left', padding: 8, borderBottom: '1px solid #ddd' }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {fakeInbox.length === 0 && (
                  <tr><td colSpan={4} style={{ color: '#888', textAlign: 'center', padding: 16 }}>No hay mensajes.</td></tr>
                )}
                {fakeInbox.map(msg => (
                  <tr key={msg.id}>
                    <td style={{ padding: 8, borderBottom: '1px solid #eee' }}>{msg.from}</td>
                    <td style={{ padding: 8, borderBottom: '1px solid #eee' }}>{msg.subject}</td>
                    <td style={{ padding: 8, borderBottom: '1px solid #eee' }}>{msg.date}</td>
                    <td style={{ padding: 8, borderBottom: '1px solid #eee' }}>
                      <Button icon="pi pi-eye" label="Ver" className="p-button-sm" disabled />
                      <Button icon="pi pi-reply" label="Responder" className="p-button-sm" disabled style={{ marginLeft: 8 }} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </aside>
      </main>
      <Footer />
    </div>
  );
}

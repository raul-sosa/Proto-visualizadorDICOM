import React, { useState } from 'react';
import Footer from './Footer';
import StudyList, { Study } from './StudyList';
import Header from './Header';

const studies: Study[] = [
  {
    PatientName: 'NAME^NONE - BRAIN',
    PatientID: 'NOID',
    PatientBirthDate: '?',
    PatientSex: 'M',
    StudyDate: 'Friday, June 28, 2002',
    AccessionNumber: '1',
    InstitutionName: 'UCI Medical Center',
    ReferringPhysicianName: '',
    StudyInstanceUID: '1.3.6.1.4.1.5962.99.1.3814087073.479799962.1489872804257.3.0',
    StudyID: '',
  },
  {
    PatientName: 'Unknown1^Unknown1 -',
    PatientID: '20250113111315328',
    PatientBirthDate: 'Tuesday, February 14, 1961',
    PatientSex: 'M',
    StudyDate: 'Sunday, January 20, 2019',
    AccessionNumber: '0250113111315115',
    InstitutionName: '',
    ReferringPhysicianName: 'Almanza Aranda^Dra. Dulce Judith',
    StudyInstanceUID: '1.2.840.113845.13.16085.743028493.2533787850131',
    StudyID: '0250113111316244',
  },
  {
    PatientName: 'Unknown1^Unknown1 -',
    PatientID: '20250113111728227',
    PatientBirthDate: 'Thursday, December 28, 1967',
    PatientSex: 'M',
    StudyDate: 'Thursday, September 15, 2022',
    AccessionNumber: '0250113111728013',
    InstitutionName: '',
    ReferringPhysicianName: '^A Quien Corresponda',
    StudyInstanceUID: '1.2.840.113845.13.16085.743028493.2536316797101',
    StudyID: '0250113111739865',
  },
  {
    PatientName: 'Unknown1^Unknown1 - MASTOGRAFIA',
    PatientID: '20250113125211152',
    PatientBirthDate: 'Monday, January 13, 2025',
    PatientSex: 'F',
    StudyDate: 'Saturday, May 30, 2065',
    AccessionNumber: '0250113125210932',
    InstitutionName: '',
    ReferringPhysicianName: 'Unknown^Unknown',
    StudyInstanceUID: '1.2.840.113845.13.36061.743028493.2593146950597',
    StudyID: '',
  },
  {
    PatientName: 'Unknown1^Unknown1 - MASTOGRAFIA',
    PatientID: '20250113130332700',
    PatientBirthDate: 'Monday, January 13, 2025',
    PatientSex: 'F',
    StudyDate: 'Saturday, October 7, 2079',
    AccessionNumber: '0250113130332483',
    InstitutionName: '20250113130332592',
    ReferringPhysicianName: 'Unknown^Unknown',
    StudyInstanceUID: '1.2.840.113845.13.36061.743028493.2599962371054',
    StudyID: '0250113130332916',
  },
];

const ohifExamples = [
  {
    label: 'CT Abdomen',
    StudyInstanceUID: '1.2.840.113619.2.55.3.604688437.781.1596625233.467',
  },
  {
    label: 'PET-CT',
    StudyInstanceUID: '1.2.276.0.7230010.3.1.4.8323329.2003.1.1',
  },
  {
    label: 'MR Knee',
    StudyInstanceUID: '1.3.6.1.4.1.14519.5.2.1.7009.9001.298806137288633453246975630178',
  },
  {
    label: 'US Fetal',
    StudyInstanceUID: '1.2.840.113619.2.55.3.2831164353.781.1596625233.467',
  },
];

const DEFAULT_INSTANCE_ID = studies[0].StudyInstanceUID;

const VisualizadorPrueba: React.FC = () => {
  const [selectedStudyUID, setSelectedStudyUID] = useState<string>(DEFAULT_INSTANCE_ID);
  const [advanced, setAdvanced] = useState(false);
  const [showExamples, setShowExamples] = useState(false);

  const ohifUrl = (studyUID: string) => {
    const servers = encodeURIComponent(JSON.stringify({
      dicomWeb: {
        name: "Orthanc Local",
        wadoUriRoot: "http://localhost:8042/wado",
        qidoRoot: "http://localhost:8042/dicom-web",
        wadoRoot: "http://localhost:8042/dicom-web",
        qidoSupportsIncludeField: true,
        imageRendering: "wadors",
        thumbnailRendering: "wadors"
      }
    }));
    return `http://localhost:3000/viewer?StudyInstanceUIDs=${studyUID}&servers=${servers}`;
  };

  const handleExampleClick = (exampleUID: string) => {
    window.open(ohifUrl(exampleUID), '_blank', 'noopener,noreferrer');
    setShowExamples(false);
  };

  return (
    <div className="layout-wrapper">
      <Header />
      <div className="layout-content" style={{ margin: '2rem auto', maxWidth: 1000 }}>
        <div className="card" style={{ padding: '2rem' }}>
          <h2 className="text-2xl m-0 mb-4">Lista de Estudios</h2>
          <StudyList
            studies={studies}
            onSelect={study => setSelectedStudyUID(study.StudyInstanceUID)}
            selectedStudyUID={selectedStudyUID}
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16, gap: 12 }}>
            <button onClick={() => setAdvanced(a => !a)} style={{ padding: '8px 20px', borderRadius: 6, border: '1px solid #0097a7', background: advanced ? '#0097a7' : '#fff', color: advanced ? '#fff' : '#0097a7', fontWeight: 700, cursor: 'pointer' }}>
              {advanced ? 'Visor Simple' : 'Visor Avanzado'}
            </button>
            <span>
              <button onClick={() => setShowExamples(e => !e)} style={{ padding: '8px 20px', borderRadius: 6, border: '1px solid #888', background: showExamples ? '#eee' : '#fff', color: '#333', fontWeight: 700, cursor: 'pointer' }}>
                Ejemplos
              </button>
              {showExamples && (
                <div style={{ position: 'absolute', background: '#fff', border: '1px solid #ccc', borderRadius: 6, marginTop: 8, zIndex: 1000, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                  {ohifExamples.map(example => (
                    <div key={example.StudyInstanceUID} style={{ padding: '8px 20px', cursor: 'pointer', whiteSpace: 'nowrap' }} onClick={() => handleExampleClick(example.StudyInstanceUID)}>
                      {example.label}
                    </div>
                  ))}
                </div>
              )}
            </span>
          </div>
          <h2 className="text-2xl m-0 mb-4">Previsualización</h2>
          {advanced && (
            <iframe
              src={ohifUrl(selectedStudyUID)}
              title="OHIF Viewer"
              width="100%"
              height="600"
              style={{ border: '1px solid #222', borderRadius: 8 }}
              allowFullScreen
            />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default VisualizadorPrueba;

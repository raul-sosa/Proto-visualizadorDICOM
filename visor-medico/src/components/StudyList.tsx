import React, { useState } from 'react';

export interface Study {
  PatientName: string;
  PatientID: string;
  PatientBirthDate: string;
  PatientSex: string;
  StudyDate: string;
  AccessionNumber: string;
  InstitutionName?: string;
  ReferringPhysicianName?: string;
  StudyInstanceUID: string;
  StudyID?: string;
}

interface StudyListProps {
  studies: Study[];
  onSelect: (study: Study) => void;
  selectedStudyUID?: string;
}

const StudyList: React.FC<StudyListProps> = ({ studies, onSelect, selectedStudyUID }) => {
  return (
    <div style={{ maxHeight: 300, overflowY: 'auto', border: '1px solid #ccc', borderRadius: 4, marginBottom: 16 }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Paciente</th>
            <th>Fecha</th>
            <th>Estudio</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {studies.map((study) => (
            <tr
              key={study.StudyInstanceUID}
              style={{ background: study.StudyInstanceUID === selectedStudyUID ? '#e0f7fa' : undefined }}
            >
              <td>{study.PatientName}</td>
              <td>{study.StudyDate}</td>
              <td>{study.StudyID || '-'}</td>
              <td>
                <button onClick={() => onSelect(study)}>
                  {study.StudyInstanceUID === selectedStudyUID ? 'Seleccionado' : 'Ver'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudyList;

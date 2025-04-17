import React, { useState } from 'react';
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from '../components/Footer';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="layout-wrapper">
      <Header />
      {/* Main Content */}
      <main className="layout-content main-section">
        {/* Welcome Section */}
        <section className="content-section text-center">
          <h2 className="text-3xl">
            Bienvenido al Sistema de Visualización Médica
          </h2>
          <p className="text-secondary text-lg">
            Acceda a nuestras herramientas especializadas para la visualización y análisis de imágenes DICOM.
          </p>
        </section>

        {/* Cards Section */}
        <div className="card-container">
          <Card className="card">
            <div className="text-center mb-4">
              <i className="pi pi-image" style={{ 
                fontSize: '2rem', 
                color: 'var(--primary-color)',
                backgroundColor: 'var(--primary-100)',
                padding: '1rem',
                borderRadius: '50%'
              }}></i>
              <h3>Visualizador DICOM Avanzado</h3>
              <p className="text-secondary">
                Herramienta profesional para la visualización y análisis detallado de imágenes médicas.
              </p>
              <Button
                label="Abrir Visualizador"
                icon="pi pi-arrow-right"
                className="p-button"
                onClick={() => navigate('/viewer')}
              />
            </div>
          </Card>

          <Card className="card">
            <div className="text-center mb-4">
              <i className="pi pi-search" style={{ 
                fontSize: '2rem', 
                color: 'var(--primary-color)',
                backgroundColor: 'var(--primary-100)',
                padding: '1rem',
                borderRadius: '50%'
              }}></i>
              <h3>Prueba de Visualización</h3>
              <p className="text-secondary">
                Acceso rápido a la vista de prueba de imágenes DICOM.
              </p>
              <Button
                label="Vista de Prueba"
                icon="pi pi-eye"
                className="p-button"
                onClick={() => navigate('/prueba')}
              />
            </div>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}

import DicomViewer from "../components/DicomViewer";
import Footer from '../components/Footer';

export default function ViewerPage() {
  return (
    <div className="p-6">
      <h1 className="text-xl mb-4">Visualizador DICOM</h1>
      <DicomViewer />
      <Footer />
    </div>
  );
}

import './App.css';
import BasicAccordion from './components/SoftwareChecklistAccordion/SoftwareChecklistAccordion';
import CalibrationAccordion from './components/CalibrationCheklist/Calibration';

function App() {
  return (
    <>
    <h1 className='title'>Crealite Ender 3 S1 Checklist</h1>
    <BasicAccordion />
    <CalibrationAccordion />
    </>
  );
}

export default App;

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Checkbox, FormControlLabel, Link, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { green } from '@mui/material/colors';

function CalibrationTask({ task, videoLinks, checked, onChange, taskName, description ,  children }) {

  const handleControlClick = (event) => {
    event.stopPropagation(); 
  };

  const handleCheckboxChange = (event) => {
    event.stopPropagation(); 

    onChange({ ...event, target: { ...event.target, name: taskName } });
  };

  const videoLinkElements = Array.isArray(videoLinks)
  ? videoLinks.map((linkObj, index) => (
    <Link
      key={index}
      href={linkObj.url}
      target="_blank"
      rel="noopener noreferrer"
      className="link-custom video-guide-link"
    >
      {linkObj.text}
    </Link>
    ))
  : videoLinks && (
      <Link href={videoLinks} target="_blank" rel="noopener noreferrer" className="video-guide-link">
        Watch Video Guide
      </Link>
    );

  return (
    <Accordion sx={{ backgroundColor: '#FFB7B7' ,borderRadius: '10px', marginBottom: '5px', fontSize: '0px'}}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{  color: '#333', textShadow: '0px 2px 4px rgba(0, 0, 0, 0.5)' }}>

        <FormControlLabel
          control={
            <Checkbox
              checked={checked}
              onChange={handleCheckboxChange} 
              onClick={handleControlClick} 
              name={taskName}
            />
          }
          label={<Typography sx={{ fontSize: '1.3rem' }}>{task}</Typography>} 
          onClick={handleControlClick} 
          className="accordion-label"
        />
      </AccordionSummary>
      <AccordionDetails className="accordion-details" >
      <Typography gutterBottom sx={{ fontSize: '1.4rem' }}>
          {description}
          {videoLinkElements}
        </Typography >

      </AccordionDetails>
      {children}
    </Accordion>
  );
}

export default function CalibrationAccordion() {
  const [calibrationStatus, setCalibrationStatus] = useState({
    bedLeveling: false,
    extruderCalibration: false,
    printTemperature: false,
    retractionSettings: false,
    pidTuning: false,
    flowCalibration: false,
  });
  

  const calibrationSteps = [
    {
      name: 'Bed Leveling',
      description: 'Perform manual or automatic bed leveling, following the guides specific to your printer model. Make sure the print bed is level and the nozzle height is adjusted correctly to the bed.',
      videoLink: 'https://www.youtube.com/watch?v=3VM5RK4nF94',
      taskName: 'bedLeveling'
    },
    {
      name: 'Extruder Calibration',
      description: '',
      videoLink: 'https://www.youtube.com/watch?v=VZScw30B4KA',
      taskName: 'extruderCalibration'
    },
    {
      name: 'Print Temperature',
      description: 'Find the optimal printing temperature for your filament type. Perform temperature tower tests to determine the best temperature settings.',
      videoLink: 'https://www.youtube.com/watch?v=5mp2vCZ2iFc',
      taskName: 'printTemperature'
    },
    {
      name: 'Retraction Settings',
      description: 'Adjust retraction speed and distance to reduce stringing and oozing during prints.',
      videoLinks: [ // Each item is now an object with url and text
        {
          url: 'https://www.youtube.com/watch?v=6LjbCIGCmd0',
          text: 'Retraction Speed Guide',
        },
        {
          url: 'https://k3d.tech/calibrations/retractions/rct.html?lang=en',
          text: 'Retraction Calibrator - Please use VPN',
        },
      ],
      taskName: 'retractionSettings'
    },
    {
      name: 'Flow calibration',
      description: 'Adjust the flow rate to ensure the correct amount of filament is extruded during prints.',
      videoLink: 'https://www.youtube.com/watch?v=HGO9k9d834w',
      taskName: 'flowCalibration'
    },
    {
      name: 'PID Tuning',
      description: 'Perform PID tuning to stabilize the temperature of your hotend and heated bed. This step is optional unless you are experiencing issues.',
      videoLink: 'https://www.youtube.com/watch?v=TNye13Xxb6U',
      taskName: 'pidTuning'
    }
  ];

  const handleChange = (event) => {
    console.log(calibrationStatus)
    const { name, checked } = event.target;
    
    if (name === "extruderCalibration" && areAllExtruderStepsCompleted()) {
      setCalibrationStatus({ ...calibrationStatus, [name]: true });
    } else {
      setCalibrationStatus({ ...calibrationStatus, [name]: checked });
    }
  };
  
  const allCompleted = Object.values(calibrationStatus).every(Boolean);
  const extruderCalibrationSteps = useMemo(() => [
    {
      name: 'preheatNozzle',
      label: 'Preheat the Nozzle',
      description: "Navigate to the 'Control' menu on your Ender 3 S1. Select 'Temperature' and then 'Nozzle.' Set the temperature to match the filament you are using (e.g., 200°C for PLA). Wait for the printer to reach the set temperature.",
      checked: calibrationStatus.preheatNozzle,
    },
    {
      name: 'unloadFilament',
      label: 'Unload Filament',
      description: "Make sure there's no filament in the extruder from previous prints. If there is, remove it according to the manufacturer's instructions.",
      checked: calibrationStatus.unloadFilament,
    },
    {
      name: 'markFilament',
      label: 'Mark the Filament',
      description: "Cut the end of the filament so it's straight. Measure 120mm from the end and mark it with a pen on the filament. This extra 20mm accounts for the filament that may not be extruded due to the 'priming' of the extruder when it starts.",
      checked: calibrationStatus.markFilament,
    },
    {
      name: 'loadFilament',
      label: 'Load Filament',
      description: "Insert the filament into the extruder until it reaches the hot end. Navigate to the 'Move' menu on the printer's control interface and select 'Extruder.' Make sure you're in relative mode if your printer has the option (it should default to this for movements).",
      checked: calibrationStatus.loadFilament,
    },
    {
      name: 'extrudeFilament',
      label: 'Extrude the Filament',
      description: "Choose to extrude 100mm of filament. On the Ender 3 S1, you might need to do this incrementally if the interface does not allow 100mm extrusions in one go (for instance, extrude 10mm at a time, ten times). Be patient and allow the extruder to finish extruding the set length without rushing it.",
      checked: calibrationStatus.extrudeFilament,
    },
    {
      name: 'measureExtrudedFilament',
      label: 'Measure the Extruded Filament',
      description: "After the extrusion, measure the distance from the extruder entry point to your mark. If you have less than 20mm of marked filament left, your printer is over-extruding. More than 20mm remaining means it is under-extruding.",
      checked: calibrationStatus.measureExtrudedFilament,
    },
    {
      name: 'calculateEStep',
      label: 'Calculate and Set New E-step Value',
      description: "Calculate the correct E-step value using the formula: New E-step Value = (Current E-step Value × Amount of Filament Commanded to Extrude) ÷ Actual Amount of Filament Extruded. Enter the new E-step value in the printer settings as described before, then save your changes.",
      checked: calibrationStatus.calculateEStep,
    },
    {
      name: 'verifyCalibration',
      label: 'Verify the Calibration',
      description: "Repeat the extrusion test with the new E-step value to verify that exactly 100mm of filament is extruded.",
      checked: calibrationStatus.verifyCalibration,
    },
  ], [calibrationStatus]);
  
  const areAllExtruderStepsCompleted = useCallback(() => {
    return extruderCalibrationSteps.every((step) => calibrationStatus[step.name]);
  }, [extruderCalibrationSteps, calibrationStatus]);
  
  useEffect(() => {
    const allExtruderStepsCompleted = areAllExtruderStepsCompleted();
    if (allExtruderStepsCompleted !== calibrationStatus.extruderCalibration) {
      setCalibrationStatus((prevState) => ({
        ...prevState,
        extruderCalibration: allExtruderStepsCompleted,
      }));
    }
  }, [calibrationStatus, areAllExtruderStepsCompleted]);

  const handleExtruderStepChange = (event, stepName) => {
    const updatedStepsState = {
      ...calibrationStatus,
      [stepName]: event.target.checked,
    };

    setCalibrationStatus(updatedStepsState);

    const allExtruderStepsCompleted = areAllExtruderStepsCompleted();

    setCalibrationStatus((prevState) => ({
      ...prevState,
      extruderCalibration: allExtruderStepsCompleted,
    }));
  };
  
  return (
    <Box sx={{ maxWidth: '1200px', margin: 'auto'}}>
      <Accordion sx={{ backgroundColor: '#FFDBAA' }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ justifyContent: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            {allCompleted && <CheckCircleIcon sx={{ color: green[500],  position: 'absolute', left: 280}} />}
            <Typography
              sx={{ fontSize: '2.25rem', flexGrow: 1, textAlign: 'center', textDecoration: allCompleted ? 'line-through' : 'none' }}>
              Calibration Checklist
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails sx={{ flexDirection: 'column' }}>
        {calibrationSteps.map((task) => {

  const videoLinksArray = Array.isArray(task.videoLinks)
    ? task.videoLinks
    : [{
        url: task.videoLink,
        text: 'Watch Video Guide',
      }];

  return (
    <CalibrationTask
      key={task.taskName}
      task={task.name}
      taskName={task.taskName}
      videoLinks={videoLinksArray}
      checked={calibrationStatus[task.taskName]}
      description={task.description}
      onChange={handleChange}
    >
      {task.taskName === 'extruderCalibration' && (
        <ExtruderCalibrationSubtasks
          steps={extruderCalibrationSteps}
          onChange={handleExtruderStepChange}
        />
      )}
    </CalibrationTask>
  );
})}
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}

function ExtruderCalibrationSubtasks({ steps, onChange }) {
  return (
    <Box sx={{ margin: '0px 15px' }}>
      {steps.map((step) => (
        <Box key={step.name}>
          <FormControlLabel
            control={
              <Checkbox checked={step.checked} onChange={(e) => onChange(e, step.name)} name={step.name} />
            }
            label={<Typography variant="body1">{step.label}</Typography>}
          />
          <Typography variant="body2" style={{ marginLeft: 32 }} >{step.description}</Typography>
        </Box>
      ))}
    </Box>
  );
}
import React, { useState, useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { green } from '@mui/material/colors';
import { Box, Link } from '@mui/material';

export default function SoftwareChecklistAccordion() {
  const [checked, setChecked] = useState({
    cura: false,
    autoOrientation: false,
    calibrationShapes: false,
    materialCostTools: false,
    printerSettings: false,
  });

  const checklistItems = [
    { name: 'cura', label: 'Install Cura', link: 'https://ultimaker.com/software/ultimaker-cura/' },
    { name: 'autoOrientation', label: 'Install Auto-orientation extension', link: 'https://marketplace.ultimaker.com/app/cura/plugins/nallath/OrientationPlugin' },
    { name: 'calibrationShapes', label: 'Install Calibration Shapes extension', link: 'https://marketplace.ultimaker.com/app/cura/plugins/5axes/CalibrationShapes' },
    { name: 'materialCostTools', label: 'Install Material Cost Tools extension', link: 'https://marketplace.ultimaker.com/app/cura/plugins/fieldofview/MaterialCostTools' },
    { name: 'printerSettings', label: 'Install Printer Settings extension', link: 'https://marketplace.ultimaker.com/app/cura/plugins/fieldofview/PrinterSettingsPlugin' },
  ];

  // State to control the completion status
  const [isComplete, setIsComplete] = useState(false);

  // Effect to determine if all checkboxes are checked
  useEffect(() => {
    setIsComplete(Object.values(checked).every(Boolean));
  }, [checked]);

  const handleCheck = (event) => {
    setChecked({
      ...checked,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <Box sx={{ maxWidth: '1200px', margin: '10px auto'}}>
      <Accordion sx={{ backgroundColor: '#FFDBAA', paddingLeft: '15px'}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'center' }}>
            {/* Only display the CheckCircleIcon when all items are complete */}
            {isComplete && (
              <CheckCircleIcon sx={{ fontSize: '2rem' ,color: green[500], position: 'absolute', left: 280 }} />
            )}
            <Typography
              sx={{
                fontSize: '2.4rem',
                textAlign: 'center',
                position: 'relative',
                width: '100%',
                textDecoration: isComplete ? 'line-through' : 'none',
              }}
            >
              Software Checklist
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
        <FormGroup>
          {checklistItems.map((item) => (
            <FormControlLabel
              key={item.name}
              sx={{ backgroundColor: '#FFB7B7', borderRadius: '10px', marginBottom: '8px', display: 'flex', alignItems: 'center' }}
              control={<Checkbox checked={checked[item.name]} onChange={handleCheck} name={item.name} />}
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {item.label}
                  <Link href={item.link} target="_blank" rel="noopener noreferrer" sx={{ ml: 1, color: '#141E46', textDecoration: 'none', fontSize: '30px'}}>
                    (LINK)
                  </Link>
                </Box>
              }
            />
          ))}
        </FormGroup>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}



// ExtruderCalibrationSubtasks.js

import React from 'react';
import { Checkbox, Typography, FormControlLabel, Box } from '@mui/material';

export function ExtruderCalibrationSubtasks({ steps, onChange }) {
  return (
    <Box>
      {steps.map((step) => (
        <Box key={step.name}>
          <FormControlLabel
            control={
              <Checkbox checked={step.checked} onChange={(e) => onChange(e, step.name)} name={step.name} />
            }
            label={<Typography  sx={{fontSize: '30px'}}>{step.label}</Typography>}
          />
          <Typography sx={{fontSize: '30px'}} style={{ marginLeft: 32, fontSize: '40px' }} className='text'>{step.description}</Typography>
        </Box>
      ))}
    </Box>
  );
}
'use client';

import styled from '@emotion/styled';
import { Slider } from '@mui/material';
import TextField from '@mui/material/TextField';

export const StyledTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: 'var(--color-primary)',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'var(--color-primary)',
  },
  '& .MuiOutlinedInput-root': {
    '&:hover fieldset': {
      borderColor: 'var(--color-secondary)',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'var(--color-primary)',
    },
  },
});

export const StyledSlider = styled(Slider)({
  color: 'var(--color-primary)',
  height: 3,
  padding: '13px 0',
  '& .MuiSlider-thumb': {
    backgroundColor: 'var(--color-primary)',
    border: '1px solid currentColor',
    '&:hover': {
      boxShadow: '0 0 0 8px rgba(0, 0, 0, 0.16)',
    },
  },
  '& .MuiSlider-track': {
    height: 3,
  },
});

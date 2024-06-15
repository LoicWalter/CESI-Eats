'use client';

import { Button } from '@mui/material';
import styled from '@emotion/styled';

export const StyledButton = styled(Button)({
  '&.MuiButton-root': {
    backgroundColor: 'var(--color-primary)',
    '&:hover': {
      backgroundColor: 'var(--color-secondary)',
    },
  },
});

export const StyledOutlinedButton = styled(Button)({
  '&.MuiButton-root': {
    backgroundColor: 'var(--color-white)',
    color: 'var(--color-primary)',
    border: '1px solid var(--color-primary)',
    '&:hover': {
      border: '1px solid var(--color-secondary)',
      color: 'var(--color-secondary)',
    },
  },
});

import styled from '@emotion/styled';
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

import { Theme } from '@mui/material';

export const TextFieldTheme = {
  MuiTextField: {
    styleOverrides: {
      root: ({ theme }: { theme: Theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1E2A3C' : '#fff',
        borderRadius: '8px',
        '&.custom-label-inline .MuiInputBase-root': {
          height: '48px',
          '.MuiInputBase-input': {
            position: 'relative',
            bottom: '-10px',
          },
        },
        '&.custom-label-outline .MuiInputBase-root': {
          height: '40px',
        },
        '&.custom-label-none .MuiInputBase-root': {
          height: '32px',
          '.MuiInputBase-input': {
            height: '100%',
          },
          '.MuiInputAdornment-root': {
            '.MuiSvgIcon-root': {
              fontSize: '1rem',
            },
          },
        },
        '.MuiInputAdornment-root': {
          '&.MuiInputAdornment-positionStart': {
            margin: '0 12px',
          },
          '&.MuiInputAdornment-positionEnd': {
            margin: '0 16px 0 12px',
          },
        },
        '& fieldset': {
          borderColor: 'transparent',
          borderRadius: '8px',
        },
        '&:hover fieldset': {
          borderColor: 'transparent',
        },
        '& .MuiInputLabel-root': {
          background: 'transparent',
          transform: 'translate(50px, 15px) scale(0.75)',
          '&.Mui-focused': {
            color: 'red',
            transform: 'translate(50px, 6px) scale(0.75)',
          },
          '&.MuiFormLabel-filled': {
            transform: 'translate(50px, 6px) scale(0.75)',
          },
        },
        '& legend': {
          background: 'transparent',
          display: 'none',
          visibility: 'hidden',
        },
        '& .MuiInputBase-root': {
          borderRadius: '8px',
          height: '100%',
          padding: 0,
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderWidth: '1px',
            borderColor:  theme.palette.mode === 'dark' ? '#efefef': '#000000'
          },
          '.MuiInputBase-input': {
            padding: 0,
            fontSize: '12px',
          },
          '.MuiOutlinedInput-notchedOutline': {
            top: 0,
            padding: 0,
            borderRadius: '8px',
          },
        },
        '& .MuiOutlinedInput-root.Mui-focused': {
          '.MuiOutlinedInput-notchedOutline': {
            border: '1px solid red',
          },
        },
        '& .MuiFormHelperText-root': {
          margin: '4px 0 0',
        },
      }),
    },
  },
};

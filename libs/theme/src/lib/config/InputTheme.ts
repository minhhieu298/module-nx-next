import { Theme } from '@mui/material';

export const InputTheme = {
  MuiInput: {
    styleOverrides: {
      root: ({ theme }: { theme: Theme }) => ({
        '& .MuiInput-input': {
          backgroundColor: theme.palette.mode === 'dark' ? '#fff' : '#d61212de', // Màu nền đỏ (theo config của bạn)
          padding: '8px 12px',
          borderRadius: 1,
          color: theme.palette.text.primary,
        },
        '&:hover': {
          '& .MuiInput-input': {
            backgroundColor: '#ff3333', // Hover effect
          },
        },
        '&.Mui-focused': {
          '& .MuiInput-input': {
            boxShadow:
              theme.palette.mode === 'dark'
                ? '0 0 5px #90caf9'
                : '0 0 5px #1976d2',
          },
        },
      }),
    },
  },
};

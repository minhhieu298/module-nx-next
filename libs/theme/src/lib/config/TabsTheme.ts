import { Theme } from '@mui/material';

export const TabsTheme = {
  MuiTabs: {
    styleOverrides: {
      root: ({ theme }: { theme: Theme }) => ({
        '&': {
          minHeight: '36px',
          color: '#efefef',
          background: '#000',
          '.MuiTabs-list': {
            '& .MuiButtonBase-root': {
              minHeight: '36px',
              padding: 0,
              lineHeight: '20px',
              position: 'relative',
              '&.Mui-selected::before': {
                content: '""',
                position: 'absolute',
                left: '-12px', // Đặt dấu chấm bên trái tab
                top: '50%',
                transform: 'translateY(-50%)',
                width: '8px', // Kích thước dấu chấm
                height: '8px',
                backgroundColor: '#ff0000', // Màu đỏ cho dấu chấm
                borderRadius: '50%', // Hình tròn
              },
            },
          },
        },
        '& .MuiTabs-indicator': {
          // backgroundColor: '#ff00ff', // Màu hồng
          // height: '4px',
          // width: '30px !important', // Chiều rộng nhỏ hơn
          // left: '10px !important', // Đặt vị trí từ mép trái
          // transform: 'none', // Tắt transform mặc định
        },
      }),
    },
  },
};

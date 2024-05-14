'use client';

import { createTheme } from '@mui/material/styles';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#27375a',
    },
    secondary: {
      main: '#BE185D',
    },
    error: {
      main: '#b71c1c',
    },
  },
  typography: {
    button: {
      textTransform: 'none',
    },
  },
});

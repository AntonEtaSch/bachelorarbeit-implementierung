'use client'
// theme.ts

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: '0.5rem',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#9CA3AF', // Tailwind: border-gray-400
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#374151', // Tailwind: border-gray-700
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#3B82F6', // Tailwind: blue-500
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#374151', // Tailwind: text-gray-700
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          height: '56px',
          borderRadius: '0.5rem',
          textTransform: 'none',
          padding: '0 1rem',
        },
        outlined: {
          border: '1px solid #9CA3AF',
          color: '#374151',
          '&:hover': {
            backgroundColor: '#f9fafb', 
            borderColor: '#374151', 
          },
        },
      },
      defaultProps: {
        variant: 'outlined',
      },
    }, 
  },
});

export default theme;

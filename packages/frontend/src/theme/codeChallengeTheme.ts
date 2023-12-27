import { createTheme } from '@mui/material'

export const codeChallengeTheme = createTheme({
  components: {
    MuiButton: {
      defaultProps: {
        sx: {
          padding: '1rem'
        },
        variant: 'contained'
      }
    },
    MuiTableHead: {
      defaultProps: {
        sx: {
          '.MuiTableCell-root': {
            fontWeight: 700
          }
        }
      }
    }
  },
  direction: 'ltr',
  palette: {
    primary: {
      light: '#FFE8F3',
      main: '#FF0080'
    },
    secondary: {
      main: '#8000FF'
    }
  },
  typography: {
    allVariants: {
      lineHeight: '1.5'
    },
    body1: {
      '@media (max-width: 575px)': {
        fontSize: '0.85rem'
      },
      fontSize: '1rem'
    },
    fontFamily: 'Helvetica, Arial, sans-serif',
    fontSize: 14,
    h1: {
      '@media (max-width: 575px)': {
        fontSize: '2.4rem'
      }
    },
    h2: {
      '@media (max-width: 575px)': {
        fontSize: '2.2rem'
      }
    },
    h3: {
      '@media (max-width: 575px)': {
        fontSize: '2rem'
      }
    },
    h4: {
      '@media (max-width: 575px)': {
        fontSize: '1.8rem'
      }
    },
    h5: {
      '@media (max-width: 575px)': {
        fontSize: '1.6rem'
      }
    },
    h6: {
      '@media (max-width: 575px)': {
        fontSize: '1.4rem',
      }
    }
  }
})

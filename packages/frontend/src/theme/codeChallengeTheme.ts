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
      main: '#FF0080'
    },
    secondary: {
      main: '#8000FF'
    }
  },
  typography: {
    fontFamily: 'Helvetica, Arial, sans-serif',
    fontSize: 14,
    allVariants: {
      lineHeight: '1.5'
    }
  }
})

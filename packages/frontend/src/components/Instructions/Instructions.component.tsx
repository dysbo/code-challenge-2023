import { Box, Typography } from '@mui/material'

export const Instructions = () => (
  <Box>
    <Typography component='p'>
      Enter a numeric value into the input box.
    </Typography>
    <Typography component='p'>
      Press <strong>Calculate</strong> to see it doubled, and its double squared!
    </Typography>
  </Box>
)

import { HeaderProps } from './Header.type'
import { Typography } from '@mui/material'

export const Header = ({ text }: HeaderProps) => (
  <Typography variant='h2' component='h1'>{text}</Typography>
)

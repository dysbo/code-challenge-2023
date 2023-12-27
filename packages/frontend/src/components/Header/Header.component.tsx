import { Typography } from '@mui/material'
import { HeaderProps } from './Header.type'

export const Header = ({ text }: HeaderProps) => (
  <Typography variant='h2' component='h1'>{text}</Typography>
)

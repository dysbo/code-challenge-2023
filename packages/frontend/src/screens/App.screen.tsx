import { Header, Input, Instructions, Result } from '../components'
import { Container, Divider } from '@mui/material'

export const App = () => (
  <Container data-testid="container-main">
    <Header text="Code Challenge!" />
    <Instructions />
    <Divider />
    <Input />
    <Result />
  </Container>
)

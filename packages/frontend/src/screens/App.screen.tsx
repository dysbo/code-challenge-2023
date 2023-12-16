import { Header, Input, Instructions } from '../components'
import { Container, Divider } from '@mui/material'
import { ResultSection } from '../components/ResultSection'

export const App = () => (
  <Container data-testid="container-main">
    <Header text="Code Challenge!" />
    <Instructions />
    <Divider />
    <Input />
    <ResultSection />
  </Container>
)

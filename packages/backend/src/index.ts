import express from 'express'

const app = express()
const port = 3001

app.get('/', (_, res) => {
  res.send('hi!')
})

app.listen(port, () => {
  console.log('listening on port', port)
})

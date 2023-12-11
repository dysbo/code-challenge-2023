import cors from 'cors'
import express from 'express'
import { logger } from './util/logger'
import { runMigrations, sequelize } from './db'
import { inputResolver } from './resolver/input.resolver'

const app = express()
const port = 3001

const log = logger({ name: 'server' })

app.use(cors())

app.post('/input/:input', inputResolver)

app.listen(port, async () => {
  await sequelize.authenticate()
  await runMigrations()
  log.info(`listening on port ${port}`)
})

import path from 'path'
import { Sequelize } from 'sequelize-typescript'
import { SequelizeStorage, Umzug } from 'umzug'
import { logger } from '../util/logger'

export const sequelize = new Sequelize('code-challenge', 'root', '!nsecur3', {
  dialect: 'mysql',
  host: 'localhost',
  models: [path.resolve(__dirname, 'models', '*.model.ts')],
  port: 3306,
  repositoryMode: true
})

export const runMigrations = async () => {
  const log = logger({ name: 'migrations' })
  const migrationsPath = '**/migrations/*.ts'
  log.info(`Running migrations from ${migrationsPath}`)
  const runner = new Umzug({
    context: sequelize.getQueryInterface(),
    logger: log,
    migrations: { glob: migrationsPath },
    storage: new SequelizeStorage({ sequelize })
  })

  try {
    await runner.up()
    log.info('Migrations completed with no errors!')
  } catch (e) {
    log.error(`Error occurred while running migrations: ${e}`)
  }
}

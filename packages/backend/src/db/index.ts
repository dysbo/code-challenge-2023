import { Sequelize } from 'sequelize-typescript'
import path from 'path'
import {SequelizeStorage, Umzug, UmzugOptions} from 'umzug'
import { logger } from '../util/logger'

export const sequelize = new Sequelize('code-challenge', 'root', '!nsecur3', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306,
  models: [path.resolve(__dirname, 'models', '*.model.ts')],
  repositoryMode: true
})

export const runMigrations = async () => {
  const log = logger({ name: 'migrations' });
  const migrationsPath = '**/migrations/*.ts';
  log.info(`Running migrations from ${migrationsPath}`)
  const runner = new Umzug({
    migrations: { glob: migrationsPath },
    context: sequelize.getQueryInterface(),
    storage: new SequelizeStorage({ sequelize }),
    logger: log
  })

  try {
    await runner.up()
    log.info('Migrations completed with no errors!')
  } catch (e) {
    log.error(`Error occurred while running migrations: ${e}`)
  }
}

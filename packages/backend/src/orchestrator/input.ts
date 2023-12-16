import NumericInput from '../db/models/NumericInput.model'
import { logger } from '../util/logger'
import { numericInputRepository } from '../db/repository'

const log = logger({ name: 'orchestrator/input' })

export const inputOrchestrator = async (input: number): Promise<NumericInput> => {
  // try to get the model for our input number
  const record = await numericInputRepository.findByPk(input)

  if (record) {
    log.info(`found record for ${input} in database! returning existing record`)
    return record
  }

  const inputTimesTwo = input * 2

  const newRecord = await numericInputRepository.create({ input, inputTimesTwo, inputTimesTwoSquared: inputTimesTwo * inputTimesTwo })
  log.info(`created new record for ${input} in database. returning new record`)
  return newRecord
}

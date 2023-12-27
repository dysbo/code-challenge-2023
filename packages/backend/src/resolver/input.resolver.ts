import { Request, Response } from 'express'
import { inputOrchestrator } from '../orchestrator'
import { logger } from '../util/logger'

const log = logger({ name: 'InputResolver' })

export const inputResolver = async (req: Request, res: Response) => {
  try {
    const input = parseFloat(req.params.input)

    const { input: result, inputTimesTwo, inputTimesTwoSquared } = await inputOrchestrator(input)

    res.status(200).json({
      input: result,
      inputTimesTwo,
      inputTimesTwoSquared
    })
  } catch (error) {
    log.error((error as Error).message)
    res.status(500).send('Unable to update database!')
  }
}

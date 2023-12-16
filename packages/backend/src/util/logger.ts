import pino, { LoggerOptions } from 'pino'

export const logger = (opts: { name: string } & Omit<LoggerOptions, 'name'>) => pino({
  ...opts,
  transport: {
    options: {
      colorize: true
    },
    target: 'pino-pretty'
  }
})

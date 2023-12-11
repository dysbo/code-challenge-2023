import pino, { LoggerOptions } from 'pino'

export const logger = (opts: { name: string } & Omit<LoggerOptions, 'name'>) => pino({
  ...opts,
  transport: { target: 'pino-pretty', options: { colorize: true } }
})

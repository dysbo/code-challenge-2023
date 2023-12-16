import { sequelize } from '../index'
import NumericInput from '../models/NumericInput.model'

export const numericInputRepository = sequelize.getRepository(NumericInput)

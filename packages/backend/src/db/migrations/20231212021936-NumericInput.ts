import { UmzugContext } from '../../types'

export const up = async ({ context: queryInterface }: UmzugContext) => {
  await queryInterface.createTable('numeric_input', {
    input: {
      primaryKey: true,
      type: 'float'
    },
    inputTimesTwo: {
      type: 'float'
    },
    inputTimesTwoSquared: {
      type: 'float'
    }
  })
}

export const down = async ({ context: queryInterface }: UmzugContext) => {
  await queryInterface.dropTable('numeric_input')
}

import { Column, Model, PrimaryKey, Table } from 'sequelize-typescript'

@Table({ createdAt: false, tableName: 'numeric_input', updatedAt: false })
class NumericInput extends Model {
  @PrimaryKey
  @Column
  input: number

  @Column
  inputTimesTwo: number

  @Column
  inputTimesTwoSquared: number
}

export default NumericInput

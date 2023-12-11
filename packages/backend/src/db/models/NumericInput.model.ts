import { Column, Model, PrimaryKey, Table } from 'sequelize-typescript'

@Table({ tableName: 'numeric_input', createdAt: false, updatedAt: false })
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

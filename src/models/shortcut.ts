import {Table, Column, PrimaryKey, Model, AutoIncrement, Index, DataType} from 'sequelize-typescript';

@Table
export default class Shortcut extends Model<Shortcut> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @Column(DataType.STRING)
  @Index
  guildId!: string | null;

  @Column
  authorId!: string;

  @Column
  @Index
  shortcut!: string;

  @Column
  command!: string;
}

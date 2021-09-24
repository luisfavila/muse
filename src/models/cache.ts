import {Table, Column, PrimaryKey, Model} from 'sequelize-typescript';
import sequelize from 'sequelize';

@Table
export default class Cache extends Model<Cache> {
  @PrimaryKey
  @Column
  key!: string;

  @Column(sequelize.BLOB('medium'))
  value!: string;

  @Column
  expiresAt!: Date;
}

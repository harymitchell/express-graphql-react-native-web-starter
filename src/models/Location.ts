import {Table, Column, Model, HasMany} from 'sequelize-typescript';

@Table
export class Location extends Model<Location> {
 
  @Column
  name: string;
 
}

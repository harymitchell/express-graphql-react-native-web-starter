import {Table, Column, Model, BelongsTo, ForeignKey, AllowNull} from 'sequelize-typescript';
import {Location} from './Location';

@Table
export class Unicorn extends Model<Unicorn> {

  @Column
  name: string;
  
  @AllowNull(true)
  @ForeignKey(() => Location)
  @Column
  locationId: number
 
  @BelongsTo(() => Location)
  location: Location
}
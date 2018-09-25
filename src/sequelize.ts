import {Sequelize} from 'sequelize-typescript';

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  operatorsAliases: Sequelize.Op as any,
  database: 'UnicornManager',
//   username: 'root',
//   password: '',
  storage: 'data.db',
  modelPaths: [__dirname + '/models']
});
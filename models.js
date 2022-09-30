import Sequelize from 'sequelize';
export const sequelize = new Sequelize({dialect: 'sqlite', storage: './db.sqlite', logging: false});

export const User = sequelize.define('User', {
  name: {
    type: Sequelize.STRING,
    unique: true,
  },
});

export default Sequelize;

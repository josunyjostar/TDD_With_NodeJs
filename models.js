import Sequelize from 'sequelize';
export const sequelize = new Sequelize({dialect: 'sqlite', storage: './db.sqlite'});

export const User = sequelize.define('user', {name: Sequelize.STRING});

export default Sequelize;

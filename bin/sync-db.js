import Sequelize, {User, sequelize} from '../models.js';

function dbSync() {
  return sequelize.sync({force: true});
}

export default dbSync;

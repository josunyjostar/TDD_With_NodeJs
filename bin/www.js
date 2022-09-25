import {app} from '../index.js';
import dbSync from './sync-db.js';

let temp = await dbSync();
console.log('database:::', temp);

const port = 3000;
app.listen(port, () => {
  console.log(`server starting ${port}`);
});

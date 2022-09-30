import {app} from '../index.js';
import dbSync from './sync-db.js';

await dbSync();

const port = 3000;
app.listen(port, () => {
  console.log(`server starting ${port}`);
});

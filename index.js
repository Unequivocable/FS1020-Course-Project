import express from 'express'
import routes from './src/routes.js'

const app = express();
const port = 3000;

app.use(express.json());
app.use('/', routes);

export default app.listen(port, function () {
  console.log(`Express server listening on port ${port}.`);
});

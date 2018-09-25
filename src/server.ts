
import express from 'express';
import graphqlHTTP from 'express-graphql';
import {sequelize} from './sequelize';

import schema from './schema/schema';

const app = express();

var cors = require('cors');

// use it before all route definitions
app.use(cors({origin: 'https://unicorn-manager-harymitchell.c9users.io:8081'}));

// bind express with graphql
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

// app.listen(8080, () => console.log('Example app listening on port 8080!'));

const port = process.env.PORT || 8080;

(async () => {
  await sequelize.sync({force: false});

  app.listen(
      port,
      () => console.info(`Server running on port ${port}`)
    );
})();
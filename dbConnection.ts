import knex from 'knex';
import * as AWS from 'aws-sdk';

const signer = new AWS.RDS.Signer();

export default knex({
  client: 'pg',
  connection: {
    ssl: 'Amazon RDS',
    host: process.env.POSTGRESQL_HOST,
    user: process.env.IAM_USERNAME,
    password: signer.getAuthToken({
      region: process.env.REGION,
      hostname: process.env.POSTGRESQL_HOST,
      port: parseInt(process.env.POSTGRESQL_PORT, 10),
      username: process.env.IAM_USERNAME
    }),
    database: process.env.DB_NAME
  }
});

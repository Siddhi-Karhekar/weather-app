// Lambda entrypoint using @vendia/serverless-express
const awsServerlessExpress = require('@vendia/serverless-express');
const app = require('./index'); // Express app

exports.handler = awsServerlessExpress.handler(app);

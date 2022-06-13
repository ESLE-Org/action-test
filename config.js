// @ts-check
require('dotenv').config();

const config = {
    endpoint: process.env.ENDPOINT,
    key: process.env.KEY,
    databaseId: "MonitoringToolDBCopy",
    partitionKey: { kind: "Hash", paths: ["/orgId"] }
  };
  
  module.exports = config;

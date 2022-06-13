// @ts-check
require('dotenv').config();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const config = {
    endpoint: process.env.ENDPOINT,
    key: process.env.KEY,
    databaseId: "Tasks",
    containerId: "Items",
    partitionKey: { kind: "Hash", paths: ["/category"] }
  };
  
  module.exports = config;

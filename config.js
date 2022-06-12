// @ts-check
require('dotenv').config();

const config = {
    endpoint: os.enivron['ENDPOINT'],
    key: os.environ['KEY'],
    databaseId: "Tasks",
    containerId: "Items",
    partitionKey: { kind: "Hash", paths: ["/category"] }
  };
  
  module.exports = config;

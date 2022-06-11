// @ts-check

const config = {
    endpoint: ENDPOINTKEY,
    key: KEY,
    databaseId: "Tasks",
    containerId: "Items",
    partitionKey: { kind: "Hash", paths: ["/category"] }
  };
  
  module.exports = config;

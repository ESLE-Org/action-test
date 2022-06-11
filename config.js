// @ts-check

const config = {
    endpoint: "https://javascriptexamplets.documents.azure.com:443/",
    key: "JoM7tkL0Kn6rU2x4Yw7z3XWIUqZ0FWiZeXxn4TVuA0xJNnNpDXnRq9FbCJ8W1orL0TnEwIW1UvkOANHCR7Ljxw==",
    databaseId: "Tasks",
    containerId: "Items",
    partitionKey: { kind: "Hash", paths: ["/category"] }
  };
  
  module.exports = config;
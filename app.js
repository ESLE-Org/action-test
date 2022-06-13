const core = require('@actions/core');
const github = require('@actions/github');
// @ts-check
//  <ImportConfiguration>
const CosmosClient = require("@azure/cosmos").CosmosClient;
const config = require("./config");
const dbContext = require("./data/databaseContext");
//  </ImportConfiguration>


const BasicRepoDetails = {
  createdAt: "2011-06-21T22:49:39Z",
  monitorStatus: 0,
  orgId: "MDEyOk9yZ2FuaXphdGlvbjYxNTQ3MjI=",
  repoName: "HealthVault-Mobile-iOS-Library",
  repoWatchStatus: 0,
  tag: "Not Specified",
  id: "MDEwOlJlcG9zaXRvcnkxOTMyMDgz"
};

const Languages = {
  name: "Objective-C",
  orgId: "MDEyOk9yZ2FuaXphdGlvbjYxNTQ3MjI=",
  testingTools: [],
  id: "MDg6TGFuZ3VhZ2UxNTY="
};

const Repositories = {
  description: "The HealthVault team has recently added the capability to write applications that will run on Mobile Devices and connect directly to the HealthVault Service. HealthVault iOS library enables developers to write iOS applications which interact with a user's personally controlled health record. The â€œgo liveâ€� process to deploy an application against the production HealthVault service can be found at http://msdn.microsoft.com/en-us/healthvault/bb962148. Information about the API that the HealthVault service exposes can be in the documentation in HealthVault .NET SDK.",
  dbUpdatedAt: "2022-06-11T18:18:55.161152200Z",
  languages: [
      {
          "name": "Objective-C",
          "id": "MDg6TGFuZ3VhZ2UxNTY=",
          "color": "#438eff"
      },
      {
          "name": "C",
          "id": "MDg6TGFuZ3VhZ2UxNDk=",
          "color": "#555555"
      }
  ],
  monitorStatus: 0,
  openPRs: [
      {
          "prNumber": 3,
          "prUrl": "https://github.com/microsoft/HealthVault-Mobile-iOS-Library/pull/3",
          "lastCommit": {
              "commitUrl": "https://github.com/microsoft/HealthVault-Mobile-iOS-Library/commit/ce8b99d46e34fe8ed517f8ec3efa8df793bfec4b",
              "oid": "ce8b99d46e34fe8ed517f8ec3efa8df793bfec4b",
              "status": {
                  "state": "SUCCESS",
                  "contexts": [
                      {
                          "context": "license/cla",
                          "state": "SUCCESS",
                          "targetUrl": null,
                          "description": "All CLA requirements met."
                      }
                  ]
              }
          }
      }
  ],
  orgId: "MDEyOk9yZ2FuaXphdGlvbjYxNTQ3MjI=",
  repoName: "HealthVault-Mobile-iOS-Library",
  repoUrl: "https://github.com/microsoft/HealthVault-Mobile-iOS-Library",
  updatedAt: "2021-12-07T16:39:05Z",
  id: "MDEwOlJlcG9zaXRvcnkxOTMyMDgz"
};

const Tags = {
  tag: "Not Specified",
  orgId: "MDEyOk9yZ2FuaXphdGlvbjYxNTQ3MjI=",
  id: "Not Specified"
};

async function main() {
  
  // <CreateClientObjectDatabaseContainer>
  const { endpoint, key, databaseId, containerId } = config;

  const client = new CosmosClient({ endpoint, key });

  const database = client.database(databaseId);
  const container = database.container(containerId);

  // Make sure Tasks database is already setup. If not, create it.
  await dbContext.create(client, databaseId, containerId);
  // </CreateClientObjectDatabaseContainer>
  
  try {
    
    // <CreateItem>
    /** Create new items
     * newitems are defined at the top of this file
     */
    await container.items.create(BasicRepoDetails);
    await container.items.create(Languages);
    await container.items.create(Repositories);
    await container.items.create(Tags);

    // </CreateItem>
    
    
  } catch (err) {
    console.log(err.message);
  }
}

main();

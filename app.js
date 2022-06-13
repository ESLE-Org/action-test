const core = require('@actions/core');
const github = require('@actions/github');

const CosmosClient = require("@azure/cosmos").CosmosClient;
const config = require("./config");

const dbContext = require("./data/databaseContext");

const basicRepoDetailsData = require("./data/basicRepoDetailsData");
const languagesData = require("./data/languagesData");
const repositoriesData = require("./data/repositoriesData ");
const tagsData = require("./data/tagsData");


async function main(){

  basicRepoDetailsProcess();
  languagesProcess();
  repositoriesProcess();
  tagsProcess();

}

async function itemManager(databaseId, newData){
  
  const { endpoint, key, containerId} = config;

  const client = new CosmosClient({ endpoint, key });

  const database = client.database(databaseId);
  const container = database.container(containerId);

  // Make sure Tasks database is already setup. If not, create it.
  await dbContext.create(client, databaseId, containerId);

  try {      

    await container.items.create(newData);

  } catch (err) {

    console.log(err.message);
  }
  
}

async function basicRepoDetailsProcess(){
  itemManager("BasicRepoDetails", basicRepoDetailsData);
}

async function languagesProcess(){
  itemManager("Languages", languagesData);
}

async function repositoriesProcess(){
  itemManager("Repositories", repositoriesData);
}

async function repositoriesProcess(){
  itemManager("Tasks", tagsData);
}


main();

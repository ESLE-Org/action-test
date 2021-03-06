const core = require('@actions/core');
const github = require('@actions/github');

const CosmosClient = require("@azure/cosmos").CosmosClient;
const config = require("./config");

const dbContext = require("./data/databaseContext");

const basicRepoDetailsData = require("./data/basicRepoDetailsData");
const languagesData = require("./data/languagesData");
const repositoriesData = require("./data/repositoriesData");
const tagsData = require("./data/tagsData");

// main function
async function main(){

  basicRepoDetailsProcess();
  languagesProcess();
  repositoriesProcess();
  tagsProcess();

}

async function itemManager(containerId, newData){
  
  const { endpoint, key, databaseId} = config;

  const client = new CosmosClient({ endpoint, key });

  const database = client.database(databaseId);
  const container = database.container(containerId);

  // Make sure Tasks database is already setup. If not, create it.
  await dbContext.create(client, databaseId, containerId);

  try {      

    // query to return all items
    const querySpec = {
      query: "SELECT * from c"
    };

    // read all items in the Items container
    const { resources: allItems } = await container.items
      .query(querySpec)
      .fetchAll();

    // check whether item exists
    const itemExists = allItems.some(item => ((item.id == newData.id) && (item.orgId == newData.orgId)));

    // if item does not exist, create an item
    if (!itemExists){
      await container.items.create(newData)
    }
    // if item exists, update the item data
    else{
      await container.item(newData.id, newData.orgId).replace(newData);
    }
    
    
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

async function tagsProcess(){
  itemManager("Tags", tagsData);
}


main();

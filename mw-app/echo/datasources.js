const { RESTDataSource } = require('apollo-datasource-rest');
const { CosmosClient } = require('@azure/cosmos');
const { v4: uuidv4  } =require('uuid');



class CosmosBackend extends RESTDataSource {
  constructor() {
    super();
    this.client = new CosmosClient(process.env.cosmos);
  }
  getNotesCollection(){
    
    return this.client.database("notesdb").container("notescontainer");
  }

  async getNotesByUserid({ userid }) {
    
    let results = await this.getNotesCollection()
        .items.query({
         query: 'SELECT * FROM c where c.userid="'+userid +'"',
        })
    .fetchAll();    
    

return results.resources.length >=1 ?results.resources:[];
  } 

  async updateNote({id,pk,text}){
    
    let {resource} = await this.getNotesCollection().item(id,pk).read();
    if(resource){
      resource.text=text;  
      await this.getNotesCollection().item(id,pk).replace(resource);
      return resource;
    }
    return null;
  }

  async newNote({userid,text}){
     let nNote={
         id: uuidv4(),
         userid: userid,
         text: text
     };
     let { resource: createdItem } = await this.getNotesCollection().items.create(nNote);
     return createdItem?createdItem:null;
  }
 
  
 
}
module.exports = CosmosBackend;
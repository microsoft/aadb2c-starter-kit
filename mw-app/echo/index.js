
const { ApolloServer, gql } = require('apollo-server-azure-functions');
const typeDefs = 
gql`
 type Note {
     id: ID
     uid: String
     text: String
 }
 type Query {
    hello: String
    getNotesByUser:[Note]
}
type Mutation {
    updateNote(id:ID,userid:String,text: String):Note
    newNote(userid:String,text: String): Note
}
`;
const CosmosBackend = require('./datasources');


const resolvers = {
  Query: {
    hello: () => 'Hello world!',
    getNotesByUser:(_,{},{uidReqParam,cosmosBackend})=>
        cosmosBackend.getNotesByUserid({userid:uidReqParam})
    
  },
  Mutation: {
    newNote: async (_, {text}, {uidReqParam,cosmosBackend}) => {
      return await cosmosBackend.newNote({userid:uidReqParam,text:text}); },
    updateNote: async(_,{id,text},{uidReqParam,cosmosBackend})=>{
        return await cosmosBackend.updateNote({id:id,pk:uidReqParam,text:text}); }
    }
  };

const server = new ApolloServer(
    
    { typeDefs, 
     //   dataSources: () => ({ cosmosBackend:new CosmosBackend()     }),
        resolvers,
        context: (req) => {
            return {
              uidReqParam: req.context.bindingData.uid,
              cosmosBackend:new CosmosBackend()
            }},
        introspection: false,
        playground: false, 
    });

exports.graphqlHandler = server.createHandler({
    cors: {
      origin: '*',
     allowedHeaders:['Content-Type', 'Authorization']
   },
  });

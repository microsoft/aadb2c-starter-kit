# What is this?
This is middle ware that sits in front of cosmos.  It's hsoted as an Azure Function and uses GrapQL.  [Apollo Server for Azure Functions=(https://github.com/apollographql/apollo-server/tree/main/packages/apollo-server-azure-functions).

# Quickstart

## Prereq
You need to setup a Cosmos Database.  It needs to have a database called "notesdb" and a collection called "notescollection" with a partionkey called "userid".

If you want to run local you must have [Azure Functions Core Tools](https://docs.microsoft.com/en-us/azure/azure-functions/functions-run-local?tabs=windows%2Ccsharp%2Cbash) installed.

## Running Local
1. Pull down the code
2. Run `npm install` to install dependenceies
3. Create a local.settings.json file with the following:
```
{
  "IsEncrypted": false,
  "Values": {
    "cosmos":"REPLACE",
    "FUNCTIONS_WORKER_RUNTIME": "node",
    "AzureWebJobsStorage": "UseDevelopmentStorage=true"
  },
  "Host": {
    "LocalHttpPort": 7071,
    "CORS": "*"
  }
}
```
4. Replace the value of cosmos with your Cosmos connection string
5. Run `func start`
6. Point your app to http:/localhost:7071/u

## Run on Azure
1. Deploy this code to a Linux Azure Function (it will work on Windows hosted functions but will perform slower)
2. Create an app setting called "cosmos" with teh connection string
3. Change your app to point to the function url

# Deep Dive

## Grapql
Is this your first time using GrapQL?  Let's walk through it.
Before we look through the code let's play with GrapQL.
### Let's start the GrapQL IDE and walk through it.
1. Open echo/index.js and look towards the bottom of the file.
2. Find and change these two values to tru:
```
    introspection: false,
    playground: false, 
```
3. Save the file
4. Run `func start`
5. Go to http://localhost:7071/u/myuser

This is the GrapQL IDE for Apollo called Playground.   
You can interactivley use tab + space to autocomplete build a query. Try it!
Here's a sample query you can copy/paste.
### Create a new note:
```
mutation{
  newNote(text:"my first note"){id uid text}
}
```
Note that the output shows the id of the document created 

#### Retreive all recrods
```
query{
    getNotesByUserid{id userid text}
}
```

#### Retrieve All notes v2
```
query{
    getNotesByUserid{id text}
}
```

#### Why is any of this important?
Let's say you're building a front end app and you want to create new notes.  On a traditional API you'd need to create an endpoint for creating new notes.
Now lets say you want to add functionality to create a new note where you specify the ID.  Well now you're going to need to create an additional ID.  
Now let's say we add a new field to the note- we either need to coordinate modification of the endpoints with teh frontend app or make a new end poin.


As we repeat this a few more cycles we have tens fo end points with different signatures. 


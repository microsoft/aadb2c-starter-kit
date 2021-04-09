# Let's Make an App with Login

## Scenario 
We are part of a startup that is going to offer encrypted shared documents on the web.
Our CEO has investores who want to see what we've got next week.  
We want to get an MVP on the web in a week!
Our MVP will allow users to store notes on the web- no sharing, no encryption.

# Final Architecture
1. React Front End served on Azure Blob Static Site
2. B2C for Identity and PII
3. APIM for authorization
4. Azure Functions App as middle ware API
5. Cosmos DB for PHI 

## MVP Requirements:
1. Self service- sign up, sign in, password requirements    
2. Users must agree to T&C
3. We must captre users' age, name, email, password
4. Descent UI (bootstrap is fine)
5. Support Live, and Google sign ups,
6. App requires sign in
7. App displays user name
8. App displays notes user has access to
9. App allows users to edit notes


## Components:
ADB2C - will handle all the identity stuff
storage account - will store static assets
App service - will run our SPA
Function - will act as an intermediary to cosmos
Cosmos - will store our notes

Ok enough of that- let's get started.

# Sprints
1. Setup Sign In, Sign Up (2 hours)
At the end of this sprint we'll enable self-service user registration and sign in
2. App (2 hour)
At the end of this sprint we'll have a front end that runs the sign in in a nice flow
3. APIs (2 hours)
At the end of this sprint we'll have a REST-ish API that CRUDs notes in Cosmos
4. Integrate App and API (1 hour)
At the end of this sprint our front end app will CRUD notes in cosmos!
5. Add T&C (2 hours)
At the end of this sprint our app users will also agree to t&c
6. UI/UX (2 hours)
At the end of this sprint our app will look good enough
7. Setup Live and Facebook
At the end of this sprint our users can use their Live and Facebook IDs to login

## Sprint 1 Setup Sign In, Sign Up
1. Create a B2C tenant
2. Create a user attribute for email, and dateofbirth
3. Create a sign in / sign up user flow
4. Run "test flow".

## Sprint 2 App (2 hour)
1. npm create-react-app
2. Create a notes component
3. npm install msal
4. create react app id in adb2c
5. setup sign in
6. Deploy to app service

## Sprint 3 APIs (2 hours)
1. Visual Studio Project
2. Create binding to cosmos
3. Create CRUD methods
4. Validate JWT
5. Deploy to Functions
6. Create APP ID for Function
7. Create scope 

## Sprint 4 Integrate App and API (1 hour)
1. Update app
2. Update CORS on functions
BOOM we have an MVP!

## Sprint 5 Add T&C (2 hours)
1. Create custom policy
2. Update app


What we haven't done:
our app really should validate jwt
## Contributing

This project welcomes contributions and suggestions.  Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.opensource.microsoft.com.

When you submit a pull request, a CLA bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., status check, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

## Trademarks

This project may contain trademarks or logos for projects, products, or services. Authorized use of Microsoft 
trademarks or logos is subject to and must follow 
[Microsoft's Trademark & Brand Guidelines](https://www.microsoft.com/en-us/legal/intellectualproperty/trademarks/usage/general).
Use of Microsoft trademarks or logos in modified versions of this project must not cause confusion or imply Microsoft sponsorship.
Any use of third-party trademarks or logos are subject to those third-party's policies.

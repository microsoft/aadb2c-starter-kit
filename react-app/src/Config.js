const prod = {
     apiurl: 'https://adb2cstarterkitmw.azurewebsites.net/api/u/',
     clientId: '0da90f62-a335-4338-a70a-3d73ea275926',
     authority: 'https://aadb2cstarterkit.b2clogin.com/tfp/aadb2cstarterkit.onmicrosoft.com/B2C_1_signup_signin/',

 }; 
 const dev = {
    apiurl: 'https://adb2cstarterkitmw.azurewebsites.net/api/u/', 
    //uncomment to run against local
    //apiurl: 'http://localhost:7071/api/u/',  
    clientId: prod.clientId,
    authority: prod.authority,
     
 }; 
 export const config = process.env.NODE_ENV === 'development' ? dev: prod;
import b2cauth from 'react-azure-adb2c';

b2cauth.initialize({
  instance: 'https://login.microsoftonline.com/440c033d-16fe-49a6-a4ab-de8b061d3b7f/', 
  tenant: 'ssdb2cdev',
  signInPolicy: 'B2C_1_signin_signup',
  applicationId: '05e48685-7c56-47a4-ad1e-3c7da3ae9587',
  cacheLocation: 'sessionStorage',
  scopes: ['https://ssdb2cdev.onmicrosoft.com/api/user_impersonation  '],
  redirectUri: 'http://localhost:3000',
  postLogoutRedirectUri: window.location.origin,
});
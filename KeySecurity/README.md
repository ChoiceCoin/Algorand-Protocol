# Algorand Key Security


Issue in [Algorand Forum](https://forum.algorand.org/t/mechanism-for-secure-keys-in-application/9880).

The key lines are 29 and 89, which use a private key.

# To Recreat MVP

Create a new react app.

```
npx create-react-app my-app
cd my-app
npm start
```

Copy and paste the ```App.js``` file.

# Problem

We am working on an application in the JS-SDK with React. The Application allows a user to take a certain action. When the user action results in a certain outcome, the application returns a reward to the user. The problem is that this requires me to include a private key in the application code for an address from which to return the reward to the user.

# Solution

We am exploring several solutions for this problem. The first solution I tried was to use a secure key variable for storage. However, during penetration testing, We discovered it was possible to read the private key.

Another solution We am considering is using a .env file, however it seems this may have a similar result as the first option because ultimately, the key needs to be sent to the application. Even if the key is encrypted and not visible in the ```App.js``` file or HTML, the key would likely be visible upon deeper inspection into the network files.

A third option is to use an on-chain application in TEAL. This would then require re-writing the application almost entirely and create a host of new security problems in creating mechanisms for the front end and backend integrations and communication networks.

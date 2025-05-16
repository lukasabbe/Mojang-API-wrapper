# Authentication

When authenticating an profile you will need the auth code. You get this by letting you user login to you service.

Here is an example with an Node JS Express server

Were you have set the redirect url in your Entra App to `http://localhost:3000/redirect`

This will print a login link in the console, were you can login to your app.

When you have logged in, the express server will print the auth code in the console.

::: code-group
```js
const express = require("express")
const app = express();

const client_id = "" //Client id from App page
const redirect_uri = "http://localhost:3000/redirect" //Same as you inputed on your website. In this case we use http://localhost:3000/redirect


app.get("/redirect", (req, res) => {
    console.log("Code: "+ req.query.code);
    auth(req.query.code);
});
app.listen(3000, () => {
    console.log("Login Url:")
    console.log(`https://login.microsoftonline.com/consumers/oauth2/v2.0/authorize?client_id=${client_id}&response_type=code&redirect_uri=${encodeURI(redirect_uri)}&response_mode=query&scope=${encodeURI("XboxLive.signin")}`)
})
```
```ts
import express from "express"
const app = express();

const client_id = "" //Client id from App page
const redirect_uri = "http://localhost:3000/redirect" //Same as you inputed on your website. In this case we use http://localhost:3000/redirect


app.get("/redirect", (req, res) => {
    console.log("Code: "+ req.query.code);
    auth(req.query.code);
});

app.listen(3000, () => {
    console.log("Login Url:")
    console.log(`https://login.microsoftonline.com/consumers/oauth2/v2.0/authorize?client_id=${client_id}&response_type=code&redirect_uri=${encodeURI(redirect_uri)}&response_mode=query&scope=${encodeURI("XboxLive.signin")}`)
})
```
:::

## Code Authentication

With the code, we can run the Authentication procces,


::: code-group
```js
const { MojangAuthProfile } = require("minecraft-api-wrapper");

const clientId = ""; //Your client Id for the app
const clientSecret = ""; //Your client secret for the app. You can also get this in Entra pannel 
const redirectUrl = "http://localhost:3000/redirect"; // Your redirect URL

function auth(code){
    const authProfile = new MojangAuthProfile(clientId, clientSecret, redirectUrl, code);
    const success = await authProfile.authenticate();
    if(!success) return;
    console.log(await authProfile.getName()) // Gets the name for the user that logged in. 
}
```
```ts
import { MojangAuthProfile } from "minecraft-api-wrapper";

const clientId = ""; //Your client Id for the app
const clientSecret = ""; //Your client secret for the app. You can also get this in Entra pannel 
const redirectUrl = "http://localhost:3000/redirect"; // Your redirect URL

function auth(code){
    const authProfile = new MojangAuthProfile(clientId, clientSecret, redirectUrl, code);
    const success = await authProfile.authenticate();
    if(!success) return;
    console.log(await authProfile.getName()) // Gets the name for the user that logged in. 
}
```
:::

When you are authenticated its recommended to keep the `mojangAccessToken`, that is saved under the `authProfile`. 

If you restart the program multiple times. This is the token for the user and it takes a while before it gets invaild. But the code is a one time use. 

You can use the token to create an `authProfile` like this: 

::: code-group
```js
const { MojangAuthProfile } = require("minecraft-api-wrapper");
const authToken = ""; // profiles auth token
const authProfile = new MojangAuthProfile(authToken);
```
```ts
import { MojangAuthProfile } from "minecraft-api-wrapper";
const authToken = ""; // profiles auth token
const authProfile = new MojangAuthProfile(authToken);
```
:::

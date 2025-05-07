# An Mojang API wrapper

This is an simple wrapper for Mojangs open API. Mojangs API is documented here [Mojang API](https://minecraft.wiki/w/Mojang_API)

Mojangs rate limit is 600 requests per 10 minutes. If you go over this all requests will just return null!

Not an official Minecraft API wrapper, I am not associated with Mojang or Microsoft.

# Installation

`npm install minecraft-api-wrapper`


# Usage

## Get UUID from username

```js
const { getProfileFromUsername } = require("minecraft-api-wrapper");

const profile = await getProfileFromUsername("jeb_");

console.log(profile.getUUID()); // 853c80ef3c3749fdaa49938b674adae6

//Or

getProfileFromUsername("jeb_").then(profile2 => {
    console.log(profile2.getUUID()); // 853c80ef3c3749fdaa49938b674adae6
})
```

## Get username from UUID

```js
const { getProfileFromUUID } = require("minecraft-api-wrapper");

const profile = await getProfileFromUUID("853c80ef3c3749fdaa49938b674adae6");

console.log(profile.getName()); // jeb_

//Or

getProfileFromUUID("853c80ef3c3749fdaa49938b674adae6").then(profile2 => {
    console.log(profile2.getName()); // jeb_
})
```

## Get multiple UUID:s from usernames

```js
const { getProfilesFromUsernames } = require("minecraft-api-wrapper");

const names = ["lukasabbe", "jeb_"]

const profiles = await getProfilesFromUsernames(names);

for(const profile of profiles){
    console.log(profile.getUUID())
}
// ["e3b8bc60326b45a1bbb86d728fbf70db", "853c80ef3c3749fdaa49938b674adae6"]
```

## Get skin data, like skin URL or cape URL

```js
const { getSkinData, getProfileFromUsername } = require("minecraft-api-wrapper");

//Uuid of the player you want the skin from
const skindata = await getSkinData("853c80ef3c3749fdaa49938b674adae6");
console.log(skindata.skinUrl) // http://textures.minecraft.net/texture/7fd9ba42a7c81eeea22f1524271ae85a8e045ce0af5a6ae16c6406ae917e68b5
console.log(skindata.capeUrl) // http://textures.minecraft.net/texture/9e507afc56359978a3eb3e32367042b853cddd0995d17d0da995662913fb00f7
console.log(skindata.model) // NORMAL

//OR

const profile = getProfileFromUsername("jeb_");
console.log(await profile.getSkinUrl()) // http://textures.minecraft.net/texture/7fd9ba42a7c81eeea22f1524271ae85a8e045ce0af5a6ae16c6406ae917e68b5
console.log(await profile.getCapeUrl()) // http://textures.minecraft.net/texture/9e507afc56359978a3eb3e32367042b853cddd0995d17d0da995662913fb00f7
console.log(await profile.getModel()) // CLASSIC

```

## Check if a server is banned
```js
const { checkIfServerBlocked } = require("minecraft-api-wrapper");

console.log(await checkIfServerBlocked("hypixel.net")) //false
```

# Mojang Authentication API

Before you begin using this API you need to get yourself an Azure Application so you can create an OAuth2 application.

**You need a basic understing of OAuth2 before you start!**

If you don't have one here is a guide on how you can make yourself an application OR you can follow [Microsofts guide](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app)

1. Create an free account on [Azure](https://azure.microsoft.com/en-us/pricing/purchase-options/azure-account?icid=azurefreeaccount&WT.mc_id=A261C142F)
2. After that head to https://entra.microsoft.com/
3. Under `Applications -> App registrations` on the left side
4. Click `New registration` and follow the instructions on the website
5. Under `Authentication` in your new application you can add an redirect link. I would use `localhost` for testing!

After this you need to be aproved by Mojang to be able to use there auth API. You can send in a request here -> https://aka.ms/mce-reviewappid

## After you have created an Entra Application

First you will need an way to let your user login. Here is a basic Express localhost example:

```js
const express = require("express")
const app = express();

const client_id = "" //Client id from App page
const redirect_uri = "http://localhost:3000/redirect" //Same as you inputed on your website. In this case we use http://localhost:3000/redirect


app.get("/redirect", (req, res) => {
    console.log("Code: "+ req.query.code);
});
app.listen(3000, () => {
    console.log("Login Url:")
    console.log(`https://login.microsoftonline.com/consumers/oauth2/v2.0/authorize?client_id=${client_id}&response_type=code&redirect_uri=${encodeURI(redirect_uri)}&response_mode=query&scope=${encodeURI("XboxLive.signin")}`)
})
```

If you login to the link that is sent in the console when you turn on the Express server an code will be printed in the console. Copy this code.

Now you can input the code into the wrapper. Make sure to use **environment variables** for secrets

```js

const { MojangAuthProfile } = require("minecraft-api-wrapper")

const clientId = ""; //Your client Id for the app
const clientSecret = ""; //Your client secret for the app. You can also get this in Entra pannel 
const redirectUrl = "http://localhost:3000/redirect"; // Your redirect URL
const code = ""; // The code that came from the user in the above express example

const authProfile = new MojangAuthProfile(clientId, clientSecret, redirectUrl, code);
const success = await authProfile.authenticate();
if(!success) return;

console.log(await authProfile.getName()) // Gets the name for the user that logged in. 
```
# An Mojang API wrapper

This is an simple wrapper for Mojangs open API. Mojangs API is documented here [Mojang API](https://minecraft.wiki/w/Mojang_API)

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
console.log(await profile.getModel()) // NORMAL

```

# Future

In the future i may implement mojangs authentication services too. 
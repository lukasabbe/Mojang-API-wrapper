# An Mojang API wrapper

This is an simple wrapper for Mojangs open API. Mojangs API is documented here [Mojang API](https://minecraft.wiki/w/Mojang_API)

Mojangs rate limit is 600 requests per 10 minutes. If you go over this all requests will just return null!

Not an official Minecraft API wrapper, I am not associated with Mojang or Microsoft.

Wrapper wiki is on its way, its in WIP right now [Wrapper docs](https://wrapperdocs.lukasabbe.com/)

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

# More information here [Docs](https://wrapperdocs.lukasabbe.com/)
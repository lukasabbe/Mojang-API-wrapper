# How to get profile

A profile in the wrapper is an representative of an Minecraft User.

When you get an profile you can get all information that is open from that user

## Get Profile from username

If you know that you only need to get one profile from an username use this.

Don't loop over `getProfileFromUsername` with names, use `getProfilesFromUsernames` if you need more than 2 profiles.

This is because Mojangs Rate limit, you can read more about it under about

::: code-group
```js [getProfileFromUsername.js]
const { getProfileFromUsername } = require("minecraft-api-wrapper");

const profile = await getProfileFromUsername("jeb_");

```
```ts [getProfileFromUsername.ts]
import { getProfileFromUsername } from "minecraft-api-wrapper";

const profile = await getProfileFromUsername("jeb_");
```
:::

## Get multiple profiles from usernames

This functions has no limits on it (If you don't exceed the rate limit).

If you have read the API docs they limit you to 10 names per request, but this function handles that and splits up the request into multiple ones.

::: code-group
```js [getProfiles.js]
const { getProfilesFromUsernames } = require("minecraft-api-wrapper");

const names = ["lukasabbe", "jeb_"]

const profiles = await getProfilesFromUsernames(names);


```

```ts [getProfile.ts]
import { getProfilesFromUsernames } from "minecraft-api-wrapper";

const names = ["lukasabbe", "jeb_"]

const profiles = await getProfilesFromUsernames(names);

```
:::


## Get profile from UUID
You can also get the profile from an users UUID. It needs to be trimed, aka without "-".

You can use UUID:s tools if you want to truncate the UUID if you want. 

::: code-group
```js [getProfileFromUUID.js]
const { getProfileFromUUID } = require("minecraft-api-wrapper");

const profile = await getProfileFromUUID("853c80ef3c3749fdaa49938b674adae6");
```
```ts [getProfileFromUUID.ts]
import { getProfileFromUUID } from "minecraft-api-wrapper";

const profile = await getProfileFromUUID("853c80ef3c3749fdaa49938b674adae6");
```

:::
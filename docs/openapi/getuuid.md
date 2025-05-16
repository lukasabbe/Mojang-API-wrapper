# Get UUID from username

## Get UUID from username
::: code-group
```js [getuuid.js]
const { getProfileFromUsername } = require("minecraft-api-wrapper");

const profile = await getProfileFromUsername("jeb_");

console.log(profile.getUUID()); // 853c80ef3c3749fdaa49938b674adae6

//Or

getProfileFromUsername("jeb_").then(profile2 => {
    console.log(profile2.getUUID()); // 853c80ef3c3749fdaa49938b674adae6
})
```
```ts [getUuid.ts]
import { getProfileFromUsername } from "minecraft-api-wrapper";

const profile = await getProfileFromUsername("jeb_");

console.log(profile.getUUID()); // 853c80ef3c3749fdaa49938b674adae6

//Or

getProfileFromUsername("jeb_").then(profile2 => {
    console.log(profile2.getUUID()); // 853c80ef3c3749fdaa49938b674adae6
})
```
:::

## Get multiple UUID:s from multiple usernames

::: code-group
```js [getUuids.js]
const { getProfilesFromUsernames } = require("minecraft-api-wrapper");

const names = ["lukasabbe", "jeb_"]

const profiles = await getProfilesFromUsernames(names);

for(const profile of profiles){
    console.log(profile.getUUID())
}
// ["e3b8bc60326b45a1bbb86d728fbf70db", "853c80ef3c3749fdaa49938b674adae6"]

// Or

getProfilesFromUsernames(names).then(profiles2 => {
    for(const profile of profiles2){
        console.log(profile.getUUID()) 
    } // ["e3b8bc60326b45a1bbb86d728fbf70db", "853c80ef3c3749fdaa49938b674adae6"]
}); 

```

```ts [getUuids.ts]
import { getProfilesFromUsernames } from "minecraft-api-wrapper";

const names = ["lukasabbe", "jeb_"]

const profiles = await getProfilesFromUsernames(names);

for(const profile of profiles){
    console.log(profile.getUUID())
}
// ["e3b8bc60326b45a1bbb86d728fbf70db", "853c80ef3c3749fdaa49938b674adae6"]

// Or

getProfilesFromUsernames(names).then(profiles2 => {
    for(const profile of profiles2){
        console.log(profile.getUUID()) 
    } // ["e3b8bc60326b45a1bbb86d728fbf70db", "853c80ef3c3749fdaa49938b674adae6"]
}); 

```
:::
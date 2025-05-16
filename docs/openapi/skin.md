# Skin functions

If you only want to get the skin from an UUID you can use these fucntions, only accepts UUID.

If you want to get skin from username, i recommend to get an Profile

## Get skin data from UUID

:::code-group
```js
const { getSkinData } = require("minecraft-api-wrapper");

//Uuid of the player you want the skin from
const skindata = await getSkinData("853c80ef3c3749fdaa49938b674adae6");
console.log(skindata.skinUrl)
console.log(skindata.capeUrl)
console.log(skindata.model)
```
```ts
import { getSkinData } from "minecraft-api-wrapper";

//Uuid of the player you want the skin from
const skindata = await getSkinData("853c80ef3c3749fdaa49938b674adae6");
console.log(skindata.skinUrl)
console.log(skindata.capeUrl)
console.log(skindata.model)
```
:::

# Banned servers

## Check if a server is banned

This will check if a server has gotten banned by Mojang or not.

There is not a good way to get list of all banned servers because they are hashed.

This scripted checks if the inputed server is banned

::: code-group
```js
const { checkIfServerBlocked } = require("minecraft-api-wrapper");

console.log(await checkIfServerBlocked("hypixel.net")) //false
```
```ts
import { checkIfServerBlocked } from "minecraft-api-wrapper";

console.log(await checkIfServerBlocked("hypixel.net")) //false
```
:::
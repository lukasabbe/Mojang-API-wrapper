# UUID tools

## Truncate UUID

::: code-group
```js
const { truncateUuid } = require("minecraft-api-wrapper");

console.log(truncateUuid("853c80ef-3c37-49fd-aa49-938b674adae6")) // 853c80ef3c3749fdaa49938b674adae6
```
```ts
import { truncateUuid } from "minecraft-api-wrapper";

console.log(truncateUuid("853c80ef-3c37-49fd-aa49-938b674adae6")) // 853c80ef3c3749fdaa49938b674adae6
```
:::

## Full UUID

::: code-group
```js
const { uuidToFullUuid } = require("minecraft-api-wrapper");

console.log(uuidToFullUuid("853c80ef3c3749fdaa49938b674adae6")) // 853c80ef-3c37-49fd-aa49-938b674adae6
```
```ts
import { uuidToFullUuid } from "minecraft-api-wrapper";

console.log(uuidToFullUuid("853c80ef3c3749fdaa49938b674adae6")) // 853c80ef-3c37-49fd-aa49-938b674adae6
```
:::
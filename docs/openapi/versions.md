# Versions

Get minecraft versions

# Get latest version

:::code-group
```js
const { getLatestVersion } = require("minecraft-api-wrapper");
const version = await getLatestVersion(); // latest release
const snapshotVersion = await getLatestVersion(true); // latest snapshot
```
```ts
import { getLatestVersion } from "minecraft-api-wrapper";
const version = await getLatestVersion(); // latest release
const snapshotVersion = await getLatestVersion(true); // latest snapshot
```
:::

# Get specifc version

:::code-group
```js
const { getVersion } = require("minecraft-api-wrapper");
const version = await getVersion("1.21.5");
```
```ts
import { getVersion } from "minecraft-api-wrapper";
const version = await getVersion("1.21.5");
```
:::

# Get all versions

:::code-group
```js
const { getAllVersions } = require("minecraft-api-wrapper");
const versions = await getAllVersions();
```
```ts
import { getAllVersions } from "minecraft-api-wrapper";
const versions = await getAllVersions();
```
:::


# Version object

All feilds on object
- id - Minecraft version, example 1.21.5
- type - If its a snapshot or release
- url - All information about the version, like all libs the version uses
- time - Last time version was updated
- releaseTime - The time the version was released
- sha1 - The hash for the version
- complianceLevel - If the version has safety features, 0 if don't have them, 1 if it has them
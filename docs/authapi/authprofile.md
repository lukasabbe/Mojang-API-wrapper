# Auth Profile Functions
Now when you have an authprofile, heres what you can do.

## Check if the microsoft account has Minecraft Copy
::: code-group
```js
authProfile.checkOwnership() // False or True
```
```ts
authProfile.checkOwnership() // False or True
```
:::

## Get profiles username

::: code-group
```js
authProfile.getName();
```
```ts
authProfile.getName();
```
:::

## Get profiles UUID

::: code-group
```js
authProfile.getUUID();
```
```ts
authProfile.getUUID();
```
:::

## Gets profiles skin

This will return the active skin, with the auth profiles we return an skin object

::: code-group
```js
const skin = authProfile.getActiveSkin();
console.log(skin.url); // The url for the skin
```
```ts
const skin = authProfile.getActiveSkin();
console.log(skin.url); // The url for the skin
```
:::

## Gets profiles Cape

This will return the activated Cape, if the cape is deactivated it will return `null`

::: code-group
```js
const cape = authProfile.getActiveCape();
console.log(cape.url) // Capes url
console.log(cape.alias) // Capes name
```
```ts
const cape = authProfile.getActiveCape();
console.log(cape.url) // Capes url
console.log(cape.alias) // Capes name
```
:::

## Get all skins or all capes
::: code-group
```js
const capes = authProfile.getCapes(); // List of all the users capes
const skins = authProfile.getSkins(); // List of all the users skins
```
```ts
const capes = authProfile.getCapes(); // List of all the users capes
const skins = authProfile.getSkins(); // List of all the users skins
```
:::

## Change skin
You can both upload an skin or set it from an url
Both need to be in PNG format

### URL version
::: code-group
```js
authProfile.changeSkin("http://example.com/skin.png", "classic")
```
```ts
authProfile.changeSkin("http://example.com/skin.png", "classic")
```
:::

### Buffer version
::: code-group
```js
const fs = require("fs");
const buffer = fs.readFileSync("./skin.png");
authprofile.changeSkin(buffer,"classic")
```
```ts
import fs from "fs";
const buffer = fs.readFileSync("./skin.png");
authprofile.changeSkin(buffer,"classic")
```
:::

## Reset skin
Removes current skin
::: code-group
```js
authProfile.resetSkin()
```
```ts
authProfile.resetSkin()
```
:::

## Activate Cape
Activates 
::: code-group
```js
authProfile.activateCape()
```
```ts
authProfile.activateCape()
```
:::

## Get profiles attributes

This returns [attributes](https://minecraft.wiki/w/Mojang_API#Query_player_attributes) in object form.

::: code-group
```js
const attributes = authProfile.getAttributes()
```
```ts
const attributes = authProfile.getAttributes()
```
:::



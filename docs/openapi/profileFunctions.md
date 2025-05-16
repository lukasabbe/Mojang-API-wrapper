# Profile functions

After you have your profile you can get all open information from the profile.

## Get UUID from profile

Get MC users UUID.

::: code-group
```js [getUuid.js]
profile.getUUID(); // Gets profiles uuid. Example 853c80ef3c3749fdaa49938b674adae6
profile.getFullUUID() // Gets profiles full uuid. Example 853c80ef-3c37-49fd-aa49-938b674adae6
```
```ts [getUuid.ts]
profile.getUUID(); // Gets profiles uuid. Example 853c80ef3c3749fdaa49938b674adae6
profile.getFullUUID() // Gets profiles full uuid. Example 853c80ef-3c37-49fd-aa49-938b674adae6
```
:::
## Get Username from profile

::: code-group
```js [getUsername.js]
profile.getName(); //Gets profiles username. Example jeb_
```
```ts [getUsername.ts]
profile.getName(); //Gets profiles username. Example jeb_
```
:::

## Get Skin and Cape from profile

You will need to await this functions.

This is because first time you run them the wrapper will need to make request to the skin route.

We don't do this when we get the profile because its a wasted request if you don't need the skin data.

If the user don't have an Cape it will return `null`

The model types are `CLASSIC` and `SLIM`

::: code-group
```js [getUsername.js]
await profile.getSkinUrl(); // Url link for the skin of the profile.
await profile.getCapeUrl(); // Url link for the cape that the user uses, if the user don't use a cape it will return null
await profile.getOptifineCapeUrl() //Url link for optifine cape the user uses, if the user don't have a optifine cape it will return null
await profile.getModel(); // The model type, either SLIM or CLASSIC
```
```ts [getUsername.ts]
await profile.getSkinUrl(); // Url link for the skin of the profile.
await profile.getCapeUrl(); // Url link for the cape that the user uses, if the user don't use a cape it will return null
await profile.getOptifineCapeUrl() //Url link for optifine cape the user uses, if the user don't have a optifine cape it will return null
await profile.getModel(); // The model type, either SLIM or CLASSIC
```
:::

## Profile to JSON
Get your profile in JSON format

::: code-group
```js [toJson.js]
profile.toJson(); // returns json string of profile
```
```ts [toJson.ts]
profile.toJson(); // returns json string of profile
```
:::

Returns: 
```json
{
    "uuid": "uuid",
    "fullUuid": "full uuid",
    "name": "username",
    "skinUrl": "Url for skin",
    "capeUrl": "Url for cape",
    "optifineCapeUrl": "Url for Optifine cape",
    "model": "Model for skin"
}
```
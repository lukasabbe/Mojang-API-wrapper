import fetch from "node-fetch"
import { MinecraftProfile } from "./Profile";
import { SkinData } from "./SkinData";

const MOJANG_API_URI = "https://api.mojang.com";

/**
 * Get Minecraft Profile from UUID.
 * @param UUID 
 * @returns {Promise<MinecraftProfile | null>}
 */
const getProfileFromUUID = async (UUID: string) : Promise<MinecraftProfile | null> => {
    const data = await fetch(`${MOJANG_API_URI}/minecraft/profile/lookup/${UUID}`);
    if(!data.ok) return null;
    const jsonData = await data.json();
    return new MinecraftProfile(UUID, jsonData.name);
}

/**
 * Get Minecraft Profile from username
 * @param username 
 * @returns {Promise<MinecraftProfile | null>}
 */
const getProfileFromUsername = async (username: string) : Promise<MinecraftProfile | null> => {
    const data = await fetch(`${MOJANG_API_URI}/users/profiles/minecraft/${username}`);
    if(!data.ok) return null;
    const jsonData = await data.json();
    return new MinecraftProfile(jsonData.id, username);
}

/**
 * Get multiple Minecraft profiles
 * 
 * * If you add more than 10 names it will need to request multiple times to mojangs servers
 * @param usernames List of usernames
 * @returns { Promise<Array<MinecraftProfile>> }
 */
const getProfilesFromUsernames = async (usernames: Array<string>) : Promise<Array<MinecraftProfile> | null> => {
    const splitedUsernames = [];

    let counter = 0;
    let tempArray = [] as string[];
    usernames.forEach(username => {
        if(counter == 10){
            splitedUsernames.push(tempArray);
            tempArray = [] as string[];
            counter = 0;
        }
        tempArray.push(username);
        counter++;
    });

    splitedUsernames.push(tempArray);

    const Profiles = []
    for(const users of splitedUsernames) {

        const data = await fetch(`${MOJANG_API_URI}/profiles/minecraft`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body : JSON.stringify(users)
        })
        if(!data.ok) return null;
        const jsonData = await data.json()
        for (const jsonProfile of jsonData){
            Profiles.push(new MinecraftProfile(jsonProfile.id, jsonProfile.name))
        }
    }

    return Profiles;
}

/**
 * Gets skin data from Minecraft UUID
 * @param UUID 
 * @returns { Promise<SkinData> }
 */
const getSkinData = async (UUID: string) : Promise<SkinData | null> => {
    const data = await fetch(`https://sessionserver.mojang.com/session/minecraft/profile/${UUID}`);
    if(!data.ok) return null;
    const jsonData = await data.json();
    return new SkinData(JSON.parse(atob(jsonData.properties[0].value)));
    
}


export { getProfileFromUUID, getProfileFromUsername, getProfilesFromUsernames, getSkinData }
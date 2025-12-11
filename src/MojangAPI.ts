import fetch from "node-fetch"
import { MinecraftProfile } from "./Profile";
import { SkinData } from "./SkinData";
import crypto from "crypto";


const MOJANG_API_URI = "https://api.mojang.com";

/**
 * Get Minecraft Profile from UUID.
 * @param UUID 
 * @returns {Promise<MinecraftProfile | null>}
 */
const getProfileFromUUID = async (UUID: string) : Promise<MinecraftProfile | null> => {

    if(UUID.length > 32){
        UUID = UUID.replace(/-/g, '');
    }

    const data = await fetch(`${MOJANG_API_URI}/minecraft/profile/lookup/${UUID}`);
    if(!data.ok) return null;
    const jsonData = await data.json() as any;
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
    const jsonData = await data.json() as any;
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
        const jsonData = await data.json() as any;
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
    const jsonData = await data.json() as any;
    return new SkinData(JSON.parse(atob(jsonData.properties[0].value)));
    
}


/**
 * Checks if the server is blocked by Mojang
 * @param serverIp - Server IP
 */
const checkIfServerBlocked = async (serverIp: string) : Promise<boolean> => {
    const data = await fetch(`https://sessionserver.mojang.com/blockedservers`);
    if(!data.ok) return false;
    const textData = await data.text();

    const lines = textData.split("\n");

    let shasum = crypto.createHash('sha1');

    shasum.update(serverIp);
    let hash = shasum.digest('hex');
    for(const line of lines){
        if(line == hash) return true;
    }

    serverIp = "*."+serverIp;

    while(serverIp.length > 0){
        shasum = crypto.createHash('sha1');
        shasum.update(serverIp);
        let hash = shasum.digest('hex');
        for(const line of lines){
            if(line == hash) return true;
        }
        serverIp = truncateIp(serverIp);
    }
    return false;
}

const truncateIp = (ip: string) : string => {
    const splitedIp = ip.split(".");
    if(splitedIp.length <= 2) return "";
    let tempIp = "*.";
    for(let i = 2; i < splitedIp.length; i++)
        if(i == splitedIp.length - 1)
            tempIp += splitedIp[i];
        else
            tempIp += splitedIp[i] + ".";
    return tempIp;
}


export { getProfileFromUUID, getProfileFromUsername, getProfilesFromUsernames, getSkinData, checkIfServerBlocked }
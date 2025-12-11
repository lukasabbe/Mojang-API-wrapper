import  fetch  from "node-fetch";

/**
 * Get the latest version of Minecraft.
 * @param snapshot - If true, get the latest snapshot version. If false, get the latest release version.
 */
export const getLatestVersion = async (snapshot = false) : Promise<Version | null>  =>{
    const data = await fetch("https://piston-meta.mojang.com/mc/game/version_manifest_v2.json");
    if (!data.ok) {
        return null;
    }
    const json = await data.json() as any;
    const latest = json.latest;
    if(snapshot){
        return json.versions.find((version: Version) => version.id == latest.snapshot) || null;
    }else{
        return json.versions.find((version: Version) => version.id == latest.release) || null;
    }
}

/**
 * Get a specific version of Minecraft.
 * @param version - The version to get.
 */
export const getVersion = async (version: string) : Promise<Version | null> => {
    const data = await fetch("https://piston-meta.mojang.com/mc/game/version_manifest_v2.json");
    if (!data.ok) {
        return null;
    }
    const json = await data.json() as any;
    return json.versions.find((v: Version) => v.id == version) || null;
}

/**
 * Get all versions of Minecraft.
 */
export const getAllVersions = async () : Promise<Version[] | null> => {
    const data = await fetch("https://piston-meta.mojang.com/mc/game/version_manifest_v2.json");
    if (!data.ok) {
        return null;
    }
    const json = await data.json() as any;
    return json.versions || null;
}

interface Version {
    id: string;
    type: string;
    url: string;
    time: string;
    releaseTime: string;
    sha1: string;
    complianceLevel: string;
}
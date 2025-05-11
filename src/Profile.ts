import { getSkinData } from "./MojangAPI";
import { getOptfineCapeUrl } from "./OptifineAPI";
import { SkinData } from "./SkinData";

export class MinecraftProfile {
    MinecraftUUID: string;
    MinecraftUsername: string;
    private MinecraftSkinData : SkinData | null;
    private OptifineCapeUrl: string | null;

    constructor(MinecraftUUID: string, MinecraftUsername: string){
        this.MinecraftUUID = MinecraftUUID;
        this.MinecraftUsername = MinecraftUsername;
        this.MinecraftSkinData = null;
        this.OptifineCapeUrl = "";
    }

    /**
     * Returns players UUID
     */
    getUUID() {
        return this.MinecraftUUID;
    }

    /**
     * Returns players UUID in a full format
     */
    getFullUUID(){
        return `${this.MinecraftUUID.slice(0,8)}-${this.MinecraftUUID.slice(8,12)}-${this.MinecraftUUID.slice(12,16)}-${this.MinecraftUUID.slice(16,20)}-${this.MinecraftUUID.slice(20)}`
    }
    /**
     * Returns players username
     */
    getName() {
        return this.MinecraftUsername
    }

    /**
     * Gets skin url for Minecraft profile
     * 
     * Returns null if the player don't have an skin
     */
    async getSkinUrl(){
        if(this.MinecraftSkinData == null) await this.getSkinData();
        return this.MinecraftSkinData!.skinUrl;
    }

    /**
     * Gets cape url for Minecraft profile
     * 
     * Returns null if the player don't have a cape
     */
    async getCapeUrl(){
        if(this.MinecraftSkinData == null) await this.getSkinData();
        return this.MinecraftSkinData!.capeUrl;
    }

    /**
     * Gets model type for Minecraft profile
     */
    async getModel(){
        if(this.MinecraftSkinData == null) await this.getSkinData();
        return this.MinecraftSkinData!.model;
    }

    /**
     * Gets Optifine cape url for Minecraft profile
     */
    async getOptifineCapeUrl(){
        if(this.OptifineCapeUrl == "") this.OptifineCapeUrl = await getOptfineCapeUrl(this.MinecraftUsername);
        return this.OptifineCapeUrl;
    }
    /**
     * Returns json representation of the profile
     */
    async toJson(){
        return JSON.stringify({
            uuid: this.getFullUUID(),
            fullUuid: this.getFullUUID(),
            name: this.getName(),
            skinUrl: await this.getSkinUrl(),
            capeUrl: await this.getCapeUrl(),
            optifineCapeUrl: await this.getOptifineCapeUrl(),
            model: await this.getModel()
        });
    }

    private async getSkinData(){
        this.MinecraftSkinData = await getSkinData(this.MinecraftUUID);
    }
}
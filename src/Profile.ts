import { getSkinData } from "./MojangAPI";
import { SkinData } from "./SkinData";

export class MinecraftProfile {
    MinecraftUUID: string;
    MinecraftUsername: string;
    private MinecraftSkinData : SkinData | null;

    constructor(MinecraftUUID: string, MinecraftUsername: string){
        this.MinecraftUUID = MinecraftUUID;
        this.MinecraftUsername = MinecraftUsername;
        this.MinecraftSkinData = null;
    }

    /**
     * Returns players UUID
     */
    getUUID() {
        return this.MinecraftUUID;
    }

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

    private async getSkinData(){
        this.MinecraftSkinData = await getSkinData(this.MinecraftUUID);
    }
}
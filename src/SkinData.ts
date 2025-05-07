export class SkinData {
    timestamp: number;
    UUID: string;
    username: string;
    skinUrl: string | null;
    capeUrl: string | null;
    model: "CLASSIC" | "SLIM";
    skinJsonData: SkinJsonData;

    constructor(skinJsonData: SkinJsonData){
        this.timestamp = skinJsonData.timestamp;
        this.UUID = skinJsonData.profileId;
        this.username = skinJsonData.profileName;

        this.skinJsonData = skinJsonData;
        
        this.capeUrl = (skinJsonData.textures.CAPE) ? skinJsonData.textures.CAPE.url : null;

        if(skinJsonData.textures.SKIN){
            this.skinUrl = skinJsonData.textures.SKIN.url;
            this.model = (skinJsonData.textures.SKIN.metadata) ? "SLIM" : "CLASSIC"
        } else {
            this.skinUrl = null;
            this.model = "CLASSIC";
        }
    }
}

interface SkinJsonData {
    timestamp: number;
    profileId: string;
    profileName: string;
    textures: {
        SKIN: {
            url: string;
            metadata: {
                model: string;
            }
        },
        CAPE: {
            url: string;
        }
    };
}

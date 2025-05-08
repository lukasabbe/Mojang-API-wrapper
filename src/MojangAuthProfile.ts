import fetch from "node-fetch";
import FormData from "form-data";

export class MojangAuthProfile {
    private clientId: string;
    private clientSecret: string;
    private redirectUrl: string;
    private authCode: string;

    mojangAccessToken = "";

    authenticated = false;

    
    private profile: Profile | null = null;
    private attributes: Attribute | null = null;
    private blockedUsers: string[] | null = null;

    constructor(mojangAccessToken: string);
    constructor(clientId: string, clientSecret: string, redirectUrl: string, authCode: string);
    constructor(
        mojangAccessTokenOrClientId: string,
        clientSecret?: string,
        redirectUrl?: string,
        authCode?: string
    ) {
        if (clientSecret && redirectUrl && authCode) {
            this.clientId = mojangAccessTokenOrClientId ?? "";
            this.clientSecret = clientSecret ?? "";
            this.redirectUrl = redirectUrl ?? "";
            this.authCode = authCode ?? "";
            this.mojangAccessToken = "";
        } else {
            this.clientId = "";
            this.clientSecret = "";
            this.redirectUrl = "";
            this.authCode = "";
            this.mojangAccessToken = mojangAccessTokenOrClientId ?? "";
            this.authenticated = true;
        }
    }

    async authenticate(): Promise<boolean> {
        const MicrosoftAccessToken = await this.authMicrosoft();
        if (MicrosoftAccessToken === "") {
            console.error("Failed to authenticate with Microsoft");
            return false;
        }
        const XboxLiveToken = await this.authXboxLive(MicrosoftAccessToken);
        if (XboxLiveToken === "") {
            console.error("Failed to authenticate with Xbox Live");
            return false;
        }
        const [XstsToken, uhs] = await this.authXboxLiveXsts(XboxLiveToken);
        if (XstsToken === "") {
            console.error("Failed to authenticate with Xbox Live XSTS");
            return false;
        }
        const mojangAccessToken = await this.authMojang(XstsToken, uhs);
        if (mojangAccessToken === "") {
            console.error("Failed to authenticate with Mojang");
            return false;
        }

        this.mojangAccessToken = mojangAccessToken;
        this.authenticated = true;

        return true;
    }
    private async authMicrosoft(): Promise<string> {
        const microsoftAuthUrl = "https://login.microsoftonline.com/consumers/oauth2/v2.0/token";
        const microsoftResponse = await fetch(microsoftAuthUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                client_id: this.clientId,
                scope: "XboxLive.signin",
                code: this.authCode,
                redirect_uri: this.redirectUrl,
                grant_type: "authorization_code",
                client_secret: this.clientSecret
            })
        });
        if(!microsoftResponse.ok) return "";
        const data = await microsoftResponse.json();
        return data.access_token;
    }
    private async authXboxLive(microsoftAccessToken: string): Promise<string> {
        const xboxLiveAuthUrl = "https://user.auth.xboxlive.com/user/authenticate";
        const xboxLiveResponse = await fetch(xboxLiveAuthUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({
                RelyingParty: "http://auth.xboxlive.com",
                TokenType: "JWT",
                Properties: {
                    AuthMethod: "RPS",
                    SiteName: "user.auth.xboxlive.com",
                    RpsTicket: "d="+microsoftAccessToken
                }
            })
        });
        if(!xboxLiveResponse.ok) return "";
        const data = await xboxLiveResponse.json();
        return data.Token;
    }
    private async authXboxLiveXsts(XboxLiveToken: string): Promise<[string, string]> {
        const xboxLiveXstsUrl = "https://xsts.auth.xboxlive.com/xsts/authorize";
        const xboxLiveXstsResponse = await fetch(xboxLiveXstsUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({
                RelyingParty: "rp://api.minecraftservices.com/",
                TokenType: "JWT",
                Properties: {
                    SandboxId: "RETAIL",
                    UserTokens: [XboxLiveToken]
                }
            })
        });
        if(!xboxLiveXstsResponse.ok) return ["",""];
        const data = await xboxLiveXstsResponse.json();
        return [data.Token, data.DisplayClaims.xui[0].uhs];
    }
    private async authMojang(XstsToken: string, uhs: string): Promise<string> {
        const mojangAuthUrl = "https://api.minecraftservices.com/authentication/login_with_xbox";
        const mojangResponse = await fetch(mojangAuthUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({
                identityToken: "XBL3.0 x=" + uhs + ";" + XstsToken,
            })
        });
        if(!mojangResponse.ok) return "";
        const data = await mojangResponse.json();
        this.mojangAccessToken = data.access_token;
        return this.mojangAccessToken;
    }
    private async fetchData(url: string, method: string = "GET", body: any = null): Promise<null | any> {
        if (!this.authenticated) {
            throw new Error("Not authenticated");
        }
        let fetchData = {};
        if(body){
            fetchData = {
                method: method,
                headers: {
                    "Authorization": "Bearer " + this.mojangAccessToken,
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            }
        }else{
            fetchData = {
                method: method,
                headers: {
                    "Authorization": "Bearer " + this.mojangAccessToken,
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            }

        }

        const response = await fetch(url, fetchData);
        if (!response.ok) return null;
        const data = await response.json();
        return data;
    }
    private async getProfileData(): Promise<void> {
        this.profile = await this.fetchData("https://api.minecraftservices.com/minecraft/profile");
    }
    async checkOwnership(): Promise<boolean> {
        const ownerShipData = await this.fetchData("https://api.minecraftservices.com/entitlements/license");
        if(!ownerShipData) return false;
        return ownerShipData.items.findIndex((item: any) => item.name === "product_minecraft" || item.name === "game_minecraft") !== -1;
    }
    /**
     * Gets name of authenticated user
     */
    async getName(): Promise<string> {
        if(!this.profile) await this.getProfileData();
        return this.profile!.name;
    }
    /**
     * Gets UUID of authenticated user
     */
    async getUUID(): Promise<string> {
        if(!this.profile) await this.getProfileData();
        return this.profile!.id;
    }
    /**
     * Gets skin data of authenticated user
     */
    async getActiveSkin(): Promise<Skin | null> {
        if(!this.profile) await this.getProfileData();
        const skins = this.profile!.skins;
        const activeSkin = skins.find(skin => skin.state === "ACTIVE");
        if (!activeSkin) {
            return null;
        }
        return activeSkin;
    }
    /**
     * Gets cape data of authenticated user
     */
    async getActiveCape(): Promise<Cape | null> {
        if(!this.profile) await this.getProfileData();
        const capes = this.profile!.capes;
        const activeCape = capes.find(cape => cape.state === "ACTIVE");
        if (!activeCape) {
            return null;
        }
        return activeCape;
    }
    /**
     * Gets all skins of authenticated user
     */
    async getSkins(): Promise<Skin[]> {
        if(!this.profile) await this.getProfileData();
        return this.profile!.skins;
    }
    /**
     * Gets all capes of authenticated user
     */
    async getCapes(): Promise<Cape[]> {
        if(!this.profile) await this.getProfileData();
        return this.profile!.capes;
    }
    /**
     * Gets all attributes of authenticated user
     * More info at https://minecraft.wiki/w/Mojang_API#Query_player_attributes
     */
    async getAttributes(): Promise<Attribute | null> {
        if(!this.attributes) {
            this.attributes = await this.fetchData("https://api.minecraftservices.com/player/attributes");
        }
        return this.attributes;
    }
    /**
     * Sets profanity filter for authenticated user.
     * Only effects realms
     */
    async setProfanityFilter(enabled: boolean): Promise<boolean> {
        return (await this.fetchData("https://api.minecraftservices.com/player/attributes", "POST", {
            profanityFilterPreferences: {
                profanityFilterOn: enabled
            }
        })) !== null;
    }
    /**
     * Gets all blocked users of authenticated user
     */
    async getBlockedUsers(): Promise<string[]> {
        if(!this.blockedUsers) {
            this.blockedUsers = (await this.fetchData("https://api.minecraftservices.com/privacy/blocklist")).blockedProfiles;
        }
        return this.blockedUsers!;
    }
    /**
     * Checks if the authenticated user can change their name
     */
    async canChangeName(): Promise<boolean> {
        const data = await this.fetchData("https://api.minecraftservices.com/minecraft/profile/namechange");
        return data.nameChangeAllowed;
    }
    /**
     * Last time user changed their name, if they have not changed it, it will return null
     */
    async lastNameChange(): Promise<string | null> {
        const data = await this.fetchData("https://api.minecraftservices.com/minecraft/profile/namechange");
        return data.changedAt ? data.changedAt : null;
    }
    /**
     * Checks if the name is available
     */
    async checkNameAvailability(name: string): Promise<"DUPLICATE" | "AVAILABLE" | "NOT_ALLOWED"> {
        const data = await this.fetchData(`https://api.minecraftservices.com/minecraft/profile/name/${name}/available`);
        return data.status;
    }
    /**
     * Changes the skin of the authenticated user with the given URL
     */
    async changeSkin(urlToSkin: string, model: "classic" | "slim"): Promise<boolean>;
    /**
     * Changes the skin of the authenticated user with the given file
     */
    async changeSkin(file: Buffer, model: "classic" | "slim"): Promise<boolean>;
    async changeSkin(fileOrUrl: Buffer | string, model: "classic" | "slim"): Promise<boolean> {

        if(typeof fileOrUrl === "string"){
            const data = await this.fetchData("https://api.minecraftservices.com/minecraft/profile/skins", "POST", {
                url: fileOrUrl,
                variant: model
            });
            return data !== null;
        }

        const formData = new FormData();
        formData.append("file", fileOrUrl, {
            filename: "skin.png",
            contentType: "image/png"
        });
        formData.append("variant", model);
        const data = await fetch("https://api.minecraftservices.com/minecraft/profile/skins", {
            method: "POST",
            headers: {
                "authorization": "Bearer " + this.mojangAccessToken,
                ...formData.getHeaders()
            },
            body: formData
        });
        if (!data.ok) {
            console.error("Failed to upload skin");
            return false;
        }
        return true;
    }

}

interface Profile {
    id: string;
    name: string;
    skins: Skin[];
    capes: Cape[];
}

interface Skin {
    id: string;
    state: string;
    url: string;
    model: "CLASSIC" | "SLIM";
}
interface Cape {
    id: string;
    state: string;
    url: string;
    alias: string;
}
interface Attribute {
    privileges: {
        onlineChat: {
            enabled: boolean;
        },
        multiplayerServer: {
            enabled: boolean;
        },
        multiplayerRealms: {
            enabled: boolean;
        },
        telemetry: {
            enabled: boolean;
        },
        optionalTelemetry: {
            enabled: boolean;
        },
    },
    profanityFilterPreferences: {
        profanityFilterOn: boolean;
    },
    banStatus: {
        bannedScopes: [
            {
                banId: string;
                expires: string;
                reason: string;
                reasonMessage: string;
            }
        ]
    }
}
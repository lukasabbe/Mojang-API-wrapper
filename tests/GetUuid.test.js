const { getProfileFromUsername, getProfilesFromUsernames } = require("../dist/index.js");

test("Input of jeb_ should get his uuid (853c80ef3c3749fdaa49938b674adae6)", async () => {
    const minecraftData = await getProfileFromUsername("jeb_");
    expect(minecraftData.getUUID()).toBe("853c80ef3c3749fdaa49938b674adae6")
    expect(minecraftData.getName()).toBe("jeb_")
})

test("Input scramble will be null", async () => {
    const minecraftData = await getProfileFromUsername("IJFOiahjfoiuahsfouhasofuhasoufhuaosufhaousuhfouahsf");
    expect(minecraftData).toBe(null);
})

test("Test multiple names", async () => {
    const names = ["lukasabbe", "jeb_"];
    const uuids = ["e3b8bc60326b45a1bbb86d728fbf70db", "853c80ef3c3749fdaa49938b674adae6"]
    const minecraftProfiles = await getProfilesFromUsernames(names);
    for(const profile of minecraftProfiles){
        expect(names.includes(profile.MinecraftUsername)).toBeTruthy()
        expect(uuids.includes(profile.MinecraftUUID)).toBeTruthy()
    }
})

test("test more then 10 names", async () => {
    const names = ["lukasabbe", "jeb_", "Dinnerbone", "Grumm", "slicedlime", "Volgar", "LadyAgnes", "slamp00", "Moesh", "Premster", "kingbdogz"];
    const uuids = [
        "e3b8bc60326b45a1bbb86d728fbf70db",
        "853c80ef3c3749fdaa49938b674adae6",
        "61699b2ed3274a019f1e0ea8c3f06bc6",
        "e6b5c088068044df9e1b9bf11792291b",
        "9c2ac9585de945a88ca14122eb4c0b9e",
        "be1fab1b23484bf9a8d527d94a35efa6",
        "6a085b2c19fb4986b453231aa942bbec",
        "0347bd5f4dfb4ad5a4333f4cd395b435",
        "f0fe3b509fee43e2a1656c4526ac6473",
        "9fa92aee61344c3b9a96e0bcda64573b",
        "13655ac1584d4785b227650308195121"
    ]
    const minecraftProfiles = await getProfilesFromUsernames(names);
    for(const profile of minecraftProfiles){
        expect(names.includes(profile.MinecraftUsername)).toBeTruthy()
        expect(uuids.includes(profile.MinecraftUUID)).toBeTruthy()
    }
});
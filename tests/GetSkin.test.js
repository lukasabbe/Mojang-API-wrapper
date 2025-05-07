const { getSkinData, getProfileFromUsername } = require("../dist");

test("Test skin getter", async () =>{
    const skindata = await getSkinData("853c80ef3c3749fdaa49938b674adae6");
    expect(skindata.skinUrl).toBe("http://textures.minecraft.net/texture/7fd9ba42a7c81eeea22f1524271ae85a8e045ce0af5a6ae16c6406ae917e68b5")
    expect(skindata.capeUrl).toBe("http://textures.minecraft.net/texture/9e507afc56359978a3eb3e32367042b853cddd0995d17d0da995662913fb00f7")
    expect(skindata.model).toBe("CLASSIC")
});

test("Test to get user and than get skin data", async () => {
    const profile = await getProfileFromUsername("jeb_");
    expect(await profile.getSkinUrl()).toBe("http://textures.minecraft.net/texture/7fd9ba42a7c81eeea22f1524271ae85a8e045ce0af5a6ae16c6406ae917e68b5")
    expect(await profile.getCapeUrl()).toBe("http://textures.minecraft.net/texture/9e507afc56359978a3eb3e32367042b853cddd0995d17d0da995662913fb00f7")
    expect(await profile.getModel()).toBe("CLASSIC")
})

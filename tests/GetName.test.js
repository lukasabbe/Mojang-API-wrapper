const { getProfileFromUUID } = require("../dist")

test("Get name from UUID", async () =>{
    const minecraftData = await getProfileFromUUID("853c80ef3c3749fdaa49938b674adae6");
    expect(minecraftData.getName()).toBe("jeb_");
    expect(minecraftData.getUUID()).toBe("853c80ef3c3749fdaa49938b674adae6");
})

test("Send in an none uuid", async () => {
    const minecraftData = await getProfileFromUUID("sohjs");
    expect(minecraftData).toBe(null);
})
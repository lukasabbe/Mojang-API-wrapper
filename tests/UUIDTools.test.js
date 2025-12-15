const { getProfileFromUsername, getProfileFromUUID } = require("../dist/index.js");

test("Input of Lemonixi should get hers uuid", async () => {
    const minecraftData = await getProfileFromUsername("Lemonixi");

    const fullUuid = minecraftData.getFullUUID();

    const uuidProfile = await getProfileFromUUID(fullUuid);

    expect(uuidProfile.getName()).toBe("Lemonixi");
    expect(uuidProfile.getFullUUID()).toBe(fullUuid);
    expect(uuidProfile.getUUID()).toBe(minecraftData.getUUID());
});
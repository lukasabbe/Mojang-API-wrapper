const { getVersion, getAllVersions, getLatestVersion } = require("../dist/index.js");

test("Input of 1.21.5 should get the correct version", async () => {
    const version = await getVersion("1.21.5");
    expect(version.id).toBe("1.21.5");
}
);

test("Get all versions should return an array of versions", async () => {
    const versions = await getAllVersions();
    expect(versions).toBeInstanceOf(Array);
    expect(versions.length).toBeGreaterThan(0);
}
);

test("Get latest version should return the latest version", async () => {
    const version = await getLatestVersion();
    expect(version).toBeInstanceOf(Object);
    expect(version.id).toBeDefined();
    expect(version.type).toBe("release");
}
);
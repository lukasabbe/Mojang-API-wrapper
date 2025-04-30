
const getOptfineCapeUrl = async (username: string): Promise<string | null> => {
    const data = await fetch(`http://s.optifine.net/capes/${username}.png`);
    if (!data.ok) return null;
    return `http://s.optifine.net/capes/${username}.png`;
}

export { getOptfineCapeUrl }
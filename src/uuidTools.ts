const uuidToFullUuid = (uuid: string): string => {
    const cleanUuid = uuid.replace(/-/g, "");

    const paddedUuid = cleanUuid.length === 31 ? "0" + cleanUuid : cleanUuid;
    if (paddedUuid.length !== 32) {
        throw new Error(`Invalid UUID length: ${paddedUuid.length}. Expected 32 (or 31 with missing zero).`);
    }

    return `${paddedUuid.slice(0, 8)}-${paddedUuid.slice(8, 12)}-${paddedUuid.slice(12, 16)}-${paddedUuid.slice(16, 20)}-${paddedUuid.slice(20)}`;
};
const truncateUuid = (uuid: string): string => {
    const cleanUuid = uuid.replace(/-/g, "");

    if (cleanUuid.length === 31) {
        return "0" + cleanUuid;
    }

    if (cleanUuid.length !== 32) {
        throw new Error(`Invalid UUID length after truncation: ${cleanUuid.length}.`);
    }

    return cleanUuid;
}

export { uuidToFullUuid, truncateUuid };
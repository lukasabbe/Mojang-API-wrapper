const uuidToFullUuid = (truncatedUuid: string): string => {
    const cleanUuid = truncatedUuid.trim();

    if (!/^[0-9a-fA-F]{32}$/.test(cleanUuid)) {
        throw new Error("Invalid truncated UUID. Expected 32 hexadecimal characters.");
    }

    return cleanUuid.replace(
        /^([0-9a-fA-F]{8})([0-9a-fA-F]{4})([0-9a-fA-F]{4})([0-9a-fA-F]{4})([0-9a-fA-F]{12})$/,
        "$1-$2-$3-$4-$5"
    );
};
const truncateUuid = (fullUuid: string): string => {
    const truncated = fullUuid.replace(/-/g, "");

    if (!/^[0-9a-fA-F]{32}$/.test(truncated)) {
        throw new Error("Invalid UUID format. Result was not 32 hexadecimal characters.");
    }

    return truncated;
}

export { uuidToFullUuid, truncateUuid };
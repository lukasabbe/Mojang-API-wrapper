const uuidToFullUuid = (uuid: string): string => {
    if (uuid.length !== 32) {
        throw new Error("UUID must be 32 characters long");
    }
    return `${uuid.slice(0, 8)}-${uuid.slice(8, 12)}-${uuid.slice(12, 16)}-${uuid.slice(16, 20)}-${uuid.slice(20)}`;
};

const truncateUuid = (uuid: string): string => {
    if (uuid.length !== 36) {
        throw new Error("UUID must be 36 characters long");
    }
    return uuid.replace(/-/g, "");
}

export { uuidToFullUuid, truncateUuid };
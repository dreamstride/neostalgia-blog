function generateAuthHeader(): Record<string, string> {
    return {
        "Authorization": `Bearer ${process.env.STRAPI_API_TOKEN}`
    }
}

export async function fetchCollection(resource: string, init?: RequestInit | undefined) {
    const pluralResource = resource + 's';
    const apiUrl = `${process.env.STRAPI_HOST}/api/${pluralResource}`;

    const defaultInit = {next: { tags: [resource]}, headers: generateAuthHeader()};
    const mergedInit = {...defaultInit, init}

    return fetch(apiUrl, mergedInit);
}
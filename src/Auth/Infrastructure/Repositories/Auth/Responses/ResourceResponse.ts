import ScopeResponse from './ScopeResponse';

interface ResourceResponse
{
    _id: string;
    attributes: Record<string, unknown>;
    owner: {
        id: string,
        name: string
    };
    name: string;
    displayName: string;
    type: string;
    icon_uri: string;
    scopes: ScopeResponse[],
    ownerManagedAccess: boolean;
    uris: string[]
}

export default ResourceResponse;

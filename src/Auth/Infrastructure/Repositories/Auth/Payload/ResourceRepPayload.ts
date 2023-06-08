import ScopeResponse from '../Responses/ScopeResponse';

interface ResourceRepPayload
{
    name: string;
    displayName?: string;
    type?: string;
    icon_uri?: string;
    scopes: ScopeResponse[];
    ownerManagedAccess: boolean;
    uris: string[];
    attributes?: Record<string, unknown>
}

export default ResourceRepPayload;

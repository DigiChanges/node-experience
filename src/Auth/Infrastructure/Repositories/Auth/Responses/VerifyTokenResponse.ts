
interface VerifyTokenResponse
{
    exp: number,
    iat: number,
    jti: string;
    iss: string;
    aud: string;
    sub: string;
    typ: string;
    azp: string;
    session_state: string;
    name: string;
    given_name: string;
    family_name: string;
    preferred_username: string;
    email: string;
    email_verified: boolean;
    acr: string,
    allowedorigins: string[];
    realm_access: Record<any, any>;
    resource_access: Record<any, any>;
    scope: string;
    sid: string;
    client_id: string;
    username: string;
    active: boolean;
}

export default VerifyTokenResponse;

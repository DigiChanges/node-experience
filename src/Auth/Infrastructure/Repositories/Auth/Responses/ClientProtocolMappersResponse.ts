interface ClientProtocolMappersResponse
{
    id: string;
    name: string;
    protocol: string;
    protocolMapper: string;
    consentRequired: boolean;
    config: {
        'user.session.note': string;
        'id.token.claim': boolean;
        'access.token.claim': boolean;
        'claim.name': string;
        'jsonType.label': string;
    }
}

export default ClientProtocolMappersResponse;

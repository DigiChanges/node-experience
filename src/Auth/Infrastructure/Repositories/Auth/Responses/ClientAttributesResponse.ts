interface ClientAttributesResponse
{
    'client.secret.creation.time': string;
    'oauth2.device.authorization.grant.enabled': boolean;
    'backchannel.logout.revoke.offline.tokens': boolean;
    'use.refresh.tokens': boolean;
    'oidc.ciba.grant.enabled': boolean;
    'backchannel.logout.session.required': boolean;
    'client_credentials.use_refresh_token': boolean;
    'acr.loa.map': string;
    'require.pushed.authorization.requests': boolean;
    'tls.client.certificate.bound.access.tokens': boolean;
    'display.on.consent.screen': boolean;
    'token.response.type.bearer.lower-case': boolean;
}

export default ClientAttributesResponse;

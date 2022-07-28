import IDecodeToken from '../../../Shared/InterfaceAdapters/IDecodeToken';

interface RefreshTokenPayload
{
    refreshToken: string;
    decodeToken: IDecodeToken;
}

export default RefreshTokenPayload;

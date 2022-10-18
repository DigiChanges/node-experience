import IDecodeToken from '../../Models/IDecodeToken';

interface RefreshTokenPayload
{
    refreshToken: string;
    decodeToken: IDecodeToken;
}

export default RefreshTokenPayload;

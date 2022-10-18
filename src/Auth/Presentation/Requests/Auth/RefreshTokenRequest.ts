import { IsString } from 'class-validator';
import RefreshTokenPayload from '../../../Domain/Payloads/Auth/RefreshTokenPayload';
import IDecodeToken from '../../../Domain/Models/IDecodeToken';

class RefreshTokenRequest implements RefreshTokenPayload
{
    private readonly _refreshToken: string;
    private readonly _decodeToken: IDecodeToken;

    constructor(data: Record<string, any>)
    {
        this._refreshToken = data.refreshToken;
        this._decodeToken = data.decodeToken;
    }

    @IsString()
    get refreshToken(): string
    {
        return this._refreshToken;
    }

    get decodeToken(): IDecodeToken
    {
        return this._decodeToken;
    }
}

export default RefreshTokenRequest;

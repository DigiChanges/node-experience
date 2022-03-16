import RefreshTokenPayload from '../../Domain/Payloads/RefreshTokenPayload';
import { IsString } from 'class-validator';

class RefreshTokenRequest implements RefreshTokenPayload
{
    private readonly _refreshToken: string;

    constructor(refreshToken: string)
    {
        this._refreshToken = refreshToken;
    }

    @IsString()
    get refreshToken(): string
    {
        return this._refreshToken;
    }
}

export default RefreshTokenRequest;

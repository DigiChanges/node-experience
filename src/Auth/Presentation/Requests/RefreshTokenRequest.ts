import RefreshTokenPayload from '../../Domain/Payloads/RefreshTokenPayload';
import { IsString } from 'class-validator';

class RefreshTokenRequest implements RefreshTokenPayload
{
    @IsString()
    refreshToken: string;

    constructor(refreshToken: string)
    {
        this.refreshToken = refreshToken;
    }

    getRefreshToken(): string
    {
        return this.refreshToken;
    }
}

export default RefreshTokenRequest;

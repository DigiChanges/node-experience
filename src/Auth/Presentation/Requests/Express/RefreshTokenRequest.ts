import RefreshTokenPayload from '../../../InterfaceAdapters/Payloads/RefreshTokenPayload';
import { IsEmail, IsString } from 'class-validator';

class RefreshTokenRequest implements RefreshTokenPayload
{
    @IsString()
    refreshToken: string;

    constructor(refreshToken: string)
    {
        console.log(refreshToken);
        this.refreshToken = refreshToken;
    }

    getRefreshToken(): string
    {
        return this.refreshToken;
    }
}

export default RefreshTokenRequest;

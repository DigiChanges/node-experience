import IUserDomain from '../Entities/IUserDomain';

interface ILoginResponse
{
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    refreshExpiresIn: number;
    user: IUserDomain;
}

export default ILoginResponse;

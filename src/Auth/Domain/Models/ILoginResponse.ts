
interface ILoginResponse
{
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    refreshExpiresIn: number;
}

export default ILoginResponse;

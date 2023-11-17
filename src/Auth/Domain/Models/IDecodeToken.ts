
interface IDecodeToken
{
    aud: string;
    exp: number;
    iat: number;
    iss: string;
    sub: string;
    email: string;
    role: string;
    aal: string;
    session_id: string;
}

export default IDecodeToken;

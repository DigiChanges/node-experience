interface ITokenDecode
{
    id: string;
    iss: string;
    aud: string;
    sub: string;
    iat: number;
    exp: number;
    user_id: string;
    email: string;
}

export default ITokenDecode;

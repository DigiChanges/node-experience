import IUserDomain from '../Entities/IUserDomain';

interface IToken
{
    getExpires(): number;
    getHash(): string;
    getRefreshHash(): string;
    getUser(): IUserDomain;
    getPayload(): any;
}

export default IToken;

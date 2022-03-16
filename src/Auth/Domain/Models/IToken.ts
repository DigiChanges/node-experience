import IUserDomain from '../../../User/Domain/Entities/IUserDomain';

interface IToken
{
    getExpires(): number;
    getHash(): string;
    getRefreshHash(): string;
    getUser(): IUserDomain;
    getPayload(): any;
}

export default IToken;

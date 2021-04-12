import IUserDomain from '../IDomain/IUserDomain';

interface IToken
{
    getExpires(): number;
    getHash(): string;
    getUser(): IUserDomain;
}

export default IToken;

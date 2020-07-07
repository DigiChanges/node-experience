
interface IToken
{
    getExpires(): number;
    getHash(): string;
    getUser(): any;
}

export default IToken;
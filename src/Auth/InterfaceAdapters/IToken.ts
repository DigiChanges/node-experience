import IUserDomain from '../../User/InterfaceAdapters/IUserDomain';

interface IToken
{
    get_expires(): number;
    get_hash(): string;
    get_user(): IUserDomain;
}

export default IToken;

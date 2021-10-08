import IBaseDomain from '../../App/InterfaceAdapters/IBaseDomain';

interface ITokenDomain extends IBaseDomain
{
    hash: string;
    expires: number;
    payload: any;
    black_listed: boolean;
}

export default ITokenDomain;

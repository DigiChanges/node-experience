import IBaseDomain from '../../../App/InterfaceAdapters/IBaseDomain';

interface ITokenDomain extends IBaseDomain
{
    hash: string;
    expires: number;
    payload: any;
    blackListed: boolean;
}

export default ITokenDomain;

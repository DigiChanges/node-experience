import IBaseDomain from '../../App/InterfaceAcapters/IBaseDomain';

interface ITokenDomain extends IBaseDomain
{
    hash: string;
    expires: number;
    payload: any;
    blackListed: boolean;
}

export default ITokenDomain;

import ITokenDomain from '../../InterfaceAdapters/ITokenDomain';
import Base from '../../../App/Domain/Entities/Base';

class Token extends Base implements ITokenDomain
{
    hash : string;
    expires: number;
    payload: any;
    black_listed: boolean;

    constructor()
    {
        super();
        this.hash = '';
        this.payload = {};
        this.expires = 0;
        this.black_listed = false;
    }
}

export default Token;

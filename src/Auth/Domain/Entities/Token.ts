import ITokenDomain from './ITokenDomain';
import Base from '../../../App/Domain/Entities/Base';

class Token extends Base implements ITokenDomain
{
    hash: string;
    expires: number;
    payload: any;
    blackListed: boolean;

    constructor()
    {
        super();
        this.hash = '';
        this.payload = {};
        this.expires = 0;
        this.blackListed = false;
    }
}

export default Token;

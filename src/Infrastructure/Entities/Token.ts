import ITokenDomain from "../../InterfaceAdapters/IInfrastructure/ITokenDomain";

class Token implements ITokenDomain
{
    _id: string;
    hash : string;
    expires: number;
    payload: any;
    blackListed: boolean;
    createdAt: Date;
    updatedAt: Date;

    constructor()
    {
        this.hash = '';
        this.payload = {};
        this.expires = 0;
        this.blackListed = false;
    }

    getId(): string
    {
        return this._id;
    }

    setId(id: string): void
    {
        this._id = id;
    }

}

export default Token;
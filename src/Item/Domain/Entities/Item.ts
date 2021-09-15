import IUserDomain from '../../../User/InterfaceAdapters/IUserDomain';

class Item
{
    private _id: string
    private name: string;
    private type: number;
    private createdBy: IUserDomain;
    private lastModifiedBy: IUserDomain;

    private createdAt: Date;
    private updatedAt: Date;

    public get Id(): string | any
    {
        return this._id;
    }

    public set Id(value: string)
    {
        this._id = value;
    }

    public get Name(): string
    {
        return this.name;
    }

    public set Name(value: string)
    {
        this.name = value;
    }

    public get Type(): number
    {
        return this.type;
    }

    public set Type(value: number)
    {
        this.type = value;
    }

    public get CreatedBy(): IUserDomain
    {
        return this.createdBy;
    }

    public set CreatedBy(value: IUserDomain)
    {
        this.createdBy = value;
        this.lastModifiedBy = value;
    }

    public get LastModifiedBy(): IUserDomain
    {
        return this.lastModifiedBy;
    }

    public set LastModifiedBy(value: IUserDomain)
    {
        this.lastModifiedBy = value;
    }

    public get CreatedAt(): Date
    {
        return this.createdAt;
    }

    public set CreatedAt(value: Date)
    {
        this.createdAt = value;
    }

    public get UpdatedAt(): Date
    {
        return this.updatedAt;
    }

    public set UpdatedAt(value: Date)
    {
        this.updatedAt = value;
    }
}

export default Item;

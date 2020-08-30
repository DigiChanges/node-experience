// import { ObjectID } from "mongodb";

interface IItemDomain
{
    name: string;
    type: number;
    createdAt: Date;
    updatedAt: Date;

    getId(): string;
}

export default IItemDomain;

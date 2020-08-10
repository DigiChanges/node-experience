import { ObjectID } from "mongodb";

interface IItemDomain
{
    name: string;
    type: number;
    createdAt: Date;
    updatedAt: Date;

    getId(): ObjectID;
}

export default IItemDomain;

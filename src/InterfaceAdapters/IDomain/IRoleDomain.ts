import {ObjectID} from "mongodb";

interface IRoleDomain
{
    name: string;
    slug: string;
    enable: boolean;
    permissions: string[];
    createdAt: Date;
    updatedAt: Date;

    getId(): ObjectID;
}

export default IRoleDomain;

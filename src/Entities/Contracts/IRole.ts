
interface IRole
{
    _id: any;
    name: string;
    slug: string;
    enable: boolean;
    permissions: string[];
    createdAt: Date;
    updatedAt: Date;
}

export default IRole;

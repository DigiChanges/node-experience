
interface IRoleDomain
{
    name: string;
    slug: string;
    enable: boolean;
    permissions: string[];
    createdAt: Date;
    updatedAt: Date;

    getId(): string;
}

export default IRoleDomain;

interface IRoleTransformer
{
    id: string;
    name: string;
    slug: string;
    permissions?: string[];
    enable: boolean;
    createdAt: number;
    updatedAt: number;
}

export default IRoleTransformer;
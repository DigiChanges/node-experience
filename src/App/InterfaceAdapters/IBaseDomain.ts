interface IBaseDomain
{
    createdAt: Date;
    updatedAt: Date;

    get_id(): string;
    set_id(id: string): void;
    clone(): void;
}

export default IBaseDomain;

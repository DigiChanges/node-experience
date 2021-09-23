interface IBaseDomain
{
    createdAt: Date;
    updatedAt: Date;

    getId(): string;
    setId(id: string): void;
    clone(): void;
}

export default IBaseDomain;
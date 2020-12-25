
interface ITokenDomain
{
    hash: string;
    expires: number;
    payload: any;
    blackListed: boolean;
    createdAt: Date;
    updatedAt: Date;

    getId(): string;
    setId(id: string): void;
}

export default ITokenDomain;

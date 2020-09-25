
interface IFileDomain
{
    name: string;
    originalName: string;
    mimeType: string;
    path: string;
    extension: string;
    size: number;
    version: number;
    createdAt: Date;
    updatedAt: Date;

    getId(): string;
}

export default IFileDomain;

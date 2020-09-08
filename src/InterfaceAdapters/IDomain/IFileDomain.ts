
interface IFileDomain
{
    name: string;
    originalName: string;
    mimeType: string;
    path: string;
    extension: string;
    createdAt: Date;
    updatedAt: Date;

    getId(): string;
}

export default IFileDomain;

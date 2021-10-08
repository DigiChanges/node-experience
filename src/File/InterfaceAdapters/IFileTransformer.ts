interface IFileTransformer
{
    id: string;
    name: string;
    originalName: string;
    mimeType: string;
    path: string;
    extension: string;
    size: number;
    version: number;
    createdAt: number;
    updatedAt: number;
}

export default IFileTransformer;

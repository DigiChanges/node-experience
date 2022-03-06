
interface FileRepPayload
{
    originalName: string;
    mimeType: string;
    path: string;
    extension: string;
    size: number;
    isPublic: boolean;
}

export default FileRepPayload;

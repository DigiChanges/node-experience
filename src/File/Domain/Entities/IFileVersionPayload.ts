
interface IFileVersionPayload
{
    _id?: string;
    originalName: string;
    mimeType: string;
    base64?: string;
    destination?: string;
    extension: string;
    filename: string;
    path: string;
    size: number;
    encoding: string;
    isImage: boolean;
}

export default IFileVersionPayload;

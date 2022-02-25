
interface FileRepPayload
{
    getOriginalName(): string;
    getMimeType(): string;
    getPath(): string;
    getExtension(): string;
    getSize(): number;
    getIsPublic(): boolean;
}

export default FileRepPayload;


interface FileRepPayload
{
    getOriginalName(): string,
    getMimeType(): string,
    getPath(): string,
    getExtension(): string,
    getSize(): number,
}

export default FileRepPayload;

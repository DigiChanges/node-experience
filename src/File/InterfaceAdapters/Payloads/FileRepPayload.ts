
interface FileRepPayload
{
    get_name(): string,
    get_original_name(): string,
    get_mime_type(): string,
    get_path(): string,
    get_extension(): string,
    get_size(): number,
}

export default FileRepPayload;

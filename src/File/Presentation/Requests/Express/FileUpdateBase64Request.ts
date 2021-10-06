import IdRequest from '../../../../App/Presentation/Requests/IdRequest';
import FileUpdateBase64Payload from '../../../InterfaceAdapters/Payloads/FileUpdateBase64Payload';
import { IsBase64, IsMimeType, IsString } from 'class-validator';

class FileUpdateBase64Request extends IdRequest implements FileUpdateBase64Payload
{
    @IsMimeType()
    mimeType: string;

    @IsString()
    filename: string;

    @IsBase64()
    base64: string;

    constructor(data: Record<string, any>, id: string)
    {
        super(id);
        this.filename = data.filename;
        this.base64 = data.base64.split(';base64,').pop();
        this.mimeType = data.base64.split(';base64').shift().split('data:').pop();
    }

    get_name(): string
    {
        return this.filename.split('.').shift();
    }

    get_original_name(): string
    {
        return this.filename;
    }

    get_mime_type(): string
    {
        return this.mimeType;
    }

    get_path(): string
    {
        return '/';
    }

    get_extension(): string
    {
        return this.filename.split('.').pop();
    }

    get_size(): number
    {
        return Math.round((this.base64.length - 814) / 1.37);
    }

    get_base64(): string
    {
        return this.base64;
    }
}

export default FileUpdateBase64Request;

import IdRequest from '../../../../App/Presentation/Requests/Express/IdRequest';
import FileUpdateBase64Payload from '../../../InterfaceAdapters/Payloads/FileUpdateBase64Payload';
import {IsBase64, IsMimeType, IsString} from 'class-validator';

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

    getName(): string
    {
        return this.filename.split('.').shift();
    }

    getOriginalName(): string
    {
        return this.filename;
    }

    getMimeType(): string
    {
        return this.mimeType;
    }

    getPath(): string
    {
        return '/';
    }

    getExtension(): string
    {
        return this.filename.split('.').pop();
    }

    getSize(): number
    {
        return Math.round((this.base64.length - 814) / 1.37);
    }

    getBase64(): string
    {
        return this.base64;
    }
}

export default FileUpdateBase64Request;

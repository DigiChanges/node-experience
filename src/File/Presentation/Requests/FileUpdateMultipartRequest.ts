import IdRequest from '../../../App/Presentation/Requests/IdRequest';
import FileUpdateMultipartPayload from '../../InterfaceAdapters/Payloads/FileUpdateMultipartPayload';
import { IsDefined } from 'class-validator';

class FileUpdateMultipartRequest extends IdRequest implements FileUpdateMultipartPayload
{
    @IsDefined()
    file: any;

    constructor(data: Record<string, any>, id: string)
    {
        super(id);
        this.file = data.file;
    }

    getOriginalName(): string
    {
        return this.file.originalname;
    }

    getMimeType(): string
    {
        return this.file.mimetype;
    }

    getPath(): string
    {
        return '/';
    }

    getExtension(): string
    {
        return this.file.originalname.split('.').pop();
    }

    getFile(): any
    {
        return this.file;
    }

    getSize(): number
    {
        return this.file.size;
    }
}

export default FileUpdateMultipartRequest;

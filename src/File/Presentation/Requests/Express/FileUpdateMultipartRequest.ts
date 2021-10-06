import IdRequest from '../../../../App/Presentation/Requests/IdRequest';
import FileUpdateMultipartPayload from '../../../InterfaceAdapters/Payloads/FileUpdateMultipartPayload';
import { IsDefined } from 'class-validator';

class FileUpdateMultipartRequest extends IdRequest implements FileUpdateMultipartPayload
{
    @IsDefined()
    file: Express.Multer.File;

    constructor(data: Record<string, any>, id: string)
    {
        super(id);
        this.file = data.file;
    }

    get_name(): string
    {
        return this.file.filename.split('.').shift();
    }

    get_original_name(): string
    {
        return this.file.originalname;
    }

    get_mime_type(): string
    {
        return this.file.mimetype;
    }

    get_path(): string
    {
        return '/';
    }

    get_extension(): string
    {
        return this.file.originalname.split('.').pop();
    }

    get_file(): Express.Multer.File
    {
        return this.file;
    }

    get_size(): number
    {
        return this.file.size;
    }
}

export default FileUpdateMultipartRequest;

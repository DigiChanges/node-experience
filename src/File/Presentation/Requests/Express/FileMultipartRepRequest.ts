import FileMultipartRepPayload from '../../../InterfaceAdapters/Payloads/FileMultipartRepPayload';
import { IsDefined } from 'class-validator';

// TODO: Refactor express multer file dependency
class FileMultipartRepRequest implements FileMultipartRepPayload
{
    @IsDefined()
    file: Express.Multer.File;

    constructor(data: Record<string, any>)
    {
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

    get_size(): number
    {
        return this.file.size;
    }

    get_file(): Express.Multer.File
    {
        return this.file;
    }
}

export default FileMultipartRepRequest;

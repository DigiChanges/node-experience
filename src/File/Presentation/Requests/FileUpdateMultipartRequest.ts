import IdRequest from '../../../App/Presentation/Requests/IdRequest';
import FileUpdateMultipartPayload from '../../InterfaceAdapters/Payloads/FileUpdateMultipartPayload';
import FileMultipartRepRequest from './FileMultipartRepRequest';
import { Mixin } from 'ts-mixer';

class FileUpdateMultipartRequest extends Mixin(FileMultipartRepRequest, IdRequest) implements FileUpdateMultipartPayload
{
    constructor(data: Record<string, any>)
    {
        super(data);
    }
}

export default FileUpdateMultipartRequest;

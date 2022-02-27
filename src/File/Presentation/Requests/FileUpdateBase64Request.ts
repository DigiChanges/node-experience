import IdRequest from '../../../App/Presentation/Requests/IdRequest';
import FileUpdateBase64Payload from '../../Domain/Payloads/FileUpdateBase64Payload';
import { Mixin } from 'ts-mixer';
import FileBase64RepRequest from './FileBase64RepRequest';

class FileUpdateBase64Request extends Mixin(IdRequest, FileBase64RepRequest) implements FileUpdateBase64Payload
{
    constructor({ data, query, id }: any)
    {
        super({ data, query, id });
    }
}

export default FileUpdateBase64Request;

import FileService from '../Services/FileService';
import { ListObjectsPayload } from '../Payloads/ListObjectsPayload';

class ListObjectsUseCase
{
    constructor(private fileService: FileService)
    {}

    async handle(payload: ListObjectsPayload): Promise<any>
    {
        return await this.fileService.listObjects(payload);
    }
}

export default ListObjectsUseCase;

import ListObjectsPayload from '../Payloads/ListObjectsPayload';
import FileService from '../Services/FileService';

class ListObjectsUseCase
{
    private fileService = new FileService();

    async handle(payload: ListObjectsPayload): Promise<any>
    {
        return await this.fileService.listObjects(payload);
    }
}

export default ListObjectsUseCase;

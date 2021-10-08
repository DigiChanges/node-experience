import ListObjectsPayload from '../../InterfaceAdapters/Payloads/ListObjectsPayload';
import FileService from '../Services/FileService';

class ListObjectsUseCase
{
    private file_service = new FileService();
    async handle(payload: ListObjectsPayload): Promise<any>
    {
        return await this.file_service.list_objects(payload);
    }
}

export default ListObjectsUseCase;

import IdPayload from '../../../Shared/InterfaceAdapters/IdPayload';
import IFileDomain from '../../InterfaceAdapters/IFileDomain';
import FileService from '../Services/FileService';

class GetFileMetadataUserCase
{
    private file_service = new FileService();

    async handle(payload: IdPayload): Promise<IFileDomain>
    {
        const id = payload.get_id();
        return await this.file_service.get_one(id);
    }
}

export default GetFileMetadataUserCase;

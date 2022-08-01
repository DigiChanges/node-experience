import IdPayload from '../../../Shared/Presentation/Requests/IdPayload';
import IFileDomain from '../Entities/IFileDomain';
import FileService from '../Services/FileService';

class GetFileMetadataUserCase
{
    private fileService = new FileService();

    async handle(payload: IdPayload): Promise<IFileDomain>
    {
        const { id } = payload;
        return await this.fileService.getOne(id);
    }
}

export default GetFileMetadataUserCase;

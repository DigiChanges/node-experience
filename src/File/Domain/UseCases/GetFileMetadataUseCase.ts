import IdPayload from '../../../Shared/Presentation/Requests/IdPayload';
import IFileVersionDomain from '../Entities/IFileVersionDomain';
import FileService from '../Services/FileService';

class GetFileMetadataUserCase
{
    private fileService = new FileService();

    async handle(payload: IdPayload): Promise<IFileVersionDomain>
    {
        const { id } = payload;
        return await this.fileService.getOneVersion(id);
    }
}

export default GetFileMetadataUserCase;

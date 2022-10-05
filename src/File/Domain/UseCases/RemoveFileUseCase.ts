import IFileVersionDomain from '../Entities/IFileVersionDomain';
import IdPayload from '../../../Shared/Presentation/Requests/IdPayload';
import FileService from '../Services/FileService';

class RemoveFileUseCase
{
    private fileService = new FileService();

    async handle(payload: IdPayload): Promise<IFileVersionDomain>
    {
        const { id } = payload;
        return this.fileService.removeFile(id);
    }
}

export default RemoveFileUseCase;

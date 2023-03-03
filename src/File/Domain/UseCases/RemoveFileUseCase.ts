import IdPayload from '../../../Shared/Presentation/Requests/IdPayload';
import FileService from '../Services/FileService';
import IFileDTO from '../Models/IFileDTO';

class RemoveFileUseCase
{
    private fileService = new FileService();

    async handle(payload: IdPayload): Promise<IFileDTO>
    {
        const { id } = payload;
        return this.fileService.removeFileAndVersions(id);
    }
}

export default RemoveFileUseCase;

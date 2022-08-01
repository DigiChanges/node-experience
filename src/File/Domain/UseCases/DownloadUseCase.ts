import IFileDTO from '../Models/IFileDTO';
import IdPayload from '../../../Shared/Presentation/Requests/IdPayload';
import FileService from '../Services/FileService';

class DownloadUseCase
{
    private fileService = new FileService();

    async handle(payload: IdPayload): Promise<IFileDTO>
    {
        return await this.fileService.download(payload);
    }
}

export default DownloadUseCase;

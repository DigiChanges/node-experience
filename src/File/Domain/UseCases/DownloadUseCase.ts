import IFileVersionDTO from '../Models/IFileVersionDTO';
import FileService from '../Services/FileService';
import DownloadRequest from '../../Presentation/Requests/DownloadRequest';

class DownloadUseCase
{
    private fileService = new FileService();

    async handle(payload: DownloadRequest): Promise<IFileVersionDTO>
    {
        return await this.fileService.download(payload);
    }
}

export default DownloadUseCase;

import IFileVersionDTO from '../Models/IFileVersionDTO';
import FileService from '../Services/FileService';
import DownloadPayload from '../Payloads/DownloadPayload';

class DownloadUseCase
{
    private fileService = new FileService();

    async handle(payload: DownloadPayload): Promise<IFileVersionDTO>
    {
        return await this.fileService.download(payload);
    }
}

export default DownloadUseCase;

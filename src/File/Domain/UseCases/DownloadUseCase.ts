import IFileDTO from '../../InterfaceAdapters/Payloads/IFileDTO';
import IdPayload from '../../../Shared/InterfaceAdapters/IdPayload';
import FileService from '../Services/FileService';

class DownloadUseCase
{
    private file_service = new FileService();

    async handle(payload: IdPayload): Promise<IFileDTO>
    {
        return await this.file_service.download(payload);
    }
}

export default DownloadUseCase;

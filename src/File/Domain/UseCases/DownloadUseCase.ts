import IFileDTO from '../../InterfaceAdapters/Payloads/IFileDTO';
import IdPayload from '../../../Shared/InterfaceAdapters/IdPayload';
import { containerFactory } from '../../../Shared/Decorators/ContainerFactory';
import { SERVICES } from '../../../services';
import IFileService from '../../InterfaceAdapters/IFileService';

class DownloadUseCase
{
    @containerFactory(SERVICES.IFileService)
    private fileService: IFileService;

    async handle(payload: IdPayload): Promise<IFileDTO>
    {
        return await this.fileService.download(payload);
    }
}

export default DownloadUseCase;

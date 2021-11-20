import { containerFactory } from '../../../Shared/Decorators/ContainerFactory';
import { SERVICES } from '../../../services';
import IFileService from '../../InterfaceAdapters/IFileService';
import IFileDomain from '../../InterfaceAdapters/IFileDomain';
import IdPayload from '../../../Shared/InterfaceAdapters/IdPayload';

class RemoveFileUseCase
{
    @containerFactory(SERVICES.IFileService)
    private fileService: IFileService;

    async handle(payload: IdPayload): Promise<IFileDomain>
    {
        const id = payload.getId();
        return this.fileService.removeFile(id);
    }
}

export default RemoveFileUseCase;

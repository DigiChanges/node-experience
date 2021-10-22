import IdPayload from '../../../Shared/InterfaceAdapters/IdPayload';
import IFileDomain from '../../InterfaceAdapters/IFileDomain';
import { containerFactory } from '../../../Shared/Decorators/ContainerFactory';
import { SERVICES } from '../../../services';
import IFileService from '../../InterfaceAdapters/IFileService';

class GetFileMetadataUserCase
{
    @containerFactory(SERVICES.IFileService)
    private fileService: IFileService;

    async handle(payload: IdPayload): Promise<IFileDomain>
    {
        const id = payload.getId();
        return await this.fileService.getOne(id);
    }
}

export default GetFileMetadataUserCase;

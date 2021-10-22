import ListObjectsPayload from '../../InterfaceAdapters/Payloads/ListObjectsPayload';
import { containerFactory } from '../../../Shared/Decorators/ContainerFactory';
import { SERVICES } from '../../../services';
import IFileService from '../../InterfaceAdapters/IFileService';

class ListObjectsUseCase
{
    @containerFactory(SERVICES.IFileService)
    private fileService: IFileService;

    async handle(payload: ListObjectsPayload): Promise<any>
    {
        return await this.fileService.listObjects(payload);
    }
}

export default ListObjectsUseCase;

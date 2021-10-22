import PresignedFileRepPayload from '../../InterfaceAdapters/Payloads/PresignedFileRepPayload';
import { containerFactory } from '../../../Shared/Decorators/ContainerFactory';
import { SERVICES } from '../../../services';
import IFileService from '../../InterfaceAdapters/IFileService';

class GetPresignedGetObjectUseCase
{
    @containerFactory(SERVICES.IFileService)
    private fileService: IFileService;

    async handle(payload: PresignedFileRepPayload): Promise<string>
    {
        return this.fileService.getPresignedGetObject(payload);
    }
}

export default GetPresignedGetObjectUseCase;

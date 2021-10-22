import PresignedFileRepPayload from '../../InterfaceAdapters/Payloads/PresignedFileRepPayload';
import { containerFactory } from '../../../Shared/Decorators/ContainerFactory';
import { SERVICES } from '../../../services';
import IFileService from '../../InterfaceAdapters/IFileService';

class GetPresignedGetObjectUseCase
{
    @containerFactory(SERVICES.IFileService)
    private file_service: IFileService;

    async handle(payload: PresignedFileRepPayload): Promise<string>
    {
        return this.file_service.getPresignedGetObject(payload);
    }
}

export default GetPresignedGetObjectUseCase;

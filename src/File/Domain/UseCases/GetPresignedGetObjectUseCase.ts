import PresignedFileRepPayload from '../../InterfaceAdapters/Payloads/PresignedFileRepPayload';
import { REPOSITORIES } from '../../../Config/repositories';
import IFileRepository from '../../InterfaceAdapters/IFileRepository';
import IFileDomain from '../../InterfaceAdapters/IFileDomain';
import { containerFactory } from '../../../Shared/Decorators/ContainerFactory';
import { SERVICES } from '../../../services';
import IFileService from '../../InterfaceAdapters/IFileService';

class GetPresignedGetObjectUseCase
{
    @containerFactory(REPOSITORIES.IFileRepository)
    private repository: IFileRepository;

    @containerFactory(SERVICES.IFileService)
    private service: IFileService;

    async handle(payload: PresignedFileRepPayload): Promise<string>
    {
        const filename = payload.getName();
        const expiry = payload.getExpiry();

        const file: IFileDomain = await this.repository.getOne(filename);

        return await this.service.getFileUrl(file, expiry);
    }
}

export default GetPresignedGetObjectUseCase;

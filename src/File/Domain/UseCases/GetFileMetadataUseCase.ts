import IFileRepository from '../../InterfaceAdapters/IFileRepository';
import { REPOSITORIES } from '../../../Config/repositories';

import IdPayload from '../../../Shared/InterfaceAdapters/IdPayload';
import IFileDomain from '../../InterfaceAdapters/IFileDomain';
import { containerFactory } from '../../../Shared/Decorators/ContainerFactory';

class GetFileMetadataUserCase
{
    @containerFactory(REPOSITORIES.IFileRepository)
    private repository: IFileRepository;

    async handle(payload: IdPayload): Promise<IFileDomain>
    {
        const id = payload.getId();
        return await this.repository.getOne(id);
    }
}

export default GetFileMetadataUserCase;

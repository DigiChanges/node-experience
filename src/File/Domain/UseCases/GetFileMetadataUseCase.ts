import IFileRepository from '../../InterfaceAdapters/IFileRepository';
import {REPOSITORIES} from '../../../repositories';

import IdPayload from '../../../App/InterfaceAdapters/Payloads/IdPayload';
import IFileDomain from '../../InterfaceAdapters/IFileDomain';
import {containerFactory} from '../../../App/Infrastructure/Factories/ContainerFactory';

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

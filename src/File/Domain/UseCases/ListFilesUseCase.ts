import { ICriteria, IPaginator } from '@digichanges/shared-experience';

import IFileRepository from '../../InterfaceAdapters/IFileRepository';
import { REPOSITORIES } from '../../../Config/repositories';
import { containerFactory } from '../../../Shared/Decorators/ContainerFactory';

class ListFilesUseCase
{
    @containerFactory(REPOSITORIES.IFileRepository)
    private repository: IFileRepository;

    async handle(payload: ICriteria): Promise<IPaginator>
    {
        return await this.repository.list(payload);
    }
}

export default ListFilesUseCase;

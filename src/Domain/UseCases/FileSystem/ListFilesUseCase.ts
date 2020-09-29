import { lazyInject } from "../../../inversify.config";
import ICriteria from "../../../InterfaceAdapters/Shared/ICriteria";
import IPaginator from "../../../InterfaceAdapters/Shared/IPaginator";
import IFileRepository from "../../../InterfaceAdapters/IRepositories/IFileRepository";
import { REPOSITORIES } from "../../../repositories";


class ListFilesUseCase
{
    @lazyInject(REPOSITORIES.IFileRepository)
    private repository: IFileRepository;

    async handle(payload: ICriteria): Promise<IPaginator>
    {
        return await this.repository.list(payload);
    }
}

export default ListFilesUseCase;
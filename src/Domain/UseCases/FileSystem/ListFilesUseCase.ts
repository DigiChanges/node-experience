import {ICriteria, IPaginator} from "@digichanges/shared-experience";

import IFileRepository from "../../../InterfaceAdapters/IRepositories/IFileRepository";
import { REPOSITORIES } from "../../../repositories";
import ContainerFactory from "../../../Infrastructure/Factories/ContainerFactory";

class ListFilesUseCase
{
    private repository: IFileRepository;

    constructor()
    {
        this.repository = ContainerFactory.create<IFileRepository>(REPOSITORIES.IFileRepository);
    }

    async handle(payload: ICriteria): Promise<IPaginator>
    {
        return await this.repository.list(payload);
    }
}

export default ListFilesUseCase;

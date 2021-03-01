import IFileRepository from '../../../InterfaceAdapters/IRepositories/IFileRepository';
import { REPOSITORIES } from '../../../repositories';

import IdPayload from '../../../InterfaceAdapters/Payloads/Defaults/IdPayload';
import IFileDTO from '../../../InterfaceAdapters/Payloads/FileSystem/IFileDTO';
import FileDTO from '../../../InterfaceAdapters/Payloads/FileSystem/FileDTO';
import IFileDomain from '../../../InterfaceAdapters/IDomain/IFileDomain';
import FilesystemFactory from "../../../Infrastructure/Factories/FilesystemFactory";
import ContainerFactory from "../../../Infrastructure/Factories/ContainerFactory";

class DownloadUseCase
{
    private repository: IFileRepository;

    constructor()
    {
        this.repository = ContainerFactory.create<IFileRepository>(REPOSITORIES.IFileRepository);
    }

    async handle(payload: IdPayload): Promise<IFileDTO>
    {
        const id = payload.getId();
        const metadata: IFileDomain = await this.repository.getOne(id);

        const filesystem = FilesystemFactory.create();
        const stream = await filesystem.downloadStreamFile(id);

        return new FileDTO(metadata, stream);
    }
}

export default DownloadUseCase;

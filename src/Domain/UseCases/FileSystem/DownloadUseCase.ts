import { lazyInject } from '../../../inversify.config';
import IFileRepository from '../../../InterfaceAdapters/IRepositories/IFileRepository';
import { REPOSITORIES } from '../../../repositories';

import IdPayload from '../../../InterfaceAdapters/Payloads/Defaults/IdPayload';
import IFileDTO from '../../../InterfaceAdapters/Payloads/FileSystem/IFileDTO';
import FileDTO from '../../../InterfaceAdapters/Payloads/FileSystem/FileDTO';
import IFileDomain from '../../../InterfaceAdapters/IDomain/IFileDomain';
import FilesystemFactory from "../../../Infrastructure/Factories/FilesystemFactory";

class DownloadUseCase
{
    @lazyInject(REPOSITORIES.IFileRepository)
    private repository: IFileRepository;

    async handle(payload: IdPayload): Promise<IFileDTO>
    {
        const id = payload.getId();
        const metadata: IFileDomain = await this.repository.getOne(id);

        const filesystem = FilesystemFactory.create();
        const stream = await filesystem.downloadStreamFile(id);
        const fileDto = new FileDTO(metadata, stream);

        return fileDto;
    }
}

export default DownloadUseCase;

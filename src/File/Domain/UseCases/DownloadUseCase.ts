import IFileRepository from '../../InterfaceAdapters/IFileRepository';
import {REPOSITORIES} from '../../../repositories';

import IFileDTO from '../../InterfaceAdapters/Payloads/IFileDTO';
import FileDTO from '../../InterfaceAdapters/Payloads/FileDTO';
import IFileDomain from '../../InterfaceAdapters/IFileDomain';
import {containerFactory} from '../../../Shared/Decorators/ContainerFactory';
import IdPayload from '../../../Shared/InterfaceAdapters/IdPayload';
import FilesystemFactory from '../../../Shared/Factories/FilesystemFactory';

class DownloadUseCase
{
    @containerFactory(REPOSITORIES.IFileRepository)
    private repository: IFileRepository;

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

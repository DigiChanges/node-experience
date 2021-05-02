import IFileRepository from '../../InterfaceAdapters/IFileRepository';
import {REPOSITORIES} from '../../../repositories';

import IdPayload from '../../../App/InterfaceAdapters/Payloads/IdPayload';
import IFileDTO from '../../InterfaceAdapters/Payloads/IFileDTO';
import FileDTO from '../../InterfaceAdapters/Payloads/FileDTO';
import IFileDomain from '../../InterfaceAdapters/IFileDomain';
import FilesystemFactory from '../../../App/Infrastructure/Factories/FilesystemFactory';
import {containerFactory} from '../../../App/Infrastructure/Factories/ContainerFactory';

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

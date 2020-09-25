import { lazyInject } from '../../../inversify.config';
import IFileRepository from '../../../InterfaceAdapters/IRepositories/IFileRepository';
import { REPOSITORIES } from '../../../repositories';

import { filesystem } from '../../../index';
import IdPayload from '../../../InterfaceAdapters/Payloads/Defaults/IdPayload';
import IFileDTO from '../../../InterfaceAdapters/Payloads/FileSystem/IFileDTO';
import FileDTO from '../../../InterfaceAdapters/Payloads/FileSystem/FileDTO';

class DownloadUseCase
{
    @lazyInject(REPOSITORIES.IFileRepository)
    private repository: IFileRepository;

    async handle(payload: IdPayload): Promise<IFileDTO>
    {
        const id = payload.getId();
        const metadata = await this.repository.getOne(id);

        const stream = await filesystem.downloadStreamFile(id);
        const fileDto = new FileDTO(metadata, stream);

        return fileDto;
    }
}

export default DownloadUseCase;
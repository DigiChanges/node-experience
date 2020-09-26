import { filesystem } from '../../../index';
import IFileRepository from "../../../InterfaceAdapters/IRepositories/IFileRepository";
import { lazyInject } from '../../../inversify.config';
import { REPOSITORIES } from '../../../repositories';
import FileUpdateMultipartPayload from '../../../InterfaceAdapters/Payloads/FileSystem/FileUpdateMultipartPayload';
import IFileDomain from '../../../InterfaceAdapters/IDomain/IFileDomain';

class UpdateFileMultipartUseCase
{
    @lazyInject(REPOSITORIES.IFileRepository)
    private repository: IFileRepository;

    async handle(payload: FileUpdateMultipartPayload): Promise<any>
    {
        const id = payload.getId();

        const file: IFileDomain = await this.repository.getOne(id);
        file.extension = payload.getExtension();
        file.originalName = payload.getName();
        file.path = payload.getPath();
        file.mimeType = payload.getMimeType();
        file.size = payload.getSize();
        file.version += 1;

        await this.repository.save(file);

        await filesystem.uploadFile(file.name, payload.getFile().path);

        return file;        
    }
}

export default UpdateFileMultipartUseCase;
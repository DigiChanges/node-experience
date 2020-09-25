import { filesystem } from '../../../index';
import IFileRepository from "../../../InterfaceAdapters/IRepositories/IFileRepository";
import { lazyInject } from '../../../inversify.config';
import { REPOSITORIES } from '../../../repositories';
import FileUpdateMultipartPayload from '../../../InterfaceAdapters/Payloads/FileSystem/FileUpdateMultipartPayload';

class UpdateFileMultipartUseCase
{
    @lazyInject(REPOSITORIES.IFileRepository)
    private repository: IFileRepository;

    async handle(payload: FileUpdateMultipartPayload): Promise<any>
    {
        const id = payload.getId();

        const file = await this.repository.getOne(id);
        const currentVersion = file.version;
        file.extension = payload.getExtension();
        file.originalName = payload.getName();
        file.path = payload.getPath();
        file.mimeType = payload.getMimeType();
        file.size = payload.getSize();
        file.version = currentVersion + 1;

        await this.repository.save(file);

        await filesystem.uploadFile(file.name, payload.getFile().path);

        return file;        
    }
}

export default UpdateFileMultipartUseCase;
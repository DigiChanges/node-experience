import { filesystem } from '../../../index';
import IFileRepository from "../../../InterfaceAdapters/IRepositories/IFileRepository";
import { lazyInject } from '../../../inversify.config';
import { REPOSITORIES } from '../../../repositories';
import FileUpdateBase64Payload from '../../../InterfaceAdapters/Payloads/FileSystem/FileUpdateBase64Payload';

class UpdateFileBase64UseCase
{
    @lazyInject(REPOSITORIES.IFileRepository)
    private repository: IFileRepository;

    async handle(payload: FileUpdateBase64Payload): Promise<any>
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

        await await filesystem.uploadFileByBuffer(file.name, payload.getBase64());

        return file;
    }
}

export default UpdateFileBase64UseCase;
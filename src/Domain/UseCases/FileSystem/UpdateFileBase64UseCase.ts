import { filesystem } from '../../../index';
import IFileRepository from "../../../InterfaceAdapters/IRepositories/IFileRepository";
import { lazyInject } from '../../../inversify.config';
import { REPOSITORIES } from '../../../repositories';
import FileUpdateBase64Payload from '../../../InterfaceAdapters/Payloads/FileSystem/FileUpdateBase64Payload';
import IFileDomain from '../../../InterfaceAdapters/IDomain/IFileDomain';

class UpdateFileBase64UseCase
{
    @lazyInject(REPOSITORIES.IFileRepository)
    private repository: IFileRepository;

    async handle(payload: FileUpdateBase64Payload): Promise<any>
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

        await await filesystem.uploadFileByBuffer(file.name, payload.getBase64());

        return file;
    }
}

export default UpdateFileBase64UseCase;
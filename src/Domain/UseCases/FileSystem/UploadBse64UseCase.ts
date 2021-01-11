import IFileDomain from '../../../InterfaceAdapters/IDomain/IFileDomain';
import IFileRepository from '../../../InterfaceAdapters/IRepositories/IFileRepository';
import FileBase64RepPayload from '../../../InterfaceAdapters/Payloads/FileSystem/FileBase64RepPayload';
import { lazyInject } from '../../../inversify.config';
import { REPOSITORIES } from '../../../repositories';
import File from '../../Entities/File';
import FilesystemFactory from "../../../Infrastructure/Factories/FilesystemFactory";


class UploadBase64UseCase
{
    @lazyInject(REPOSITORIES.IFileRepository)
    private repository: IFileRepository;

    async handle(payload: FileBase64RepPayload): Promise<any>
    {
        const file: IFileDomain = new File();

        file.extension = payload.getExtension();
        file.originalName = payload.getName();
        file.path = payload.getPath();
        file.mimeType = payload.getMimeType();
        file.size = payload.getSize();

        await this.repository.save(file);

        const filesystem = FilesystemFactory.create();
        await filesystem.uploadFileByBuffer(file.name, payload.getBase64());

        return file;
    }
}

export default UploadBase64UseCase;
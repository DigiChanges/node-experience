import IFileRepository from '../../InterfaceAdapters/IFileRepository';
import {REPOSITORIES} from '../../../repositories';
import FileUpdateBase64Payload from '../../InterfaceAdapters/Payloads/FileUpdateBase64Payload';
import IFileDomain from '../../InterfaceAdapters/IFileDomain';
import {containerFactory} from '../../../Shared/Decorators/ContainerFactory';
import FilesystemFactory from '../../../Shared/Factories/FilesystemFactory';


class UpdateFileBase64UseCase
{
    @containerFactory(REPOSITORIES.IFileRepository)
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

        const filesystem = FilesystemFactory.create();
        await filesystem.uploadFileByBuffer(file.name, payload.getBase64());

        return file;
    }
}

export default UpdateFileBase64UseCase;

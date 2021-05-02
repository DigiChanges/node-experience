import FileMultipartRepPayload from '../../InterfaceAdapters/Payloads/FileMultipartRepPayload';
import IFileRepository from '../../InterfaceAdapters/IFileRepository';
import {REPOSITORIES} from '../../../repositories';
import File from '../Entities/File';
import IFileDomain from '../../InterfaceAdapters/IFileDomain';
import {containerFactory} from '../../../Shared/Decorators/ContainerFactory';
import FilesystemFactory from '../../../Shared/Factories/FilesystemFactory';

class UploadMultipartUseCase
{
    @containerFactory(REPOSITORIES.IFileRepository)
    private repository: IFileRepository;

    async handle(payload: FileMultipartRepPayload): Promise<any>
    {
        const file: IFileDomain = new File();

        file.extension = payload.getExtension();
        file.originalName = payload.getName();
        file.path = payload.getPath();
        file.mimeType = payload.getMimeType();
        file.size = payload.getSize();

        await this.repository.save(file);

        const filesystem = FilesystemFactory.create();
        await filesystem.uploadFile(file.name, payload.getFile().path);

        return file;
    }
}

export default UploadMultipartUseCase;

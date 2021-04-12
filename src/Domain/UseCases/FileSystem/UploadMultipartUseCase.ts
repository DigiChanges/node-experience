import FileMultipartRepPayload from '../../../InterfaceAdapters/Payloads/FileSystem/FileMultipartRepPayload';
import IFileRepository from '../../../InterfaceAdapters/IRepositories/IFileRepository';
import {REPOSITORIES} from '../../../repositories';
import File from '../../Entities/File';
import IFileDomain from '../../../InterfaceAdapters/IDomain/IFileDomain';
import FilesystemFactory from '../../../Infrastructure/Factories/FilesystemFactory';
import ContainerFactory from '../../../Infrastructure/Factories/ContainerFactory';

class UploadMultipartUseCase
{
    private repository: IFileRepository;

    constructor()
    {
        this.repository = ContainerFactory.create<IFileRepository>(REPOSITORIES.IFileRepository);
    }

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

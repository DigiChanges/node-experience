import IFileRepository from "../../../InterfaceAdapters/IRepositories/IFileRepository";
import { REPOSITORIES } from '../../../repositories';
import FileUpdateMultipartPayload from '../../../InterfaceAdapters/Payloads/FileSystem/FileUpdateMultipartPayload';
import IFileDomain from '../../../InterfaceAdapters/IDomain/IFileDomain';
import FilesystemFactory from "../../../Infrastructure/Factories/FilesystemFactory";
import ContainerFactory from "../../../Infrastructure/Factories/ContainerFactory";

class UpdateFileMultipartUseCase
{
    private repository: IFileRepository;

    constructor()
    {
        this.repository = ContainerFactory.create<IFileRepository>(REPOSITORIES.IFileRepository);
    }

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

        const filesystem = FilesystemFactory.create();
        await filesystem.uploadFile(file.name, payload.getFile().path);

        return file;        
    }
}

export default UpdateFileMultipartUseCase;

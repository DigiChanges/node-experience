import IFileRepository from "../../../InterfaceAdapters/IRepositories/IFileRepository";
import { REPOSITORIES } from '../../../repositories';
import FileUpdateBase64Payload from '../../../InterfaceAdapters/Payloads/FileSystem/FileUpdateBase64Payload';
import IFileDomain from '../../../InterfaceAdapters/IDomain/IFileDomain';
import FilesystemFactory from "../../../Infrastructure/Factories/FilesystemFactory";
import ContainerFactory from "../../../Infrastructure/Factories/ContainerFactory";

class UpdateFileBase64UseCase
{
    private repository: IFileRepository;

    constructor()
    {
        this.repository = ContainerFactory.create<IFileRepository>(REPOSITORIES.IFileRepository);
    }

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

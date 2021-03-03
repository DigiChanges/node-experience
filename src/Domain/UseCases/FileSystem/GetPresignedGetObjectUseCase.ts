import PresignedFileRepPayload from '../../../InterfaceAdapters/Payloads/FileSystem/PresignedFileRepPayload';
import {REPOSITORIES} from "../../../repositories";
import IFileRepository from "../../../InterfaceAdapters/IRepositories/IFileRepository";
import IFileDomain from "../../../InterfaceAdapters/IDomain/IFileDomain";
import FilesystemFactory from "../../../Infrastructure/Factories/FilesystemFactory";
import ContainerFactory from "../../../Infrastructure/Factories/ContainerFactory";

class GetPresignedGetObjectUseCase
{
    private repository: IFileRepository;

    constructor()
    {
        this.repository = ContainerFactory.create<IFileRepository>(REPOSITORIES.IFileRepository);
    }

    async handle(payload: PresignedFileRepPayload): Promise<string>
    {
        const filename = payload.getName();
        const expiry = payload.getExpiry();

        const file: IFileDomain = await this.repository.getOne(filename);

        const metadata = {
            'Content-Type': file.mimeType,
            'Content-Length': file.size
        };

        const filesystem = FilesystemFactory.create();
        return await filesystem.presignedGetObject(filename, expiry, metadata);
    }
}

export default GetPresignedGetObjectUseCase;

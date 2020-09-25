import { filesystem } from '../../../index';
import FileMultipartRepPayload from '../../../InterfaceAdapters/Payloads/FileSystem/FileMultipartRepPayload';
import IFileRepository from "../../../InterfaceAdapters/IRepositories/IFileRepository";
import { lazyInject } from '../../../inversify.config';
import { REPOSITORIES } from '../../../repositories';
import File from '../../Entities/File';

class UploadMultipartUseCase
{
    @lazyInject(REPOSITORIES.IFileRepository)
    private repository: IFileRepository;

    async handle(payload: FileMultipartRepPayload): Promise<any>
    {
        const file = new File();

        file.extension = payload.getExtension();
        file.originalName = payload.getName();
        file.path = payload.getPath();
        file.mimeType = payload.getMimeType();
        file.size = payload.getSize();

        await this.repository.save(file);

        await filesystem.uploadFile(file.name, payload.getFile().path);

        return file;        
    }
}

export default UploadMultipartUseCase;
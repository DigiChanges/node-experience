import { filesystem } from '../../../index';
import MultipartFileRepPayload from '../../../InterfaceAdapters/Payloads/FileSystem/MultipartFileRepPayload';
import IFileRepository from "../../../InterfaceAdapters/IRepositories/IFileRepository";
import { lazyInject } from '../../../inversify.config';
import { REPOSITORIES } from '../../../repositories';
import File from '../../Entities/File';

class UploadMultipartUseCase
{
    @lazyInject(REPOSITORIES.IFileRepository)
    private repository: IFileRepository;

    async handle(payload: MultipartFileRepPayload): Promise<any>
    {
        const file = new File();

        file.extension = payload.getExtension();
        file.originalName = payload.getName();
        file.path = payload.getPath();
        file.mimeType = payload.getMimeType();

        await this.repository.save(file);

        await filesystem.uploadFile(file.name, payload.getFile().path);

        return file;        
    }
}

export default UploadMultipartUseCase;
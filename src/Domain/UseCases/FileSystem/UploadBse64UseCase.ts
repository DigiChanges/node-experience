import { filesystem } from '../../../index';
import IFileRepository from '../../../InterfaceAdapters/IRepositories/IFileRepository';
import Base64FileRepPayload from '../../../InterfaceAdapters/Payloads/FileSystem/Base64FileRepPayload';
import { lazyInject } from '../../../inversify.config';
import { REPOSITORIES } from '../../../repositories';
import File from '../../Entities/File';


class UploadBase64UseCase
{
    @lazyInject(REPOSITORIES.IFileRepository)
    private repository: IFileRepository;

    async handle(payload: Base64FileRepPayload): Promise<any>
    {
        const file = new File();

        file.extension = payload.getExtension();
        file.originalName = payload.getName();
        file.path = payload.getPath();
        file.mimeType = payload.getMimeType();
        file.size = payload.getSize();

        await this.repository.save(file);

        await await filesystem.uploadFileByBuffer(file.name, payload.getBase64());

        return file;
    }
}

export default UploadBase64UseCase;
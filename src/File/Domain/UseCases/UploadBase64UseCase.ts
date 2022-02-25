import FileBase64RepPayload from '../../InterfaceAdapters/Payloads/FileBase64RepPayload';
import IFileDomain from '../../InterfaceAdapters/IFileDomain';
import File from '../Entities/File';
import FileService from '../Services/FileService';

class UploadBase64UseCase
{
    private fileService = new FileService();

    async handle(payload: FileBase64RepPayload): Promise<any>
    {
        const build = {
            isOriginalName: payload.getIsOriginalName(),
            originalName: payload.getOriginalName()
        };

        let file: IFileDomain = new File(build);
        file = await this.fileService.persist(file, payload);
        return await this.fileService.uploadFileBase64(file, payload);
    }
}

export default UploadBase64UseCase;

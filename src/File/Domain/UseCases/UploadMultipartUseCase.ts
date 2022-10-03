import FileMultipartRepPayload from '../Payloads/FileMultipartRepPayload';
import IFileDomain from '../Entities/IFileDomain';
import File from '../Entities/File';
import FileService from '../Services/FileService';

class UploadMultipartUseCase
{
    private fileService = new FileService();

    async handle(payload: FileMultipartRepPayload): Promise<any>
    {
        if (payload.isOptimize && payload.isImage)
        {
            payload = await this.fileService.optimize(payload);
        }

        const build = {
            hasOriginalName: payload.isOriginalName,
            originalName: payload.originalName
        };

        let file: IFileDomain = new File(build);
        file = await this.fileService.persist(file, payload);
        return await this.fileService.uploadFileMultipart(file, payload);
    }
}

export default UploadMultipartUseCase;

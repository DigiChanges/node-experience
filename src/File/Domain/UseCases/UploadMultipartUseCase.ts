import FileMultipartRepPayload from '../Payloads/FileMultipartRepPayload';
import IFileDomain from '../Entities/IFileDomain';
import File from '../Entities/File';
import FileService from '../Services/FileService';
import FileMultipartOptimizeRequestAdapter from '../FileMultipartOptimizeRequestAdapter';

class UploadMultipartUseCase
{
    private fileService = new FileService();

    async handle(payload: FileMultipartRepPayload): Promise<any>
    {
        if (payload.isOptimize)
        {
            const file = await this.fileService.optimize(payload);
            payload = new FileMultipartOptimizeRequestAdapter(payload, file);
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

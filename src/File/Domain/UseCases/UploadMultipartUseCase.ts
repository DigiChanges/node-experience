import FileMultipartRepPayload from '../Payloads/FileMultipartRepPayload';
import IFileVersionDomain from '../Entities/IFileVersionDomain';
import FileVersion from '../Entities/FileVersion';
import FileService from '../Services/FileService';

class UploadMultipartUseCase
{
    private fileService = new FileService();

    async handle(payload: FileMultipartRepPayload): Promise<any>
    {
        if (payload.isOptimize && payload.isImage)
        {
            payload = await this.fileService.optimizeMultipartToUpload(payload);
        }

        const build = {
            hasOriginalName: payload.isOriginalName,
            originalName: payload.originalName,
            isOptimized: payload.isOptimize && payload.isImage
        };

        let fileVersion: IFileVersionDomain = new FileVersion(build);
        fileVersion = await this.fileService.persist(fileVersion, payload);
        return await this.fileService.uploadFileMultipart(fileVersion, payload);
    }
}

export default UploadMultipartUseCase;

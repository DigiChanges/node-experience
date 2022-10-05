import FileBase64RepPayload from '../Payloads/FileBase64RepPayload';
import IFileVersionDomain from '../Entities/IFileVersionDomain';
import FileVersion from '../Entities/FileVersion';
import FileService from '../Services/FileService';

class UploadBase64UseCase
{
    private fileService = new FileService();

    async handle(payload: FileBase64RepPayload): Promise<any>
    {
        if (payload.isOptimize && payload.isImage)
        {
            payload = await this.fileService.optimizeBase64ToUpload(payload);
        }

        const build = {
            hasOriginalName: payload.isOriginalName,
            originalName: payload.originalName,
            isOptimized: payload.isOptimize && payload.isImage
        };

        let fileVersion: IFileVersionDomain = new FileVersion(build);
        fileVersion = await this.fileService.persist(fileVersion, payload);
        return await this.fileService.uploadFileBase64(fileVersion, payload);
    }
}

export default UploadBase64UseCase;

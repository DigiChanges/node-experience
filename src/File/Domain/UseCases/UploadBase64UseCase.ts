import FileBase64RepPayload from '../Payloads/FileBase64RepPayload';
import IFileVersionDomain from '../Entities/IFileVersionDomain';
import FileVersion from '../Entities/FileVersion';
import FileService from '../Services/FileService';
import File from '../Entities/File';
import FileDTO from '../Models/FileDTO';

class UploadBase64UseCase
{
    private fileService = new FileService();

    async handle(payload: FileBase64RepPayload): Promise<any>
    {
        if (payload.isOptimize && payload.isImage)
        {
            payload = await this.fileService.optimizeBase64ToUpload(payload);
        }

        let file = await this.fileService.persist(new File());

        const build = {
            hasOriginalName: payload.isOriginalName,
            originalName: payload.originalName,
            isOptimized: payload.isOptimize && payload.isImage,
            file
        };

        let fileVersion: IFileVersionDomain = new FileVersion(build);
        fileVersion = await this.fileService.persistVersion(fileVersion, payload);
        file = await this.fileService.update(file);
        await this.fileService.uploadFileBase64(fileVersion, payload);

        return new FileDTO(file, [fileVersion]);
    }
}

export default UploadBase64UseCase;

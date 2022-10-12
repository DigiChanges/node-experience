import FileMultipartRepPayload from '../Payloads/FileMultipartRepPayload';
import IFileVersionDomain from '../Entities/IFileVersionDomain';
import FileVersion from '../Entities/FileVersion';
import FileService from '../Services/FileService';
import File from '../Entities/File';
import IFileDTO from '../Models/IFileDTO';
import FileDTO from '../Models/FileDTO';

class UploadMultipartUseCase
{
    private fileService = new FileService();

    async handle(payload: FileMultipartRepPayload): Promise<IFileDTO>
    {
        if (payload.isOptimize && payload.isImage)
        {
            payload = await this.fileService.optimizeMultipartToUpload(payload);
        }

        let file = await this.fileService.persist();

        const build = {
            hasOriginalName: payload.isOriginalName,
            originalName: payload.originalName,
            isOptimized: payload.isOptimize && payload.isImage,
            file
        };

        let fileVersion: IFileVersionDomain = new FileVersion(build);
        fileVersion = await this.fileService.persistVersion(fileVersion, payload);
        file = await this.fileService.update(file);
        await this.fileService.uploadFileMultipart(fileVersion, payload);

        return new FileDTO(file, [fileVersion]);
    }
}

export default UploadMultipartUseCase;

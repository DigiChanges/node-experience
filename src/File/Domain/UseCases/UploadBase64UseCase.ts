import FileBase64RepPayload from '../Payloads/FileBase64RepPayload';
import IFileVersionDomain from '../Entities/IFileVersionDomain';
import FileVersion from '../Entities/FileVersion';
import FileService from '../Services/FileService';
import FileDTO from '../Models/FileDTO';

class UploadBase64UseCase
{
    #fileService = new FileService();

    async handle(payload: FileBase64RepPayload): Promise<any>
    {
        if (payload.query?.isOptimize && payload.isImage)
        {
            payload = await this.#fileService.optimizeBase64ToUpload(payload);
        }

        let file = await this.#fileService.persist();

        const build = {
            isOriginalName: payload.query?.isOriginalName ?? false,
            originalName: payload.originalName,
            isOptimized: payload.query?.isOptimize && payload.isImage,
            mimeType: payload.mimeType,
            extension: payload.extension,
            isPublic: payload.query?.isPublic ?? false,
            size: payload.size,
            path: payload.path,
            file
        };

        let fileVersion: IFileVersionDomain = new FileVersion(build);
        fileVersion = await this.#fileService.persistVersion(fileVersion);
        file = await this.#fileService.update(file);
        await this.#fileService.uploadFileBase64(fileVersion, payload);

        return new FileDTO(file, [fileVersion]);
    }
}

export default UploadBase64UseCase;

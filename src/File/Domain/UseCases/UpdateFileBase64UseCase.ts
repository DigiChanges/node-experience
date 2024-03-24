import FileUpdateBase64Payload from '../Payloads/FileUpdateBase64Payload';
import IFileVersionDomain from '../Entities/IFileVersionDomain';
import FileService from '../Services/FileService';
import FileVersion from '../Entities/FileVersion';
import FileDTO from '../Models/FileDTO';
import FileBase64UpdateSchemaValidation from '../Validations/FileBase64UpdateSchemaValidation';
import ValidatorSchema from '../../../Main/Domain/Shared/ValidatorSchema';

class UpdateFileBase64UseCase
{
    private fileService = new FileService();

    async handle(payload: FileUpdateBase64Payload): Promise<any>
    {
        await ValidatorSchema.handle(FileBase64UpdateSchemaValidation, payload);

        const { id } = payload;

        if (payload.query.isOptimize && payload.isImage)
        {
            payload = await this.fileService.optimizeBase64ToUpdate(payload);
        }

        let file = await this.fileService.getOne(id);

        const build = {
            isOriginalName: payload.query.isOriginalName,
            originalName: payload.originalName,
            isOptimized: payload.query.isOptimize && payload.isImage,
            mimeType: payload.mimeType,
            extension: payload.extension,
            isPublic: payload.query.isPublic,
            size: payload.size,
            path: payload.path,
            file
        };

        let fileVersion: IFileVersionDomain = new FileVersion(build);
        fileVersion = await this.fileService.persistVersion(fileVersion);
        file = await this.fileService.update(file);
        await this.fileService.uploadFileBase64(fileVersion, payload);

        const fileVersions = await this.fileService.getVersions(file.getId());

        return new FileDTO(file, fileVersions);
    }
}

export default UpdateFileBase64UseCase;

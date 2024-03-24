import FileUpdateMultipartPayload from '../Payloads/FileUpdateMultipartPayload';
import IFileVersionDomain from '../Entities/IFileVersionDomain';
import FileService from '../Services/FileService';
import FileVersion from '../Entities/FileVersion';
import FileDTO from '../Models/FileDTO';
import FileMultipartUpdateSchemaValidation from '../Validations/FileMultipartUpdateSchemaValidation';
import ValidatorSchema from '../../../Main/Domain/Shared/ValidatorSchema';

class UpdateFileMultipartUseCase
{
    private fileService = new FileService();

    async handle(payload: FileUpdateMultipartPayload): Promise<any>
    {
        await ValidatorSchema.handle(FileMultipartUpdateSchemaValidation, payload);

        const { id } = payload;

        if (payload.query.isOptimize && payload.file.isImage)
        {
            payload = await this.fileService.optimizeMultipartToUpdate(payload);
        }

        let file = await this.fileService.getOne(id);

        const build = {
            isOriginalName: payload.query.isOriginalName,
            originalName: payload.file.originalName,
            isOptimized: payload.query.isOptimize && payload.file.isImage,
            mimeType: payload.file.mimeType,
            extension: payload.file.extension,
            isPublic: payload.query.isPublic,
            size: payload.file.size,
            path: payload.file.path,
            file
        };

        let fileVersion: IFileVersionDomain = new FileVersion(build);
        fileVersion = await this.fileService.persistVersion(fileVersion);
        file = await this.fileService.update(file);
        await this.fileService.uploadFileMultipart(fileVersion, payload);

        const fileVersions = await this.fileService.getVersions(file.getId());

        return new FileDTO(file, fileVersions);
    }
}

export default UpdateFileMultipartUseCase;

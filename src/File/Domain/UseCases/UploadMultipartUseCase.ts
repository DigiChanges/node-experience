import FileMultipartRepPayload from '../Payloads/FileMultipartRepPayload';
import IFileVersionDomain from '../Entities/IFileVersionDomain';
import FileVersion from '../Entities/FileVersion';
import FileService from '../Services/FileService';
import IFileDTO from '../Models/IFileDTO';
import FileDTO from '../Models/FileDTO';
import ValidatorSchema from '../../../Main/Presentation/Utils/ValidatorSchema';
import FileMultipartSchemaValidation from '../../Presentation/Validations/FileMultipartSchemaValidation';

class UploadMultipartUseCase
{
    private fileService = new FileService();

    async handle(payload: FileMultipartRepPayload): Promise<IFileDTO>
    {
        await ValidatorSchema.handle(FileMultipartSchemaValidation, payload);

        if (payload.query?.isOptimize && payload.file.isImage)
        {
            payload = await this.fileService.optimizeMultipartToUpload(payload);
        }

        let file = await this.fileService.persist();

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

        return new FileDTO(file, [fileVersion]);
    }
}

export default UploadMultipartUseCase;

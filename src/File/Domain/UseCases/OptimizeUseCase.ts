import IFileVersionDomain from '../Entities/IFileVersionDomain';
import FileVersion from '../Entities/FileVersion';
import FileService from '../Services/FileService';
import IFileDTO from '../Models/IFileDTO';
import FileDTO from '../Models/FileDTO';
import OptimizePayload from '../Payloads/OptimizePayload';
import OptimizeSchemaValidation from '../Validations/OptimizeSchemaValidation';
import ValidatorSchema from '../../../Main/Domain/Shared/ValidatorSchema';

class OptimizeUseCase
{
    private fileService = new FileService();

    async handle(payload: OptimizePayload): Promise<IFileDTO>
    {
        await ValidatorSchema.handle(OptimizeSchemaValidation, payload);

        const { id } = payload;
        let file = await this.fileService.getOne(id);
        const fileVersions = await this.fileService.getVersions(id);
        const lastVersion = fileVersions.find(v => v.version === file.currentVersion);

        const optimizing = lastVersion && !lastVersion.isOptimized && lastVersion.isImage;

        if (optimizing)
        {
            const optimizePayload = await this.fileService.optimizeFileVersion(lastVersion);

            const build = {
                originalName: optimizePayload.originalName,
                isOriginalName: payload.isOriginalName,
                mimeType: optimizePayload.mimeType,
                extension: optimizePayload.extension,
                isPublic: payload.isPublic,
                size: optimizePayload.size,
                path: optimizePayload.path,
                isOptimized: true,
                file
            };

            let newFileVersion: IFileVersionDomain = new FileVersion(build);
            newFileVersion = await this.fileService.persistVersion(newFileVersion);
            await this.fileService.uploadFileVersionOptimized(newFileVersion, optimizePayload);
            file = await this.fileService.update(file);

            fileVersions.push(newFileVersion);
        }

        return new FileDTO(file, fileVersions);
    }
}

export default OptimizeUseCase;

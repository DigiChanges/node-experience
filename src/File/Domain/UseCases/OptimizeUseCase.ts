import IFileVersionDomain from '../Entities/IFileVersionDomain';
import FileVersion from '../Entities/FileVersion';
import FileService from '../Services/FileService';
import IFileDTO from '../Models/IFileDTO';
import FileDTO from '../Models/FileDTO';
import IdPayload from '../../../Shared/Presentation/Requests/IdPayload';
import ErrorHttpException from '../../../Shared/Presentation/Shared/ErrorHttpException';
import StatusCode from '../../../Shared/Application/StatusCode';

class OptimizeUseCase
{
    private fileService = new FileService();

    async handle(payload: IdPayload): Promise<IFileDTO>
    {
        const { id } = payload;
        let file = await this.fileService.getOne(id);
        const fileVersions = await this.fileService.getVersions(id);

        const lastVersion = fileVersions.find(v => v.version === file.currentVersion);

        const validate = lastVersion && !lastVersion.isOptimized && lastVersion.mimeType.includes('image');

        if (!validate)
        {
            throw new ErrorHttpException(StatusCode.HTTP_UNPROCESSABLE_ENTITY);
        }

        const optimizePayload = await this.fileService.optimizeFileVersion(lastVersion);

        const build = {
            hasOriginalName: true,
            originalName: optimizePayload.file.originalname,
            isOptimized: true,
            file
        };

        let newFileVersion: IFileVersionDomain = new FileVersion(build);
        newFileVersion = await this.fileService.persistVersion(newFileVersion, optimizePayload);
        await this.fileService.uploadFileVersionOptimized(newFileVersion, optimizePayload);
        file = await this.fileService.update(file);

        return new FileDTO(file, [...fileVersions, newFileVersion]);
    }
}

export default OptimizeUseCase;

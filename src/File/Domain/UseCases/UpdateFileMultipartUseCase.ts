import FileUpdateMultipartPayload from '../Payloads/FileUpdateMultipartPayload';
import IFileVersionDomain from '../Entities/IFileVersionDomain';
import FileService from '../Services/FileService';
import FileVersion from '../Entities/FileVersion';
import FileDTO from '../Models/FileDTO';

class UpdateFileMultipartUseCase
{
    private fileService = new FileService();

    async handle(payload: FileUpdateMultipartPayload): Promise<any>
    {
        const { id } = payload;

        if (payload.isOptimize && payload.isImage)
        {
            payload = await this.fileService.optimizeMultipartToUpdate(payload);
        }

        let file = await this.fileService.getOne(id);

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

        const fileVersions = await this.fileService.getVersions(file.getId());

        return new FileDTO(file, fileVersions);
    }
}

export default UpdateFileMultipartUseCase;

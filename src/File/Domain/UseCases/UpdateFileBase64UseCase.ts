import FileUpdateBase64Payload from '../Payloads/FileUpdateBase64Payload';
import IFileVersionDomain from '../Entities/IFileVersionDomain';
import FileService from '../Services/FileService';

class UpdateFileBase64UseCase
{
    private fileService = new FileService();

    async handle(payload: FileUpdateBase64Payload): Promise<any>
    {
        const { id } = payload;

        if (payload.isOptimize && payload.isImage)
        {
            payload = await this.fileService.optimizeBase64ToUpdate(payload);
        }

        let file: IFileVersionDomain = await this.fileService.getOneVersion(id);
        file = await this.fileService.update(file, payload);
        return await this.fileService.uploadFileBase64(file, payload);
    }
}

export default UpdateFileBase64UseCase;

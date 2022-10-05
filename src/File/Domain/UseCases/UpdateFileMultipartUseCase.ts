import FileUpdateMultipartPayload from '../Payloads/FileUpdateMultipartPayload';
import IFileVersionDomain from '../Entities/IFileVersionDomain';
import FileService from '../Services/FileService';

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

        let file: IFileVersionDomain = await this.fileService.getOneVersion(id);
        file = await this.fileService.update(file, payload);
        return await this.fileService.uploadFileMultipart(file, payload);
    }
}

export default UpdateFileMultipartUseCase;

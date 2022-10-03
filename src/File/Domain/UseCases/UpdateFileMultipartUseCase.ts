import FileUpdateMultipartPayload from '../Payloads/FileUpdateMultipartPayload';
import IFileDomain from '../Entities/IFileDomain';
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

        let file: IFileDomain = await this.fileService.getOne(id);
        file = await this.fileService.update(file, payload);
        return await this.fileService.uploadFileMultipart(file, payload);
    }
}

export default UpdateFileMultipartUseCase;

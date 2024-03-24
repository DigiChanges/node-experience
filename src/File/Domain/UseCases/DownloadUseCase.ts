import IFileVersionDTO from '../Models/IFileVersionDTO';
import FileService from '../Services/FileService';
import DownloadPayload from '../Payloads/DownloadPayload';
import DownloadSchemaValidation from '../Validations/DownloadSchemaValidation';
import ValidatorSchema from '../../../Main/Domain/Shared/ValidatorSchema';

class DownloadUseCase
{
    private fileService = new FileService();

    async handle(payload: DownloadPayload): Promise<IFileVersionDTO>
    {
        await ValidatorSchema.handle(DownloadSchemaValidation, payload);

        return await this.fileService.download(payload);
    }
}

export default DownloadUseCase;

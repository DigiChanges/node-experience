import IdPayload from '../../../Shared/Presentation/Requests/IdPayload';
import FileService from '../Services/FileService';
import IFileDTO from '../Models/IFileDTO';
import ValidatorSchema from '../../../Shared/Presentation/Shared/ValidatorSchema';
import IdSchemaValidation from '../../../Shared/Presentation/Validations/IdSchemaValidation';

class RemoveFileUseCase
{
    private fileService = new FileService();

    async handle(payload: IdPayload): Promise<IFileDTO>
    {
        await ValidatorSchema.handle(IdSchemaValidation, payload);

        const { id } = payload;
        return this.fileService.removeFileAndVersions(id);
    }
}

export default RemoveFileUseCase;

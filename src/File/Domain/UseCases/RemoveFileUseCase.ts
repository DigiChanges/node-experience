import { IdPayload } from '@digichanges/shared-experience';
import FileService from '../Services/FileService';
import IFileDTO from '../Models/IFileDTO';
import ValidatorSchema from '../../../Main/Domain/Shared/ValidatorSchema';
import IdSchemaValidation from '../../../Main/Domain/Validations/IdSchemaValidation';

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

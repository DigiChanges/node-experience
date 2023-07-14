import { IdPayload } from '@digichanges/shared-experience';
import FileService from '../Services/FileService';
import IFileDTO from '../Models/IFileDTO';
import ValidatorSchema from '../../../Main/Presentation/Utils/ValidatorSchema';
import IdSchemaValidation from '../../../Main/Presentation/Validations/IdSchemaValidation';

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

import PresignedFileRepPayload from '../Payloads/PresignedFileRepPayload';
import FileService from '../Services/FileService';
import ValidatorSchema from '../../../Main/Presentation/Utils/ValidatorSchema';
import PresignedFileSchemaValidation from '../../Presentation/Validations/PresignedFileSchemaValidation';

class GetPresignedGetObjectUseCase
{
    private fileService = new FileService();

    async handle(payload: PresignedFileRepPayload): Promise<string>
    {
        await ValidatorSchema.handle(PresignedFileSchemaValidation, payload);

        return this.fileService.getPresignedGetObject(payload);
    }
}

export default GetPresignedGetObjectUseCase;

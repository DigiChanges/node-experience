import PresignedFileRepPayload from '../Payloads/PresignedFileRepPayload';
import FileService from '../Services/FileService';
import PresignedFileSchemaValidation from '../Validations/PresignedFileSchemaValidation';
import ValidatorSchema from '../../../Main/Domain/Shared/ValidatorSchema';

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

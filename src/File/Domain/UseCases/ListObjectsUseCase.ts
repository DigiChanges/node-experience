import ListObjectsPayload from '../Payloads/ListObjectsPayload';
import FileService from '../Services/FileService';
import ValidatorSchema from '../../../Main/Presentation/Utils/ValidatorSchema';
import ListObjectsSchemaValidation from '../../Presentation/Validations/ListObjectsSchemaValidation';

class ListObjectsUseCase
{
    private fileService = new FileService();

    async handle(payload: ListObjectsPayload): Promise<any>
    {
        await ValidatorSchema.handle(ListObjectsSchemaValidation, payload);

        return await this.fileService.listObjects(payload);
    }
}

export default ListObjectsUseCase;

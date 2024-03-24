import FileService from '../Services/FileService';
import FileDTO from '../Models/FileDTO';
import IFileDTO from '../Models/IFileDTO';
import ValidatorSchema from '../../../Main/Domain/Shared/ValidatorSchema';
import IdSchemaValidation from '../../../Main/Domain/Validations/IdSchemaValidation';
import { IdPayload } from '../../../Main/Domain/Payloads/IdPayload';

class GetFileMetadataUserCase
{
    private fileService = new FileService();

    async handle(payload: IdPayload): Promise<IFileDTO>
    {
        await ValidatorSchema.handle(IdSchemaValidation, payload);

        const { id } = payload;
        const file = await this.fileService.getOne(id);
        const fileVersions = await this.fileService.getVersions(id);

        return new FileDTO(file, fileVersions);
    }
}

export default GetFileMetadataUserCase;

import IdPayload from '../../../Shared/Presentation/Requests/IdPayload';
import FileService from '../Services/FileService';
import FileDTO from '../Models/FileDTO';
import IFileDTO from '../Models/IFileDTO';
import ValidatorSchema from '../../../Shared/Presentation/Shared/ValidatorSchema';
import IdSchemaValidation from '../../../Shared/Presentation/Validations/IdSchemaValidation';

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

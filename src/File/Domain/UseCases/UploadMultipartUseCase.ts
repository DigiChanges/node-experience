import FileMultipartRepPayload from '../../InterfaceAdapters/Payloads/FileMultipartRepPayload';
import IFileDomain from '../../InterfaceAdapters/IFileDomain';
import File from '../Entities/File';
import FileService from '../Services/FileService';

class UploadMultipartUseCase
{
    private fileService = new FileService();

    async handle(payload: FileMultipartRepPayload): Promise<any>
    {
        let file: IFileDomain = new File();
        file = await this.fileService.persist(file, payload);
        return await this.fileService.uploadFileMultipart(file, payload);
    }
}

export default UploadMultipartUseCase;

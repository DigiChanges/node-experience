import { filesystem } from '../../../index';
import MultipartRepPayload from '../../../InterfaceAdapters/Payloads/FileSystem/MultipartRepPayload';


class UploadMultipartUseCase
{
    async handle(payload: MultipartRepPayload): Promise<any>
    {
        return await filesystem.uploadFile(payload.file().originalname, payload.file().path);
    }
}

export default UploadMultipartUseCase;
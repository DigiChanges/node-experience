import { filesystem } from '../../../index';
import MultipartFileRepPayload from '../../../InterfaceAdapters/Payloads/FileSystem/MultipartFileRepPayload';

class UploadMultipartUseCase
{
    async handle(payload: MultipartFileRepPayload): Promise<any>
    {
        return await filesystem.uploadFile(payload.getFile().originalname, payload.getFile().path);
    }
}

export default UploadMultipartUseCase;
import { filesystem } from '../../../index';
import Base64FileRepPayload from '../../../InterfaceAdapters/Payloads/FileSystem/Base64FileRepPayload';


class UploadBase64UseCase
{
    async handle(payload: Base64FileRepPayload): Promise<any>
    {
        const filename = payload.getOriginalName() || 'uuidfilename';

        const buffer = payload.getBase64();

        return await filesystem.uploadFileByBuffer(filename, buffer);

    }
}

export default UploadBase64UseCase;
import { filesystem } from '../../../index';
import Base64FileRepPayload from '../../../InterfaceAdapters/Payloads/FileSystem/Base64FileRepPayload';


class UploadBase64UseCase
{
    async handle(payload: Base64FileRepPayload): Promise<any>
    {
        const filename = payload.getFilename() || 'uuidfilename';

        const fileExtension = filename.split(".").pop();

        const base64Payload = payload.getBase64();

        const mimeTypeKeys = base64Payload.split(";base64")[0].split("data:").pop();

        const buffer = base64Payload.split(";base64").pop();

        return await filesystem.uploadFileByBuffer(filename, buffer);

    }
}

export default UploadBase64UseCase;
import { filesystem } from '../../../index';
import Base64RepPayload from '../../../InterfaceAdapters/Payloads/FileSystem/Base64RepPayload';


class UploadBase64UseCase
{
    async handle(payload: Base64RepPayload): Promise<any>
    {
        const filename = payload.filename() || 'uuidfilename';

        const fileExtension = filename.split(".").pop();

        const base64File: { [key: string]: string; } = payload.base64();

        const mimeTypeKeys = Object.keys(base64File);

        if (Array.isArray( mimeTypeKeys ) && mimeTypeKeys.length > 0)
        {
            const key = mimeTypeKeys[0];

            const buffer = base64File[key];

            return await filesystem.uploadFileByBuffer(filename, buffer);
        }

        return false;
    }
}

export default UploadBase64UseCase;
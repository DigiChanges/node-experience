import { filesystem } from '../../../index';
import MultipartRepPayload from '../../../InterfaceAdapters/Payloads/FileSystem/MultipartRepPayload';


class UploadMultipartUseCase
{
    async handle(payload: MultipartRepPayload): Promise<any>
    {
        console.log(payload)
        // const filename = payload.filename() || 'uuidfilename';

        // const fileExtension = filename.split(".").pop();

        // const multipartFile: { [key: string]: string; } = payload.multipart();

        // const mimeTypeKeys = Object.keys(multipartFile);

        // if (Array.isArray( mimeTypeKeys ) && mimeTypeKeys.length > 0)
        // {
        //     const key = mimeTypeKeys[0];

        //     const buffer = multipartFile[key];

        //     return await filesystem.uploadFileByBuffer(filename, buffer);
        // }

        return payload;
    }
}

export default UploadMultipartUseCase;
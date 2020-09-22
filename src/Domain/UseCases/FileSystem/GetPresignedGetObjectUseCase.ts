import { filesystem } from '../../../index';
import PresignedFileRepPayload from '../../../InterfaceAdapters/Payloads/FileSystem/PresignedFileRepPayload';


class GetPresignedGetObjectUseCase
{
    async handle(payload: PresignedFileRepPayload): Promise<string>
    {
        const filename = payload.getName();

        return await filesystem.presignedGetObject(filename);

    }
}

export default GetPresignedGetObjectUseCase;
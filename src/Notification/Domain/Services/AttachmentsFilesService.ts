import PATH from 'path';
import EmailNotification from '../Entities/EmailNotification';
import IFilesAttachments from '../Entities/IFilesAttachments';
import { promises as fs, createWriteStream } from 'fs';
import Logger from '../../../Shared/Helpers/Logger';
import DependencyInjector from '../../../Shared/DI/DependencyInjector';
import { IFilesystem } from '../../../Main/Domain/Shared/IFilesystem';
import { FileVersionPayload } from '../../../File/Domain/Payloads/FileVersionPayload';

class AttachmentsFilesService
{
    static async getTempFilesAttachments(emailNotification: EmailNotification): Promise<IFilesAttachments[]>
    {
        const filesystem = DependencyInjector.inject<IFilesystem>('IFilesystem');

        const tempDir = PATH.join(__dirname, '../../../temp');
        await fs.mkdir(tempDir, { recursive: true });

        const attachedFiles = await Promise.all(emailNotification.attachedFiles.map(async(_file) =>
        {
            const stream = await filesystem.downloadStreamFile(_file as unknown as FileVersionPayload);
            const uqFileName = `${_file.name}.${_file.extension}`;
            const dirName = PATH.join(tempDir, uqFileName);
            const ws = createWriteStream(dirName);
            stream.pipe(ws);

            // Wait until the stream is finished
            await new Promise((resolve, reject) =>
            {
                ws.on('finish', resolve);
                ws.on('error', reject);
            });

            return {
                filename: `${_file.originalName}.${_file.extension}`,
                path: dirName,
                name: _file.name,
                extension: _file.extension,
                objectPath: _file.objectPath,
                originalName: _file.originalName
            };
        }));

        emailNotification.attachedFiles = attachedFiles;

        return attachedFiles;
    }

    static async unlinkTempFilesAttachments(tempFilesAttachments: IFilesAttachments[]): Promise<void>
    {
        if (tempFilesAttachments)
        {
            await Promise.all(tempFilesAttachments.map(async({ path }) =>
            {
                try
                {
                    await fs.unlink(path);
                }
                catch (err)
                {
                    Logger.error(`Error unlinking file ${path}:`, err);
                    throw err;
                }
            }));
        }
    }
}

export default AttachmentsFilesService;

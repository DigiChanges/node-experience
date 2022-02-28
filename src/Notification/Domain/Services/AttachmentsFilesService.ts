import PATH from 'path';
import FilesystemFactory from '../../../Shared/Factories/FilesystemFactory';
import EmailNotification from '../Entities/EmailNotification';
import IFilesAttachments from '../../InterfaceAdapters/IFilesAttachments';
import { createWriteStream, existsSync, mkdirSync, writeFile } from 'fs-extra';
import { unlink } from 'fs';

class AttachmentsFilesService
{
    static async  getTempFilesAttachments(emailNotification: EmailNotification): Promise<IFilesAttachments[]>
    {
        const filesystem = FilesystemFactory.create();

        emailNotification.tempFilesAttachments =  await Promise.all(emailNotification.attachedFiles.map(async(_file) =>
        {
            const stream = await filesystem.downloadStreamFile(_file);
            const fileName = `${_file.originalName}.${_file.extension}`;
            const uqFileName = `${_file.name}.${_file.extension}`;
            const tempDir = PATH.join(`${__dirname}/../../../temp`);
            const dirName = PATH.join(`${tempDir}/${uqFileName}`);
            // eslint-disable-next-line no-unused-expressions
            !existsSync(tempDir) && mkdirSync(tempDir);
            void await writeFile(dirName, '01011');
            const ws = createWriteStream(dirName);
            stream.pipe(ws);

            return {
                filename: fileName,
                path:dirName
            };
        }));

        return emailNotification.tempFilesAttachments;
    }

    static unlinkTempFilesAttachments(tempFilesAttachments: IFilesAttachments[]): void
    {
        if (tempFilesAttachments)
        {
            tempFilesAttachments.map(({ path }) =>
            {
                unlink(path, (err) =>
                {
                    if (err)
                    {
                        throw err;
                    }
                });
            });
        }
    }
}

export default AttachmentsFilesService;

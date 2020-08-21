
import { Client } from 'minio';
import Fs from 'fs';

import ErrorException from "../../Application/Shared/ErrorException";
import StatusCode from "../../Presentation/Shared/StatusCode";
import IFilesystem from "../../InterfaceAdapters/Shared/IFilesystem";
import moment from "moment";
import internal from "stream";

class S3Strategy implements IFilesystem
{
    private readonly filesystem: Client = null;
    private readonly bucketName: string;
    private pathTemp: string;

    constructor(_config: any)
    {
        this.bucketName = _config.bucket;
        this.pathTemp = '/tmp/';

        this.filesystem = new Client({
              endPoint: _config.endPoint,
              accessKey: _config.accessKey,
              secretKey: _config.secretKey,
              port: Number(_config.port),
              useSSL: _config.useSSL === 'true',
        });
    }

    async uploadFileByBuffer(objectName: string, base64Data: string)
    {
        const buffer = Buffer.from(base64Data, 'base64');

        return await this.filesystem.putObject(this.bucketName, objectName, buffer);
    }

    async downloadFile(objectName: string): Promise<string>
    {
        const filePath = this.pathTemp + objectName;

        await this.filesystem.fGetObject(this.bucketName, objectName, filePath);

        return filePath;
    }

    getClient(): any
    {
        return this.filesystem;
    }

  //
  //   async viewFile(fileName: any)
  //   {
  //       const filePath= 'sampleFile/${fileName}.pdf'
  //       return await this.filesystem.viewLink({object: filePath}, false);
  //   }
  //
  //   async listFilesList()
  //   {
  //       const baseUrl= 'sampleFile/';
  //
  //       return await this.filesystem.listDirectoryObjects({ object: baseUrl });
  //   }
  //
  //   async downloadFile(req: any, res: any, name: any)
  //   {
  //       const extension = name.split('.').pop().toLowerCase();
  //
  //       const file = {
  //           object: 'sampleFiles/',
  //           name: `${name}_${
  //             moment().format('YYYY-DD-MM')}.${extension}`,
  //         };
  //
  //       return this.filesystem.downloadLinkBase(file)
  //           .then((downloadLink: any) => res.redirect(downloadLink));
  //   }
  //
  //   async ValidateAndDownloadFile(req: any, res: any, name: any)
  //   {
  //           const file = {
  //               object: 'sampleFiles/',
  //               name: `${name}_${
  //                 moment().format('YYYY-DD-MM')}.asd`,
  //             };
  //
  //           return this.filesystem.downloadLink(file)
  //               .then((downloadLink: any) => res.redirect(downloadLink));
  //   }
  //
  //   async retryFileFromServer(fileName: any)
  //   {
  //       const retryObject = fileName.path.toLowerCase();
  //       const name = `${fileName}.pdf`.replace(/ /g, '_');
  //
  //       const url = await this.filesystem.retryDownloadLink({
  //           name,
  //           retryObject,
  //           object: retryObject.replace(/\.pdf$/g, '-rst.pdf'),
  //       });
  //
  //       return url;
  //   }
  //
  //   async getUploadLink()
  //   {
  //       return await this.filesystem.uploadLink({});
  //   }
  //
  //   async uploadFromTemp(file: any)
  //   {
  //       const extension = (file.name || file.filename).split('.').pop().toLowerCase();
  //
  //       let minioObject = {
  //           base64String: file.base64,
  //           temp: file.path,
  //           object: `sample/asd_${moment().format('DD-MM-YYYY_hh-mm-ss-a')}.${extension}`,
  //       };
  //
  //       return await this.filesystem.uploadTemp(minioObject);
  //   }

}

export default S3Strategy;
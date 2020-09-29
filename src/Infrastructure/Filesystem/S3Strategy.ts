
import { Client, ItemBucketMetadata } from 'minio';
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
    private readonly pathTemp: string;

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
    async presignedGetObject(objectName: string): Promise<string> {

        return await this.filesystem.presignedGetObject(this.bucketName, objectName, 24 * 60 * 60);
    }

    async uploadFile(objectName: string, path: string)
    {
        return await this.filesystem.fPutObject(this.bucketName, objectName, path, {})
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

    async downloadStreamFile(objectName: string): Promise<internal.Readable>
    {
        return await this.filesystem.getObject(this.bucketName, objectName);
    }

    async listObjects(prefix?: string, recursive?: boolean)
    {
        const stream = this.filesystem.listObjectsV2(this.bucketName, prefix, recursive) ;

        return new Promise((resolve, reject) => {
            const files: any = [];

            stream.on('data', (obj: any) => {
                files.push(obj);
            } )

            stream.on('end', () => resolve(files));

            stream.on('close', () => resolve(files));

            stream.on('error', (error: any) => reject(error));
        })

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
import { SuperAgentTest } from 'supertest';
import initTestServer from '../../initTestServer';
import { UploadFileBase64 } from './fixture';
import { IFileResponse } from './types';
import ICreateConnection from '../../Main/Infrastructure/Database/ICreateConnection';
import * as path from 'path';
import fs from 'fs';

describe('Start File Test', () =>
{
    let request: SuperAgentTest;
    let dbConnection: ICreateConnection;
    let file_id = '';

    beforeAll(async() =>
    {
        const configServer = await initTestServer();

        request = configServer.request;
        dbConnection = configServer.dbConnection;
    });

    afterAll((async() =>
    {
        await dbConnection.drop();
        await dbConnection.close();
    }));

    describe('File Success', () =>
    {
        test('Upload File /files/base64', async() =>
        {
            const response: IFileResponse = await request
                .post('/api/files/base64')
                .set('Accept', 'application/json')
                .send(UploadFileBase64);

            const { body: { data } } = response;

            expect(response.statusCode).toStrictEqual(201);
            expect(data.currentVersion).toStrictEqual(1);
        });

        test('Upload File /files', async() =>
        {
            const filePath = path.join(__dirname, 'test_file.json');
            const fileStream = fs.createReadStream(filePath);

            const response: IFileResponse = await request
                .post('/api/files?isOriginalName=true&isPublic=false&isOptimize=false')
                .attach('file', fileStream);

            const { body: { data } } = response;

            expect(response.statusCode).toStrictEqual(201);
            expect(data.currentVersion).toStrictEqual(1);

            file_id = data.id;
        });

        test('Get File /files/metadata/:id', async() =>
        {
            const response = await request
                .get(`/api/files/metadata/${file_id}`)
                .set('Accept', 'application/json')
                .send();

            const { body: { data } } = response;

            expect(response.statusCode).toStrictEqual(200);
            expect(data.id).toStrictEqual(file_id);
        });

        test('Update File /file/base64/:id', async() =>
        {
            const response: IFileResponse = await request
                .put(`/api/files/base64/${file_id}`)
                .set('Accept', 'application/json')
                .send(UploadFileBase64);

            const { body: { data } } = response;

            expect(response.statusCode).toStrictEqual(201);
            expect(data.currentVersion).toStrictEqual(2);
        });

        test('Get presigned File /file/presigned-get-object', async() =>
        {
            const response = await request
                .post('/api/files/presigned-get-object')
                .set('Accept', 'application/json')
                .send({
                    file: `${file_id}`,
                    version: 1,
                    expiry: 241921
                });


            const { body: { data } } = response;

            expect(response.statusCode).toStrictEqual(200);
            expect(data.presignedGetObject).toBeDefined();
        });

        test('Get Files /files', async() =>
        {
            const response = await request
                .get('/api/files?pagination[limit]=30&pagination[offset]=0')
                .set('Accept', 'application/json')
                .send();

            expect(response.statusCode).toStrictEqual(200);
        });

        test('Get Objects /files/objects', async() =>
        {
            const response = await request
                .get('/api/files/objects')
                .set('Accept', 'application/json')
                .send();

            const { body: { data } } = response;

            expect(response.statusCode).toStrictEqual(200);
        });

        test('Get Objects /files/objects with params', async() =>
        {
            const response = await request
                .get('/api/files/objects?recursive=true&prefix=true')
                .set('Accept', 'application/json')
                .send();

            const { body: { data } } = response;

            expect(response.statusCode).toStrictEqual(200);
        });

        test('Delete file /files/:id', async() =>
        {
            const response = await request
                .delete(`/api/files/${file_id}`)
                .set('Accept', 'application/json')
                .send();

            const { body: { data } } = response;

            expect(response.statusCode).toStrictEqual(201);
        });
    });

    describe('File Failed', () =>
    {
        test('Upload File /files', async() =>
        {
            const response: IFileResponse = await request
                .post('/api/files')
                .set('Accept', 'application/json')
                .send();

            expect(response.statusCode).toStrictEqual(500);
        });

        test('Upload File /files', async() =>
        {
            const response: IFileResponse = await request
                .post('/api/files?isOriginalName=true&isPublic=false&isOptimize=false')
                .attach('file', null);

            const { body: { data } } = response;

            expect(response.statusCode).toStrictEqual(500);
        });

        test('Upload File /files/base64', async() =>
        {
            const response: IFileResponse = await request
                .post('/api/files/base64')
                .set('Accept', 'application/json')
                .send();

            expect(response.statusCode).toStrictEqual(500);
        });

        test('Get File /files/metadata/:id', async() =>
        {
            const response = await request
                .get('/api/files/metadata/123456')
                .set('Accept', 'application/json')
                .send();

            const { body } = response;

            expect(response.statusCode).toStrictEqual(422);
            expect(body.message).toStrictEqual('Request Failed.');
            expect(body.errors[0].message).toStrictEqual('Invalid uuid');
        });

        test('Update File /file/base64/:id', async() =>
        {
            const response = await request
                .put('/api/files/base64/123456')
                .set('Accept', 'application/json')
                .send(UploadFileBase64);

            const { body } = response;

            expect(response.statusCode).toStrictEqual(422);
            expect(body.message).toStrictEqual('Request Failed.');
            expect(body.errors[0].message).toStrictEqual('Invalid uuid');
        });

        test('Get presigned File /file/presigned-get-object', async() =>
        {
            const response = await request
                .post('/api/files/presigned-get-object')
                .set('Accept', 'application/json')
                .send({
                    file: '123456acd',
                    version: null,
                    expiry: 1
                });


            const { body } = response;

            expect(response.statusCode).toStrictEqual(422);
            expect(body.message).toStrictEqual('Request Failed.');
            expect(body.errors[0].message).toStrictEqual('Invalid uuid');
            expect(body.errors[1].message).toStrictEqual('Number must be greater than or equal to 241920');
            expect(body.errors[2].message).toStrictEqual('Expected number, received null');
        });
    });
});


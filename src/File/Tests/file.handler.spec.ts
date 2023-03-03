import { SuperAgentTest } from 'supertest';
import initTestServer from '../../initTestServer';
import FilesystemFactory from '../../Shared/Factories/FilesystemFactory';
import { ILoginResponse } from '../../Shared/InterfaceAdapters/Tests/ILogin';
import { UploadFileBase64 } from './fixture';
import MockMinioStrategy from './MockMinioStrategy';
import { IFileResponse } from './types';
import ICreateConnection from '../../Shared/Infrastructure/Database/ICreateConnection';

describe('Start File Test', () =>
{
    let request: SuperAgentTest;
    let dbConnection: ICreateConnection;
    let token: string = null;
    let file_id = '';

    beforeAll(async() =>
    {
        const configServer = await initTestServer();

        request = configServer.request;
        dbConnection = configServer.dbConnection;

        jest.spyOn(FilesystemFactory, 'create').mockImplementation(() => new MockMinioStrategy());
    });

    afterAll((async() =>
    {
        await dbConnection.drop();
        await dbConnection.close();
    }));

    describe('File Success', () =>
    {
        beforeAll(async() =>
        {
            const payload = {
                email: 'user@node.com',
                password: '12345678'
            };

            const response: ILoginResponse = await request
                .post('/api/auth/login?provider=local')
                .set('Accept', 'application/json')
                .send(payload);

            const { body: { data } } = response;

            token = data.token;
        });

        test('Add File /files/base64', async() =>
        {
            const response: IFileResponse = await request
                .post('/api/files/base64')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(UploadFileBase64);

            const { body: { data } } = response;

            expect(response.statusCode).toStrictEqual(201);
            expect(data.currentVersion).toStrictEqual(1);
            expect(data.versions.length).toStrictEqual(1);

            file_id = data.id;
        });

        test('Get File /files/metadata/:id', async() =>
        {
            const response = await request
                .get(`/api/files/metadata/${file_id}`)
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
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
                .set('Authorization', `Bearer ${token}`)
                .send(UploadFileBase64);

            const { body: { data } } = response;

            expect(response.statusCode).toStrictEqual(201);
            expect(data.currentVersion).toStrictEqual(2);
            expect(data.versions.length).toStrictEqual(2);
        });
    });
});


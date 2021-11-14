import { ICreateConnection } from '@digichanges/shared-experience';
import { SuperAgentTest } from 'supertest';
import initTestServer from '../../initTestServer';
import FilesystemFactory from '../../Shared/Factories/FilesystemFactory';
import { ILoginResponse } from '../../Shared/InterfaceAdapters/Tests/ILogin';
import { UploadFileBase64 } from './fixture';
import MockMinioStrategy from './MockMinioStrategy';
import { IFileResponse } from './types';

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

            const { body: { status, statusCode, data } } = response;

            expect(response.statusCode).toStrictEqual(201);
            expect(status).toStrictEqual('success');
            expect(statusCode).toStrictEqual('HTTP_CREATED');

            expect(data.originalName).toStrictEqual('photo');
            expect(data.extension).toStrictEqual('jpg');
            expect(data.mimeType).toStrictEqual('image/jpeg');
            file_id = data.id;

        });

        test('Get File /files/metadata/:id', async() =>
        {
            const payload = {
                originalName: 'photo',
                extension: 'jpg',
                mimeType: 'image/jpeg'
            };

            const response: IFileResponse = await request
                .get(`/api/files/metadata/${file_id}`)
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send();

            const { body: { status, statusCode, data } } = response;

            expect(response.statusCode).toStrictEqual(200);
            expect(status).toStrictEqual('success');
            expect(statusCode).toStrictEqual('HTTP_OK');

            expect(data.originalName).toStrictEqual(payload.originalName);
            expect(data.extension).toStrictEqual(payload.extension);
            expect(data.mimeType).toStrictEqual(payload.mimeType);

        });

        // test('Get File /files/:id', async () =>
        // {
        //     const response: any = await request
        //         .get(`/api/files/${fileId}`)
        //         .set('Accept', 'application/json')
        //         .set('Authorization', `Bearer ${token}`)
        //         .send();
        //
        //     const {body: {status, statusCode}} = response;
        //
        //     expect(response.statusCode).toStrictEqual(200);
        //     expect(status).toStrictEqual('success');
        //     expect(statusCode).toStrictEqual('HTTP_OK');
        //
        // });
        //
        // test('Update Item /items/:id', async () =>
        // {
        //     const payload = {
        //         name: 'Item 1 update',
        //         type: 11
        //     };
        //
        //     const response: any = await request
        //         .put(`/api/items/${fileId}`)
        //         .set('Accept', 'application/json')
        //         .set('Authorization', `Bearer ${token}`)
        //         .send(payload);
        //
        //     const {body: {status, statusCode, data}} = response;
        //
        //     expect(response.statusCode).toStrictEqual(201);
        //     expect(status).toStrictEqual('success');
        //     expect(statusCode).toStrictEqual('HTTP_CREATED');
        //
        //     expect(data.name).toStrictEqual(payload.name);
        //     expect(data.type).toStrictEqual(payload.type);
        //
        // });
        //
        // test('Delete Item /items/:id', async () =>
        // {
        //     const payload = {
        //         name: 'Item 13 for delete',
        //         type: 13
        //     };
        //
        //     const createResponse: any = await request
        //         .post('/api/items')
        //         .set('Accept', 'application/json')
        //         .set('Authorization', `Bearer ${token}`)
        //         .send(payload);
        //
        //     deleteResponse = await request
        //         .delete(`/api/items/${createResponse.body.data.id}`)
        //         .set('Accept', 'application/json')
        //         .set('Authorization', `Bearer ${createResponse.body.metadata.refreshToken}`)
        //         .send();
        //
        //     const {body: {status, statusCode, data}} = deleteResponse;
        //
        //     expect(deleteResponse.statusCode).toStrictEqual(200);
        //     expect(status).toStrictEqual('success');
        //     expect(statusCode).toStrictEqual('HTTP_OK');
        //
        //     expect(data.name).toStrictEqual(payload.name);
        //     expect(data.type).toStrictEqual(payload.type);
        //
        // });
        //
        // test('Get Items /items', async () =>
        // {
        //
        //     const response: any = await request
        //         .get('/api/items?pagination[limit]=5&pagination[offset]=0')
        //         .set('Accept', 'application/json')
        //         .set('Authorization', `Bearer ${token}`)
        //         .send();
        //
        //     const {body: {status, statusCode, data, pagination}} = response;
        //
        //     expect(response.statusCode).toStrictEqual(200);
        //     expect(status).toStrictEqual('success');
        //     expect(statusCode).toStrictEqual('HTTP_OK');
        //
        //     expect(data.length).toStrictEqual(5);
        //     expect(pagination.total).toStrictEqual(5);
        //     expect(pagination.currentUrl).toContain('/api/items?pagination[limit]=5&pagination[offset]=0');
        //     expect(pagination.nextUrl).toContain('/api/items?pagination[limit]=5&pagination[offset]=5');
        //
        // });
        //
        // test('Get Items /items without pagination', async () =>
        // {
        //
        //     const response: any = await request
        //         .get('/api/items')
        //         .set('Accept', 'application/json')
        //         .set('Authorization', `Bearer ${token}`)
        //         .send();
        //
        //     const {body: {status, statusCode, data, pagination}} = response;
        //
        //     expect(response.statusCode).toStrictEqual(200);
        //     expect(status).toStrictEqual('success');
        //     expect(statusCode).toStrictEqual('HTTP_OK');
        //
        //     expect(data.length).toStrictEqual(11);
        //     expect(pagination).not.toBeDefined();
        //
        // });
        //
        // test('Get Items /items with Filter Type', async () =>
        // {
        //
        //     const response: any = await request
        //         .get('/api/items?pagination[limit]=20&pagination[offset]=0&filter[type]=11')
        //         .set('Accept', 'application/json')
        //         .set('Authorization', `Bearer ${token}`)
        //         .send();
        //
        //     const {body: {status, statusCode, data, pagination}} = response;
        //
        //     expect(response.statusCode).toStrictEqual(200);
        //     expect(status).toStrictEqual('success');
        //     expect(statusCode).toStrictEqual('HTTP_OK');
        //
        //     expect(data.length).toStrictEqual(1);
        //     expect(pagination.total).toStrictEqual(1);
        //
        //     expect(data[0].type).toStrictEqual(11);
        //
        // });
        //
        // test('Get Items /items with Sort Desc Type', async () =>
        // {
        //
        //     const response: any = await request
        //         .get('/api/items?pagination[limit]=20&pagination[offset]=0&sort[type]=desc')
        //         .set('Accept', 'application/json')
        //         .set('Authorization', `Bearer ${token}`)
        //         .send();
        //
        //     const {body: {status, statusCode, data: [item1, item2]}} = response;
        //
        //     expect(response.statusCode).toStrictEqual(200);
        //     expect(status).toStrictEqual('success');
        //     expect(statusCode).toStrictEqual('HTTP_OK');
        //
        //     expect(item1.type).toBeGreaterThanOrEqual(item2.type);
        //
        // });
    });

    // describe('Item Fails', () =>
    // {
    //     beforeAll(async() =>
    //     {
    //         const payload = {
    //             email: 'user@node.com',
    //             password: '12345678'
    //         };
    //
    //         const response: any = await request
    //             .post('/api/auth/login?provider=local')
    //             .set('Accept', 'application/json')
    //             .send(payload);
    //
    //         const {body: {data}} = response;
    //
    //         token = data.token;
    //
    //     });
    //
    //     test('Add File /files/base64', async () =>
    //     {
    //         const response: any = await request
    //             .post('/api/items')
    //             .set('Accept', 'application/json')
    //             .set('Authorization', `Bearer ${token}`)
    //             .send(UploadFileBase64);
    //
    //         const {body: {status, statusCode, message, errors: [error]}} = response;
    //
    //         expect(response.statusCode).toStrictEqual(422);
    //         expect(status).toStrictEqual('error');
    //         expect(statusCode).toStrictEqual('HTTP_UNPROCESSABLE_ENTITY');
    //         expect(message).toStrictEqual('Failed Request.');
    //
    //         expect(error.property).toStrictEqual('type');
    //         expect(error.constraints.isInt).toStrictEqual('type must be an integer number');
    //
    //     });
    //
    //     test('Get Item /items/:id', async () =>
    //     {
    //
    //         const response: any = await request
    //             .get(`/api/items/${fileId}dasdasda123`)
    //             .set('Accept', 'application/json')
    //             .set('Authorization', `Bearer ${token}`)
    //             .send();
    //
    //         const {body: {status, statusCode, message, errors: [error]}} = response;
    //
    //         expect(response.statusCode).toStrictEqual(422);
    //         expect(status).toStrictEqual('error');
    //         expect(statusCode).toStrictEqual('HTTP_UNPROCESSABLE_ENTITY');
    //         expect(message).toStrictEqual('Failed Request.');
    //
    //         expect(error.property).toStrictEqual('id');
    //         expect(error.constraints.isUuid).toBeDefined();
    //         expect(error.constraints.isUuid).toStrictEqual('id must be an UUID');
    //
    //     });
    //
    //     test('Update Item /items/:id', async () =>
    //     {
    //         const payload = {
    //             name: 11,
    //             type: 'asdasd'
    //         };
    //
    //         const response: any = await request
    //             .put(`/api/items/${fileId}`)
    //             .set('Accept', 'application/json')
    //             .set('Authorization', `Bearer ${token}`)
    //             .send(payload);
    //
    //         const {body: {status, statusCode, message, errors: [errorName, errorType]}} = response;
    //
    //         expect(response.statusCode).toStrictEqual(422);
    //         expect(status).toStrictEqual('error');
    //         expect(statusCode).toStrictEqual('HTTP_UNPROCESSABLE_ENTITY');
    //         expect(message).toStrictEqual('Failed Request.');
    //
    //         expect(errorName.property).toStrictEqual('name');
    //         expect(errorName.constraints.isString).toBeDefined();
    //         expect(errorName.constraints.isString).toStrictEqual('name must be a string');
    //
    //         expect(errorType.property).toStrictEqual('type');
    //         expect(errorType.constraints.isInt).toBeDefined();
    //         expect(errorType.constraints.isInt).toStrictEqual('type must be an integer number');
    //
    //     });
    //
    //     test('Delete Item error /items/:id', async () =>
    //     {
    //
    //         const deleteErrorResponse: any = await request
    //             .delete(`/api/items/${deleteResponse.body.data.id}`)
    //             .set('Accept', 'application/json')
    //             .set('Authorization', `Bearer ${token}`)
    //             .send();
    //
    //         const {body: {status, statusCode, message}} = deleteErrorResponse;
    //
    //         expect(deleteErrorResponse.statusCode).toStrictEqual(400);
    //         expect(status).toStrictEqual('error');
    //         expect(statusCode).toStrictEqual('HTTP_BAD_REQUEST');
    //         expect(message).toStrictEqual('Item not found.');
    //
    //     });
    // });
});


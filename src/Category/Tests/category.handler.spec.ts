import { SuperAgentTest } from 'supertest';
import initTestServer from '../../initTestServer';
import { ILoginResponse } from '../../Shared/InterfaceAdapters/Tests/ILogin';
import { ICategoryResponse, IListCategoryResponse } from './types';
import MainConfig from '../../Config/MainConfig';
import ICreateConnection from '../../Shared/Infrastructure/Database/ICreateConnection';

describe('Start Category Test', () =>
{
    let request: SuperAgentTest;
    let dbConnection: ICreateConnection;
    let token: string = null;
    let categoryId = '';
    let deleteResponse: any = null;

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

    describe('Category Success', () =>
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

        test('Add Category /category', async() =>
        {
            const payload = {
                title: 'Category 1',
                enable: true
            };

            const response: ICategoryResponse = await request
                .post('/api/category')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(payload);

            const { body: { data } } = response;

            expect(response.statusCode).toStrictEqual(201);

            categoryId = data.id;
        });

        test('Get Category /category/:id', async() =>
        {
            const payload = {
                title: 'Category 1',
                enable: true
            };

            const response: ICategoryResponse = await request
                .get(`/api/category/${categoryId}`)
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send();

            const { body: { data } } = response;

            expect(response.statusCode).toStrictEqual(200);

            expect(data.title).toStrictEqual(payload.title);
            expect(data.enable).toStrictEqual(payload.enable);
        });

        test('Update Category /category/:id', async() =>
        {
            const payload = {
                title: 'category 1 update',
                enable: true
            };

            const response: ICategoryResponse = await request
                .put(`/api/category/${categoryId}`)
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(payload);

            const { body: { data } } = response;

            expect(data.title).toBeDefined();
            expect(response.statusCode).toStrictEqual(201);
        });

        test('Delete Category /category/:id', async() =>
        {
            const payload = {
                title: 'Category 13 for delete',
                enable: true
            };

            const createResponse: ICategoryResponse = await request
                .post('/api/category')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(payload);

            deleteResponse = await request
                .delete(`/api/category/${createResponse.body.data.id}`)
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send();

            const { body: { data } } = deleteResponse;

            expect(deleteResponse.statusCode).toStrictEqual(201);

            expect(data.title).toStrictEqual(payload.title);
            expect(data.enable).toStrictEqual(payload.enable);
        });

        test('Get Categories /category', async() =>
        {
            const config = MainConfig.getInstance();

            const response: IListCategoryResponse = await request
                .get('/api/category?pagination[offset]=0&pagination[limit]=5')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send();

            const { body: { data, pagination } } = response;

            expect(response.statusCode).toStrictEqual(200);

            expect(data.length).toStrictEqual(5);
            expect(pagination.total).toStrictEqual(11);
            expect(pagination.perPage).toStrictEqual(5);
            expect(pagination.currentPage).toStrictEqual(1);
            expect(pagination.lastPage).toStrictEqual(3);
            expect(pagination.from).toStrictEqual(0);
            expect(pagination.to).toStrictEqual(5);
            expect(pagination.path).toContain(config.getConfig().url.urlApi);
            expect(pagination.firstUrl).toContain('/api/category?pagination[offset]=0&pagination[limit]=5');
            expect(pagination.lastUrl).toContain('/api/category?pagination[offset]=10&pagination[limit]=5');
            expect(pagination.nextUrl).toContain('/api/category?pagination[offset]=5&pagination[limit]=5');
            expect(pagination.prevUrl).toStrictEqual(null);
            expect(pagination.currentUrl).toContain('/api/category?pagination[offset]=0&pagination[limit]=5');
        });

        test('Get Categories /category without pagination', async() =>
        {
            const response: IListCategoryResponse = await request
                .get('/api/category')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send();

            const { body: { data, pagination } } = response;

            expect(response.statusCode).toStrictEqual(200);

            expect(data.length).toStrictEqual(11);
            expect(pagination).not.toBeDefined();
        });

        test('Get Categories /category with Filter Type', async() =>
        {
            const response: IListCategoryResponse = await request
                .get('/api/category?pagination[limit]=20&pagination[offset]=0&filter[type]=11')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send();

            const { body: { data, pagination } } = response;

            expect(response.statusCode).toStrictEqual(200);

            expect(data.length).toStrictEqual(1);
            expect(pagination.total).toStrictEqual(1);

            expect(data[0].enable).toStrictEqual(true);
        });

        test('Get Categories /category with Sort Desc Type', async() =>
        {
            const response: IListCategoryResponse = await request
                .get('/api/category?pagination[limit]=20&pagination[offset]=0&sort[type]=desc')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send();

            const { body: { data: [category1, category2] } } = response;

            expect(response.statusCode).toStrictEqual(200);

            expect(category1.enable).toStrictEqual(category2.enable);
        });
    });

    describe('Category Fails', () =>
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

        test('Add Category /category', async() =>
        {
            const payload = {
                title: 'Category 2',
                enable: true
            };

            const response: ICategoryResponse = await request
                .post('/api/categoty')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(payload);

            const { body: { message, errors: [error] } } = response;

            expect(response.statusCode).toStrictEqual(422);
            expect(message).toStrictEqual('Request Failed.');

            expect(error.code).toStrictEqual('invalid_type');
            expect(error.message).toStrictEqual('Expected number, received string');
        });

        test('Get Category /caterory/:id', async() =>
        {
            const response: ICategoryResponse = await request
                .get(`/api/category/${categoryId}dasdasda123`)
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send();

            const { body: { message, errors: [error] } } = response;

            expect(response.statusCode).toStrictEqual(422);
            expect(message).toStrictEqual('Request Failed.');

            expect(error.code).toStrictEqual('invalid_string');
            expect(error.message).toStrictEqual('Invalid uuid');
        });

        test('Update Category /category/:id', async() =>
        {
            const payload = {
                title: 11,
                enable: 'test'
            };

            const response: ICategoryResponse = await request
                .put(`/api/category/${categoryId}`)
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(payload);

            const { body: { message, errors: [errorName, errorType] } } = response;

            expect(response.statusCode).toStrictEqual(422);
            expect(message).toStrictEqual('Request Failed.');

            expect(errorName.code).toStrictEqual('invalid_type');
            expect(errorName.message).toStrictEqual('Expected string, received number');

            expect(errorType.code).toStrictEqual('invalid_type');
            expect(errorType.message).toStrictEqual('Expected number, received string');
        });

        test('Delete Category error /category/:id', async() =>
        {
            const deleteErrorResponse: ICategoryResponse = await request
                .delete(`/api/category/${deleteResponse.body.data.id}`)
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send();

            const { body: { message } } = deleteErrorResponse;

            expect(deleteErrorResponse.statusCode).toStrictEqual(400);
            expect(message).toStrictEqual('Category not found.');
        });
    });
});


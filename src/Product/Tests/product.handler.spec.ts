import { SuperAgentTest } from 'supertest';
import initTestServer from '../../initTestServer';
import { ILoginResponse } from '../../Shared/InterfaceAdapters/Tests/ILogin';
import { IProductResponse, IListProductResponse } from './types';
import MainConfig from '../../Config/MainConfig';
import ICreateConnection from '../../Shared/Infrastructure/Database/ICreateConnection';

describe('Start Product Test', () =>
{
    let request: SuperAgentTest;
    let dbConnection: ICreateConnection;
    let token: string = null;
    let productId = '';
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

    describe('Product Success', () =>
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

        test('Add Product /product', async() =>
        {
            const payload = {
                title: 'Product 1',
                price: 10
            };

            const response: IProductResponse = await request
                .post('/api/product')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(payload);

            const { body: { data } } = response;

            expect(response.statusCode).toStrictEqual(201);

            productId = data.id;
        });

        test('Get Product /product/:id', async() =>
        {
            const payload = {
                title: 'Product 1',
                price: 10
            };

            const response: IProductResponse = await request
                .get(`/api/product/${productId}`)
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send();

            const { body: { data } } = response;

            expect(response.statusCode).toStrictEqual(200);

            expect(data.title).toStrictEqual(payload.title);
            expect(data.price).toStrictEqual(payload.price);
        });

        test('Update Product /product/:id', async() =>
        {
            const payload = {
                title: 'Product 1 update',
                price: 10
            };

            const response: IProductResponse = await request
                .put(`/api/product/${productId}`)
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(payload);

            const { body: { data } } = response;

            expect(data.title).toBe(payload.title);
            expect(response.statusCode).toStrictEqual(201);
        });

        test('Delete Product /product/:id', async() =>
        {
            const payload = {
                title: 'Product 13 for delete',
                price: 13
            };

            const createResponse: IProductResponse = await request
                .post('/api/product')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(payload);

            deleteResponse = await request
                .delete(`/api/product/${createResponse.body.data.id}`)
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send();

            const { body: { data } } = deleteResponse;

            expect(deleteResponse.statusCode).toStrictEqual(201);

            expect(data.title).toStrictEqual(payload.title);
            expect(data.price).toStrictEqual(payload.price);
        });

        test('Get Product /product', async() =>
        {
            const config = MainConfig.getInstance();

            const response: IListProductResponse = await request
                .get('/api/product?pagination[offset]=0&pagination[limit]=5')
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
            expect(pagination.firstUrl).toContain('/api/product?pagination[offset]=0&pagination[limit]=5');
            expect(pagination.lastUrl).toContain('/api/product?pagination[offset]=10&pagination[limit]=5');
            expect(pagination.nextUrl).toContain('/api/product?pagination[offset]=5&pagination[limit]=5');
            expect(pagination.prevUrl).toStrictEqual(null);
            expect(pagination.currentUrl).toContain('/api/product?pagination[offset]=0&pagination[limit]=5');
        });

        test('Get Product /product without pagination', async() =>
        {
            const response: IListProductResponse = await request
                .get('/api/product')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send();

            const { body: { data, pagination } } = response;

            expect(response.statusCode).toStrictEqual(200);

            expect(data.length).toStrictEqual(11);
            expect(pagination).not.toBeDefined();
        });

        test('Get Product /product with Filter Type', async() =>
        {
            const response: IListProductResponse = await request
                .get('/api/product?pagination[limit]=20&pagination[offset]=0&filter[type]=11')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send();

            const { body: { data, pagination } } = response;

            expect(response.statusCode).toStrictEqual(200);

            expect(data.length).toStrictEqual(1);
            expect(pagination.total).toStrictEqual(1);
        });

        test('Get Product /product with Sort Desc Type', async() =>
        {
            const response: IListProductResponse = await request
                .get('/api/product?pagination[limit]=20&pagination[offset]=0&sort[type]=desc')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send();

            const { body: { data: [item1, item2] } } = response;

            expect(response.statusCode).toStrictEqual(200);
        });
    });

    describe('Product Fails', () =>
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

        test('Add Product /product', async() =>
        {
            const payload = {
                title: 11,
                price: 'Product 1'
            };

            const response: IProductResponse = await request
                .post('/api/product')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(payload);

            const { body: { message, errors: [error] } } = response;

            expect(response.statusCode).toStrictEqual(422);
            expect(message).toStrictEqual('Request Failed.');

            expect(error.code).toStrictEqual('invalid_type');
            expect(error.message).toStrictEqual('Expected number, received string');
        });

        test('Get Product /product/:id', async() =>
        {
            const response: IProductResponse = await request
                .get(`/api/product/${productId}dasdasda123`)
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send();

            const { body: { message, errors: [error] } } = response;

            expect(response.statusCode).toStrictEqual(422);
            expect(message).toStrictEqual('Request Failed.');

            expect(error.code).toStrictEqual('invalid_string');
            expect(error.message).toStrictEqual('Invalid uuid');
        });

        test('Update Product /product/:id', async() =>
        {
            const payload = {
                title: 11,
                price: 'asdasd'
            };

            const response: IProductResponse = await request
                .put(`/api/product/${productId}`)
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

        test('Delete Product error /product/:id', async() =>
        {
            const deleteErrorResponse: IProductResponse = await request
                .delete(`/api/product/${deleteResponse.body.data.id}`)
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send();

            const { body: { message } } = deleteErrorResponse;

            expect(deleteErrorResponse.statusCode).toStrictEqual(400);
            expect(message).toStrictEqual('Product not found.');
        });
    });
});


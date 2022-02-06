import { SuperAgentTest } from 'supertest';
import { ICreateConnection } from '@digichanges/shared-experience';
import initTestServer from '../../initTestServer';

describe('White list routes Test', () =>
{
    let request: SuperAgentTest;
    let dbConnection: ICreateConnection;

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

    describe('all', () =>
    {
        test('get', async() =>
        {
            const response: any = await request.get('/test/all/12345678');
            expect(response.statusCode).toStrictEqual(200);
        });

        test('post', async() =>
        {
            const response: any = await request.post('/test/all/hello/world');
            expect(response.statusCode).toStrictEqual(200);
        });

        test('put', async() =>
        {
            const response: any = await request.put('/test/all/numeric/123');
            expect(response.statusCode).toStrictEqual(200);
        });

        test('delete', async() =>
        {
            const response: any = await request.delete('/test/all/12345678/delete');
            expect(response.statusCode).toStrictEqual(200);
        });

        test('query', async() =>
        {
            const response: any = await request.get('/test/all/query?hola=mundo&hello=world');
            expect(response.statusCode).toStrictEqual(200);
        });
    });

    describe('equal', () =>
    {
        test('one', async() =>
        {
            const response: any = await request.get('/test/countries');
            expect(response.statusCode).toStrictEqual(200);
        });

        test('query', async() =>
        {
            const response: any = await request.get('/test/countries?status=true');
            expect(response.statusCode).toStrictEqual(200);
        });
    });

    describe('dynamic', () =>
    {
        test('equal', async() =>
        {
            const response: any = await request.get('/test/countries/12345678');
            expect(response.statusCode).toStrictEqual(200);
        });

        test('one', async() =>
        {
            const response: any = await request.get('/test/countries/12345678/states');
            expect(response.statusCode).toStrictEqual(200);
        });

        test('two', async() =>
        {
            const response: any = await request.get('/test/countries/12345678/states/12345678/cities');
            expect(response.statusCode).toStrictEqual(200);
        });

        test('query', async() =>
        {
            const response: any = await request.get('/test/countries/12345678/states?status=true');
            expect(response.statusCode).toStrictEqual(200);
        });
    });

    describe('untidy', () =>
    {
        describe('all', () =>
        {
            test('one', async() =>
            {
                const response: any = await request.get('/test/12345678/hello/all');
                expect(response.statusCode).toStrictEqual(403);
            });

            test('query', async() =>
            {
                const response: any = await request.get('/test/12345678/hello/all?status=true');
                expect(response.statusCode).toStrictEqual(403);
            });
        });

        describe('dynamic', () =>
        {
            test('one', async() =>
            {
                const response: any = await request.get('/test/cities/12345678/countries/12345678/states');
                expect(response.statusCode).toStrictEqual(403);
            });

            test('query', async() =>
            {
                const response: any = await request.get('/test/cities/12345678/countries/12345678/states?status=true');
                expect(response.statusCode).toStrictEqual(403);
            });
        });
    });
});

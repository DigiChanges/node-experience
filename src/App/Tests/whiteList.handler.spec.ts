import { InversifyExpressServer } from 'inversify-express-utils';
import supertest from 'supertest';
import { ICreateConnection } from '@digichanges/shared-experience';
import initTestServer from '../../initTestServer';

describe('White list routes Test', () =>
{
    let server: InversifyExpressServer;
    let request: supertest.SuperTest<supertest.Test>;
    let db_connection: ICreateConnection;

    beforeAll(async(done) =>
    {
        const config_server = await initTestServer();

        server = config_server.server;
        request = config_server.request;
        db_connection = config_server.dbConnection;

        done();
    });

    afterAll((async(done) =>
    {
        await db_connection.drop();
        await db_connection.close();

        done();
    }));

    describe('all', () =>
    {
        test('get', async(done) =>
        {
            const response: any = await request.get('/test/all/12345678');
            expect(response.statusCode).toStrictEqual(200);

            done();
        });

        test('post', async(done) =>
        {
            const response: any = await request.post('/test/all/hello/world');
            expect(response.statusCode).toStrictEqual(200);

            done();
        });

        test('put', async(done) =>
        {
            const response: any = await request.put('/test/all/numeric/123');
            expect(response.statusCode).toStrictEqual(200);

            done();
        });

        test('delete', async(done) =>
        {
            const response: any = await request.delete('/test/all/12345678/delete');
            expect(response.statusCode).toStrictEqual(200);

            done();
        });

        test('query', async(done) =>
        {
            const response: any = await request.get('/test/all/query?hola=mundo&hello=world');
            expect(response.statusCode).toStrictEqual(200);

            done();
        });
    });

    describe('equal', () =>
    {
        test('one', async(done) =>
        {
            const response: any = await request.get('/test/countries');
            expect(response.statusCode).toStrictEqual(200);

            done();
        });

        test('query', async(done) =>
        {
            const response: any = await request.get('/test/countries?status=true');
            expect(response.statusCode).toStrictEqual(200);

            done();
        });
    });

    describe('dynamic', () =>
    {

        test('equal', async(done) =>
        {
            const response: any = await request.get('/test/countries/12345678');
            expect(response.statusCode).toStrictEqual(200);

            done();
        });

        test('one', async(done) =>
        {
            const response: any = await request.get('/test/countries/12345678/states');
            expect(response.statusCode).toStrictEqual(200);

            done();
        });

        test('two', async(done) =>
        {
            const response: any = await request.get('/test/countries/12345678/states/12345678/cities');
            expect(response.statusCode).toStrictEqual(200);

            done();
        });

        test('query', async(done) =>
        {
            const response: any = await request.get('/test/countries/12345678/states?status=true');
            expect(response.statusCode).toStrictEqual(200);

            done();
        });

    });

    describe('untidy', () =>
    {
        describe('all', () =>
        {
            test('one', async(done) =>
            {
                const response: any = await request.get('/test/12345678/hello/all');
                expect(response.statusCode).toStrictEqual(403);

                done();
            });

            test('query', async(done) =>
            {
                const response: any = await request.get('/test/12345678/hello/all?status=true');
                expect(response.statusCode).toStrictEqual(403);

                done();
            });

        });

        describe('dynamic', () =>
        {
            test('one', async(done) =>
            {
                const response: any = await request.get('/test/cities/12345678/countries/12345678/states');
                expect(response.statusCode).toStrictEqual(403);

                done();
            });

            test('query', async(done) =>
            {
                const response: any = await request.get('/test/cities/12345678/countries/12345678/states?status=true');
                expect(response.statusCode).toStrictEqual(403);

                done();
            });

        });

    });
});

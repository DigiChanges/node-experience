import { InversifyExpressServer } from 'inversify-express-utils';
import supertest from 'supertest';
import { ICreateConnection } from '@digichanges/shared-experience';
import initTestServer from '../../initTestServer';

describe('Start Index Test', () =>
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

    describe('#get', () =>
    {
        test('should have a status code of 200', async(done) =>
        {
            const response: any = await request.get('/');
            expect(response.statusCode).toStrictEqual(200);

            done();
        });
    });
});

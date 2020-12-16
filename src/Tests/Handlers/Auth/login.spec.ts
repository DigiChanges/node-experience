import {InversifyExpressServer} from "inversify-express-utils";
import supertest from "supertest";
import ICreateConnection from "../../../InterfaceAdapters/IDatabase/ICreateConnection";
import initServer from "../../initServer";

describe("Start Login Test", () => {
    let server: InversifyExpressServer;
    let request: supertest.SuperTest<supertest.Test>;
    let dbConnection: ICreateConnection;

    beforeAll(async (done) => {
        const configServer = await initServer();

        server = configServer.server;
        request = configServer.request;
        dbConnection = configServer.dbConnection;

        done();
    });

    afterAll((async (done) => {
        await dbConnection.drop();
        await dbConnection.close();

        done();
    }));

    describe('Login User Success', () => {
        test('Login POST /', async (done) => {
            const payload = {
                email: "user@node.com",
                password: "12345678"
            };

            const response: any = await request
                .post("/api/auth/login?provider=local")
                .set('Accept', 'application/json')
                .send(payload);

            const {body: {status, statusCode, data}} = response;

            expect(response.statusCode).toBe(201);
            expect(status).toBe('success');
            expect(statusCode).toBe('HTTP_CREATED');

            expect(data.user.email).toEqual("user@node.com");
            expect(data.user.firstName).toEqual("user");

            await done();
        });
    });

    describe('Login SuperAdmin Success', () => {
        test('Login POST /', async (done) => {
            const payload = {
                email: "superadmin@node.com",
                password: "12345678"
            };

            const response: any = await request
                .post("/api/auth/login?provider=local")
                .set('Accept', 'application/json')
                .send(payload);

            const {body: {status, statusCode, data}} = response;

            expect(response.statusCode).toBe(201);
            expect(status).toBe('success');
            expect(statusCode).toBe('HTTP_CREATED');

            expect(data.user.email).toEqual("superadmin@node.com");
            expect(data.user.firstName).toEqual("Super");

            await done();
        });
    });

    describe('Login SuperAdmin Wrong Credentials', () => {
        test('Login POST /', async (done) => {
            const payload = {
                email: "superadmin@node.com",
                password: "123456789"
            };

            const response: any = await request
                .post("/api/auth/login?provider=local")
                .set('Accept', 'application/json')
                .send(payload);

            const {body: {status, statusCode, message}} = response;

            expect(response.statusCode).toBe(403);
            expect(status).toBe('error');
            expect(statusCode).toBe('HTTP_FORBIDDEN');

            expect(message).toEqual("Error credentials");

            await done();
        });
    });
});
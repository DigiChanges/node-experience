import SeedFactory from "../../../Infrastructure/Seeds/SeedFactory";
import {dbConnection, request} from "../../setup";

beforeAll((async () => {
    const seed = new SeedFactory();
    await seed.init();
}));

afterAll((async () => {
    await dbConnection.drop();
    await dbConnection.close();
}));

describe('Login', () => {
    test('Login POST /', async done => {
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
        expect(data.user.firstName).toEqual("Super");

        done();
    });
});

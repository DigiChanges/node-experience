import dotenv from 'dotenv';

beforeAll((async (done) => {
    dotenv.config(); // Need before get config
    done();
}));
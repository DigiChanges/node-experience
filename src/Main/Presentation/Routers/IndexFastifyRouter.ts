import FastifyResponder from '../Utils/FastifyResponder';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { StatusCode } from '../Application/StatusCode';

const IndexFastifyRouter = async(fastify: FastifyInstance) =>
{
    const responder = new FastifyResponder();

    fastify.get('/', async(request: FastifyRequest, reply: FastifyReply) =>
    {
        await responder.send('Welcome to Node Experience', reply, StatusCode.HTTP_OK);
    });
};

export default IndexFastifyRouter;

import FastifyResponder from '../Utils/FastifyResponder';
import { StatusCode } from '@digichanges/shared-experience';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

const IndexFastifyRouter = async(fastify: FastifyInstance) =>
{
    const responder = new FastifyResponder();

    fastify.get('/', async(request: FastifyRequest, reply: FastifyReply) =>
    {
        await responder.send('Welcome to Node Experience', reply, StatusCode.HTTP_OK);
    });
};

export default IndexFastifyRouter;

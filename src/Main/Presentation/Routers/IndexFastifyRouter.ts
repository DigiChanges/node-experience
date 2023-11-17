import FastifyResponder from '../Utils/FastifyResponder';
import { StatusCode } from '@digichanges/shared-experience';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

const responder = new FastifyResponder();

const IndexFastifyRouter = async(fastify: FastifyInstance) =>
{
    fastify.get('/', async(request: FastifyRequest, reply: FastifyReply) =>
    {
        await responder.send('Welcome to Node Experience', reply, StatusCode.HTTP_OK);
    });
};

export default IndexFastifyRouter;

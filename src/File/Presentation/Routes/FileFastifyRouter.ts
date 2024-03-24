import { FastifyInstance } from 'fastify';
import FileController from '../Controllers/FileFastifyController';
import writeFileMiddleware from '../Middlewares/FileFastifyReqMiddleware';
import multipart from '@fastify/multipart';

const FileFastifyRouter = async(fastify: FastifyInstance) =>
{
    await fastify.register(multipart);

    fastify.get('/', FileController.listFiles);
    fastify.get('/objects', FileController.listObjects);
    fastify.get('/metadata/:id', FileController.getFileMetadata);
    fastify.post('/base64', FileController.uploadBase64);
    fastify.post('/', { preHandler: await writeFileMiddleware('file') }, FileController.uploadMultipart);
    fastify.post('/multiple', { preHandler: await writeFileMiddleware('files') }, FileController.uploadMultipleImages);
    fastify.post('/presigned-get-object', FileController.getPresignedGetObject);
    fastify.get('/:id', FileController.download);
    fastify.put('/optimize/:id', FileController.optimize);
    fastify.put('/base64/:id', FileController.updateBase64);
    fastify.put('/:id', { preHandler: await writeFileMiddleware('file') }, FileController.updateMultipart);
    fastify.delete('/:id', FileController.remove);
};

export default FileFastifyRouter;

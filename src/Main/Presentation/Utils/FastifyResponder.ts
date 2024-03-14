import {
    Transformer,
    FormatError,
    ErrorHttpException,
    IHttpStatusCode
} from '@digichanges/shared-experience';
import { FastifyReply } from 'fastify';

class FastifyResponder
{
    #formatError: FormatError;

    constructor()
    {
        this.#formatError = new FormatError();
    }

    public async send(data: any, reply: FastifyReply, status: IHttpStatusCode, transformer?: Transformer)
    {
        let responseData = data;

        if (transformer)
        {
            responseData = await transformer.handle(data);
        }

        await reply.code(status.code).send({ data: responseData });
    }

    public async paginate(result: any, reply: FastifyReply, status: IHttpStatusCode, transformer?: Transformer)
    {
        let { data } = result;
        const { metadata, pagination } = result;

        if (transformer)
        {
            data = await transformer.handle(data);
        }

        await reply.code(status.code).send({ data, metadata, pagination });
    }

    public async sendStream(result: any, reply: FastifyReply, status: IHttpStatusCode)
    {
        const stream = result.stream;
        const mimeType = result._metadata.mimeType;
        const fileName = result._metadata.name;

        await reply
            .code(status.code)
            .header('Content-Type',  mimeType)
            .header('Content-Disposition', `attachment; filename=${fileName}`)
            .send(stream);
    }

    public async error(error: ErrorHttpException, reply: FastifyReply, status: IHttpStatusCode)
    {
        await reply.code(status.code).send(this.#formatError.getFormat(error));
    }
}

export default FastifyResponder;

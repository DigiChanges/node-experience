import ResponsePayload from '../../../Shared/Utils/ResponsePayload';
import {
    IPaginator,
    Transformer,
    FormatError,
    ErrorHttpException,
    IHttpStatusCode
} from '@digichanges/shared-experience';
import PaginatorTransformer from '../../../Shared/Utils/PaginatorTransformer';
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

    public async paginate<T>(paginator: IPaginator, reply: FastifyReply, status: IHttpStatusCode, transformer?: Transformer)
    {
        const data = await paginator.paginate<T>();
        const metadata = paginator.getMetadata();
        const result = { data, metadata } as ResponsePayload;

        if (transformer)
        {
            result.data = await transformer.handle(data);
        }

        if (paginator.getExist())
        {
            const paginatorTransformer = new PaginatorTransformer();
            const pagination = await paginatorTransformer.handle(paginator);

            Object.assign(result, { pagination });
        }

        await reply.code(status.code).send(result);
    }

    public async error(error: ErrorHttpException, reply: FastifyReply, status: IHttpStatusCode)
    {
        await reply.code(status.code).send(this.#formatError.getFormat(error));
    }
}

export default FastifyResponder;

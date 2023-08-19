import { DefaultContext } from 'koa';

import ResponsePayload from '../../../Shared/Utils/ResponsePayload';
import {
    IPaginator,
    Transformer,
    FormatError,
    ErrorHttpException,
    IHttpStatusCode
} from '@digichanges/shared-experience';
import PaginatorTransformer from '../../../Shared/Utils/PaginatorTransformer';

class KoaResponder
{
    private formatError: FormatError;

    constructor()
    {
        this.formatError = new FormatError();
    }

    public async send(data: any, ctx: DefaultContext, status: IHttpStatusCode, transformer?: Transformer)
    {
        if (!transformer)
        {
            ctx.status = status.code;
            return ctx.body = {
                data
            };
        }

        data = await transformer.handle(data);

        ctx.status = status.code;
        return ctx.body = { data } as ResponsePayload;
    }

    public async paginate<T>(paginator: IPaginator, ctx: DefaultContext, status: IHttpStatusCode, transformer?: Transformer)
    {
        const data = await paginator.paginate<T>();
        const metadata = paginator.getMetadata();
        const result = { data, metadata } as ResponsePayload;

        if (!transformer)
        {
            ctx.status = status.code;
            return ctx.body = {
                data,
                metadata
            };
        }

        result.data = await transformer.handle(data);

        if (paginator.getExist())
        {
            const paginatorTransformer = new PaginatorTransformer();
            paginator = await paginatorTransformer.handle(paginator);

            const pagination = { pagination: paginator };

            Object.assign(result, pagination);
        }

        ctx.status = status.code;
        return ctx.body = result;
    }

    public error(error: ErrorHttpException, ctx: DefaultContext, status: IHttpStatusCode, metadata: Record<string, any> | null)
    {
        ctx.status = status.code;
        return ctx.body = this.formatError.getFormat(error);
    }
}

export default KoaResponder;

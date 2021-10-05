import Koa from 'koa';
import { IHttpStatusCode, IPaginator, PaginatorTransformer, Transformer } from '@digichanges/shared-experience';

import IFormatResponder from '../../../../Shared/InterfaceAdapters/IFormatResponder';
import IFileDTO from '../../../../File/InterfaceAdapters/Payloads/IFileDTO';
import FormatResponder from '../FormatResponder';
import FormatError from '../FormatError';
import ErrorHttpException from '../ErrorHttpException';


class Responder
{
    private formatResponder: IFormatResponder;
    private formatError: FormatError;

    constructor()
    {
        this.formatResponder = new FormatResponder();
        this.formatError = new FormatError();
    }

    public send(data: any, ctx: Koa.ParameterizedContext, status: IHttpStatusCode, transformer: Transformer = null)
    {
        if (!transformer)
        {
            ctx.status = status.code;
            return ctx.body = {
                data
            };
        }

        data = transformer.handle(data);

        ctx.status = status.code;
        return ctx.body = this.formatResponder.getFormatData(data, status, null);
    }

    public async paginate(paginator: IPaginator, ctx: Koa.ParameterizedContext, status: IHttpStatusCode, transformer: Transformer = null)
    {
        const data = await paginator.paginate();
        const result = this.formatResponder.getFormatData(data, status, null);

        if (!transformer)
        {
            ctx.status = status.code;
            return ctx.body = {
                data
            };
        }

        result.data = transformer.handle(data);

        if (paginator.getExist())
        {
            const paginatorTransformer = new PaginatorTransformer();
            paginator = paginatorTransformer.handle(paginator);

            const pagination = { pagination: paginator };

            Object.assign(result, pagination);
        }

        ctx.status = status.code;
        return ctx.body = result;
    }

    // public sendStream(fileDto: IFileDTO, request: Request | any, response: Response, status: IHttpStatusCode)
    // {
    // response.writeHead(status.code, {'Content-Type': fileDto.metadata.mimeType});
    //
    // fileDto.stream.pipe(response);
    // }

    // public render(data: any, view: any, response: Response, resolve: any, reject: any)
    // {
    //     response.render('log', {data}, (err: any, compiled: any) =>
    //     {
    //         if (err)
    //         {
    //             // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    //             reject('500 when rendering the template');
    //         }
    //         // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    //         resolve(compiled);
    //     });
    // }

    public error(error: ErrorHttpException, ctx: Koa.ParameterizedContext, status: IHttpStatusCode)
    {
        ctx.status = status.code;
        return ctx.body = this.formatError.getFormat(error);
    }
}

export default Responder;

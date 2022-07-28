import { ParameterizedContext, Context } from 'koa';
import { IHttpStatusCode, IPaginator, PaginatorTransformer, Transformer } from '@digichanges/shared-experience';

import IFormatResponder from '../../../../Shared/InterfaceAdapters/IFormatResponder';
import IFileDTO from '../../../../File/Domain/Models/IFileDTO';
import FormatError from '../FormatError';
import ErrorHttpException from '../ErrorHttpException';
import FormatResponder from '../FormatResponder';

class KoaResponder
{
    private formatError: FormatError;
    private formatResponder: IFormatResponder;

    constructor()
    {
        this.formatResponder = new FormatResponder();
        this.formatError = new FormatError();
    }

    public async send(data: any, ctx: ParameterizedContext, status: IHttpStatusCode, transformer: Transformer = null)
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
        return ctx.body = this.formatResponder.getFormatData(data, null);
    }

    public async paginate(paginator: IPaginator, ctx: ParameterizedContext, status: IHttpStatusCode, transformer: Transformer = null)
    {
        const data = await paginator.paginate();
        const metadata = paginator.getMetadata();
        const result = this.formatResponder.getFormatData(data, metadata);

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

    public sendStream(fileDto: IFileDTO, ctx: Context & any, status: IHttpStatusCode)
    {
        ctx.status = status.code;
        ctx.response.set('Content-Type', fileDto.metadata.mimeType);

        return ctx.body = fileDto.stream;
    }

    public error(error: ErrorHttpException, ctx: ParameterizedContext, status: IHttpStatusCode, metadata: Record<string, any>)
    {
        ctx.status = status.code;
        return ctx.body = this.formatError.getFormat(error);
    }
}

export default KoaResponder;

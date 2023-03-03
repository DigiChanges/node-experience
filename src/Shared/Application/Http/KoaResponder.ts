import { DefaultContext } from 'koa';

import IFormatResponder from '../../Presentation/Shared/IFormatResponder';
import IFileVersionDTO from '../../../File/Domain/Models/IFileVersionDTO';
import FormatError from '../../Presentation/Shared/FormatError';
import ErrorHttpException from '../../Presentation/Shared/ErrorHttpException';
import FormatResponder from '../../Presentation/Shared/FormatResponder';
import IHttpStatusCode from '../IHttpStatusCode';
import Transformer from '../../../Shared/Presentation/Shared/Transformer';
import IPaginator from '../../Infrastructure/Orm/IPaginator';
import PaginatorTransformer from '../../Presentation/Shared/PaginatorTransformer';

class KoaResponder
{
    private formatError: FormatError;
    private formatResponder: IFormatResponder;

    constructor()
    {
        this.formatResponder = new FormatResponder();
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
        return ctx.body = this.formatResponder.getFormatData(data, null);
    }

    public async paginate(paginator: IPaginator, ctx: DefaultContext, status: IHttpStatusCode, transformer?: Transformer)
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

    public sendStream(fileDto: IFileVersionDTO, ctx: DefaultContext & any, status: IHttpStatusCode)
    {
        ctx.status = status.code;
        ctx.response.set('Content-Type', fileDto.metadata.mimeType);

        return ctx.body = fileDto.stream;
    }

    public error(error: ErrorHttpException, ctx: DefaultContext, status: IHttpStatusCode, metadata: Record<string, any> | null)
    {
        ctx.status = status.code;
        return ctx.body = this.formatError.getFormat(error);
    }
}

export default KoaResponder;

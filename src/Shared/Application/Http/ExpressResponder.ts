import { Response, Request } from 'express';
import IFileVersionDTO from '../../../File/Domain/Models/IFileVersionDTO';
import IFormatResponder from '../../Presentation/Shared/IFormatResponder';
import FormatResponder from '../../Presentation/Shared/FormatResponder';
import FormatError from '../../Presentation/Shared/FormatError';
import IPaginator from '../../Infrastructure/Orm/IPaginator';
import IHttpStatusCode from '../IHttpStatusCode';
import PaginatorTransformer from '../../Presentation/Shared/PaginatorTransformer';
import Transformer from '../../../Shared/Presentation/Shared/Transformer';

class ExpressResponder
{
    private formatResponder: IFormatResponder;
    private formatError: FormatError;

    constructor()
    {
        this.formatResponder = new FormatResponder();
        this.formatError = new FormatError();
    }

    public async send(data: any, request: Request | any, response: Response, status: IHttpStatusCode, transformer?: Transformer)
    {
        let metadata = null;

        if (request)
        {
            metadata = {
                refreshToken: request.refreshToken
            };
        }

        if (!transformer)
        {
            return response.status(status.code).send({ data: { ...data, metadata } });
        }

        data = await transformer.handle(data);

        response.status(status.code).send(this.formatResponder.getFormatData(data, metadata));
    }

    // TODO: Refactor to encapsulate this logic
    public async paginate(paginator: IPaginator, request: Request | any, response: Response, status: IHttpStatusCode, transformer?: Transformer)
    {
        const data = await paginator.paginate();
        const metadata = paginator.getMetadata();
        const result = this.formatResponder.getFormatData(data, metadata);

        if (!transformer)
        {
            return response.status(status.code)
                .send({
                    data,
                    metadata
                });
        }

        result.data = await transformer.handle(data);

        if (paginator.getExist())
        {
            const paginatorTransformer = new PaginatorTransformer();
            paginator = await paginatorTransformer.handle(paginator);

            const pagination = { pagination: paginator };

            Object.assign(result, pagination);
        }

        response.status(status.code).send(result);
    }

    public sendStream(fileDto: IFileVersionDTO, request: Request | any, response: Response, status: IHttpStatusCode)
    {
        response.writeHead(status.code, { 'Content-Type': fileDto.metadata.mimeType });

        fileDto.stream.pipe(response);
    }

    public render(data: any, view: any, response: Response, resolve: any, reject: any)
    {
        response.render('log', { data }, (err: any, compiled: any) =>
        {
            if (err)
            {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                reject('500 when rendering the template');
            }
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            resolve(compiled);
        });
    }

    public error(data: any, request: Request | any, response: Response, status: any, metadata?: Record<string, any>)
    {
        response.status(status.code).send({ ...this.formatError.getFormat(data), metadata });
    }
}

export default ExpressResponder;

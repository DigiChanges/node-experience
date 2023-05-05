import Koa, { DefaultContext } from 'koa';
import Router from 'koa-router';
import KoaResponder from '../../../Shared/Application/Http/KoaResponder';
import MainConfig, { IHttpStatusCode } from '../../../Config/MainConfig';
import CategoryController from '../Controllers/CategoryController';
import CriteriaPayload from '../../../Shared/Presentation/Validations/CriteriaPayload';
import ICategoryDomain from '../../Domain/Entities/ICategoryDomain';
import IPaginator from '../../../Shared/Infrastructure/Orm/IPaginator';
import AuthorizeKoaMiddleware from '../../../Auth/Presentation/Middlewares/AuthorizeKoaMiddleware';
import Permissions from '../../../Config/Permissions';

const routerOpts: Router.IRouterOptions = {
    prefix: '/api/category'
};

const CategoryKoaHandler: Router = new Router(routerOpts);
const responder: KoaResponder = new KoaResponder();
const controller = new CategoryController();
const config: Record<string, IHttpStatusCode> = MainConfig.getInstance().getConfig().statusCode;


CategoryKoaHandler.get('/', async(ctx: Koa.ParameterizedContext & any) =>
{
    const data: ICategoryDomain[] = await controller.list();

    await responder.send(data, ctx, config['HTTP_OK']);
});


CategoryKoaHandler.put('/', async(ctx: Koa.ParameterizedContext & any): Promise<void> =>
{
    void await responder.send('Welcome to Put', ctx, config['HTTP_OK']);
});

CategoryKoaHandler.post('/', async(ctx: Koa.ParameterizedContext & any): Promise<void> =>
{
    const { body } = ctx.request;
    await controller.save(body);
    void await responder.send('Category created', ctx, config['HTTP_CREATED']);
});

export default CategoryKoaHandler;

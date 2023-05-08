import Koa from 'koa';
import Router from 'koa-router';
import KoaResponder from '../../../Shared/Application/Http/KoaResponder';
import MainConfig, { IHttpStatusCode } from '../../../Config/MainConfig';
import CategoryController from '../Controllers/CategoryController';
import ICategoryDomain from '../../Domain/Entities/ICategoryDomain';
import CategoryTransformer from '../Transformers/CategoryTransformer';
import DefaultMessageTransformer from '../../../Shared/Presentation/Transformers/DefaultMessageTransformer';
import ResponseMessageEnum from '../../../Shared/Domain/Enum/ResponseMessageEnum';

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

    await responder.send(data, ctx, config['HTTP_OK'], new CategoryTransformer());
});

CategoryKoaHandler.post('/', async(ctx: Koa.ParameterizedContext & any): Promise<void> =>
{
    const { body } = ctx.request;
    const category = await controller.save(body);
    void await responder.send(category, ctx, config['HTTP_CREATED'], new DefaultMessageTransformer(ResponseMessageEnum.CREATED));
});

export default CategoryKoaHandler;

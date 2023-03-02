import MainConfig from '../../../Config/MainConfig';
import Permissions from '../../../Config/Permissions';
import { AuthUser } from '../../../Auth/Presentation/Helpers/AuthUser';
import AuthorizeKoaMiddleware from '../../../Auth/Presentation/Middlewares/AuthorizeKoaMiddleware';
import CategoryRepPayload from '../../../Category/Domain/Payloads/CategoryRepPayload';
import CategoryUpdatePayload from '../../../Category/Domain/Payloads/CategoryUpdatePayload';
import { DefaultContext } from 'koa';
import Router from 'koa-router';
import KoaResponder from '../../../Shared/Application/Http/KoaResponder';
import ResponseMessageEnum from '../../../Shared/Domain/Enum/ResponseMessageEnum';
import CriteriaPayload from '../../../Shared/Presentation/Validations/CriteriaPayload';
import CategoryController from '../Controllers/CategoryController';
import CategoryTransformer from '../Transformers/CategoryTransformer';
import IPaginator from '../../../Shared/Infrastructure/Orm/IPaginator';
import IdPayload from '../../../Shared/Presentation/Requests/IdPayload';
import DefaultMessageTransformer from '../../../Shared/Presentation/Transformers/DefaultMessageTransformer';

const routerOpts: Router.IRouterOptions = {
  prefix: '/api/categories',
};

const CategoryKoaHandler: Router = new Router(routerOpts);
const responder: KoaResponder = new KoaResponder();
const controller: CategoryController = new CategoryController();
const config = MainConfig.getInstance().getConfig().statusCode;

CategoryKoaHandler.post(
  '/',
  AuthorizeKoaMiddleware(Permissions.CATEGORIES_SAVE),
  async (ctx: DefaultContext) => {
    const data: CategoryRepPayload = {
      authUser: AuthUser(ctx),
      ...ctx.request.body,
    };

    const category = await controller.save(data);
    void (await responder.send(
      category,
      ctx,
      config['HTTP_CREATED'],
      new DefaultMessageTransformer(ResponseMessageEnum.CREATED)
    ));
  }
);

CategoryKoaHandler.get(
  '/',
  AuthorizeKoaMiddleware(Permissions.CATEGORIES_LIST),
  async (ctx: DefaultContext) => {
    const data: CriteriaPayload = {
      url: ctx.request.url,
      query: ctx.request.query,
    };

    const paginator: IPaginator = await controller.list(data);
    await responder.paginate(
      paginator,
      ctx,
      config['HTTP_OK'],
      new CategoryTransformer()
    );
  }
);

CategoryKoaHandler.get(
  '/:id',
  AuthorizeKoaMiddleware(Permissions.CATEGORIES_SHOW),
  async (ctx: DefaultContext) => {
    const category = await controller.getOne(ctx.params as IdPayload);
    void (await responder.send(
      category,
      ctx,
      config['HTTP_OK'],
      new CategoryTransformer()
    ));
  }
);

CategoryKoaHandler.put(
  '/:id',
  AuthorizeKoaMiddleware(Permissions.CATEGORIES_UPDATE),
  async (ctx: DefaultContext) => {
    const data: CategoryUpdatePayload = {
      id: ctx.params.id,
      authUser: AuthUser(ctx),
      ...ctx.request.body,
    };

    const category = await controller.update(data);
    void (await responder.send(
      category,
      ctx,
      config['HTTP_CREATED'],
      new DefaultMessageTransformer(ResponseMessageEnum.UPDATED)
    ));
  }
);

CategoryKoaHandler.delete(
  '/:id',
  AuthorizeKoaMiddleware(Permissions.CATEGORIES_DELETE),
  async (ctx: DefaultContext) => {
    const category = await controller.remove(ctx.params as IdPayload);
    void (await responder.send(
      category,
      ctx,
      config['HTTP_CREATED'],
      new CategoryTransformer()
    ));
  }
);

export default CategoryKoaHandler;

import { InjectorModule } from '@deepkit/injector';
import ItemMongooseRepository from './Infrastructure/Repositories/ItemMongooseRepository';
import GetItemUseCase from './Domain/UseCases/GetItemUseCase';
import ListItemsUseCase from './Domain/UseCases/ListItemsUseCase';
import RemoveItemUseCase from './Domain/UseCases/RemoveItemUseCase';
import SaveItemUseCase from './Domain/UseCases/SaveItemUseCase';
import UpdateItemUseCase from './Domain/UseCases/UpdateItemUseCase';
import IItemRepository from './Domain/Repositories/IItemRepository';

export const itemModule = new InjectorModule([
    { provide: 'GetItemUseCase', useClass: GetItemUseCase },
    { provide: 'ListItemsUseCase', useClass: ListItemsUseCase },
    { provide: 'RemoveItemUseCase', useClass: RemoveItemUseCase },
    { provide: 'SaveItemUseCase', useClass: SaveItemUseCase },
    { provide: 'UpdateItemUseCase', useClass: UpdateItemUseCase },

    { provide: IItemRepository, useClass: ItemMongooseRepository }
]).forRoot();

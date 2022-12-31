import Logger from '../../../Shared/Application/Logger/Logger';
import commander from 'commander';
import ProductRepPayload from '../../Domain/Payloads/Product/ProductRepPayload';
import ProductSaveUseCase from '../../Domain/UseCases/Product/ProductSaveUseCase';
import ProductRepRequest from '../Requests/Product/ProductRepRequest';

const AddProductCommand = new commander.Command('addProduct');

AddProductCommand
    .version('0.0.1')
    .description('Add product to the system')
    .option('-t, --title <title>', 'Title of the product')
    .option('-p, --price <price>', 'Price of the product')
    .option('-a, --active <active>', 'The product is active')
    .action(async(env: any) =>
    {
        const productSaveUseCase = new ProductSaveUseCase();

        const productCommandRepRequest: ProductRepPayload = new ProductRepRequest(env);
        const product = await productSaveUseCase.handle(productCommandRepRequest);

        if (product)
        {
            Logger.info('Product created successfully.');
        }
    });

export default AddProductCommand;

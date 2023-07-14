import Locales from '../../Shared/Utils/Locales';

describe('Locales', () =>
{
    test('New Instance', async() =>
    {
        try
        {
            // @ts-ignore
            const locales: Locales = new Locales();
        }
        catch (error: any)
        {
            expect(error.message).toStrictEqual('Error: Instantiation failed: Use SingletonClass.getInstance() instead of new.');
        }
    });
});

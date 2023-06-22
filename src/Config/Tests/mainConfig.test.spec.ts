import MainConfig from '../../Config/MainConfig';

describe('MainConfig', () =>
{
    test('New MainConfig instance error', async() =>
    {
        try
        {
            // @ts-ignore
            const mainConfig = new MainConfig();
        }
        catch (error: any)
        {
            expect(error.message).toStrictEqual('Error: Instantiation failed: Use getInstance() instead of new.');
        }
    });
});

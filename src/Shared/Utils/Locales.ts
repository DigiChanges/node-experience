import i18n from 'i18n';

class Locales
{
    private static instance: Locales = new Locales();
    private i18n = i18n;

    private constructor()
    {
        this.i18n.configure({
            locales: ['en', 'es'],
            directory: `${process.cwd()}/dist/src/Config/Locales`,
            defaultLocale: 'en',
            objectNotation: true
        });

        if (Locales.instance)
        {
            throw new Error('Error: Instantiation failed: Use SingletonClass.getInstance() instead of new.');
        }

        Locales.instance = this;
    }

    public static getInstance(): Locales
    {
        if (!Locales.instance)
        {
            Locales.instance = new Locales();
        }

        return Locales.instance;
    }

    public getLocales(): typeof i18n
    {
        return this.i18n;
    }
}

export default Locales;

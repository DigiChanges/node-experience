import ItemSeedFactory from '../../Item/Infrastructure/Seeds/ItemSeedFactory';
import UserSeedFactory from '../../User/Infrastructure/Seeds/UserSeedFactory';

class SeedFactory
{
    private itemSeedFactory: ItemSeedFactory;
    private userSeedFactory: UserSeedFactory;

    constructor()
    {
        this.itemSeedFactory = new ItemSeedFactory();
        this.userSeedFactory = new UserSeedFactory();
    }

    public async init()
    {
        await this.userSeedFactory.authInit();
        await this.itemSeedFactory.init();
    }
}

export default SeedFactory;